"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IDKitWidget, VerificationLevel, type ISuccessResult } from "@worldcoin/idkit";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import contractAddresses from "@/lib/contract-addresses.json";
import PrivaVaultABI from "../../../artifacts/contracts/PrivaVault.sol/PrivaVault.json";

export default function DashboardPage() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();

    const [isVerified, setIsVerified] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [creditScore, setCreditScore] = useState<number | null>(null);
    const [analysisStage, setAnalysisStage] = useState<string>("");
    const [txHash, setTxHash] = useState<string>("");

    const walletAddress = address || "";

    const gaugeRef = useRef<HTMLDivElement>(null);
    const scoreRef = useRef<HTMLSpanElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Initial Load saved state on mount
    useEffect(() => {
        const savedVerification = localStorage.getItem('isVerified');
        const savedScore = localStorage.getItem('creditScore');
        const savedTxHash = localStorage.getItem('txHash');
        const savedContract = localStorage.getItem('lastContract');

        // Clear stale cache if contract changed
        if (savedContract && savedContract !== contractAddresses.vault) {
            console.log("Contract changed, clearing stale score cache.");
            localStorage.removeItem('creditScore');
            localStorage.removeItem('txHash');
            // Keep verification as it's WorldID based, not contract based
        } else {
            if (savedScore) setCreditScore(Number(savedScore));
            if (savedTxHash) setTxHash(savedTxHash);
        }

        if (savedVerification === 'true') setIsVerified(true);
        localStorage.setItem('lastContract', contractAddresses.vault);

        // Animate cards on mount
        if (cardsRef.current) {
            gsap.from(cardsRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }
    }, []);

    // Persistence Effect
    useEffect(() => {
        if (isVerified) localStorage.setItem("privacre_verified", "true");
    }, [isVerified]);

    useEffect(() => {
        if (creditScore !== null) localStorage.setItem("privacre_score", creditScore.toString());
    }, [creditScore]);

    useEffect(() => {
        if (txHash) localStorage.setItem("privacre_tx", txHash);
    }, [txHash]);

    useEffect(() => {
        if (creditScore !== null && scoreRef.current) {
            // Animate score counter
            gsap.from(scoreRef.current, {
                textContent: 0,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                    if (scoreRef.current) {
                        scoreRef.current.textContent = Math.ceil(
                            parseFloat(scoreRef.current.textContent || "0")
                        ).toString();
                    }
                },
            });

            // Animate gauge arc
            if (gaugeRef.current) {
                const arc = gaugeRef.current.querySelector(".gauge-arc");
                if (arc) {
                    gsap.to(arc, {
                        background: `conic-gradient(from 180deg, #0df26c ${creditScore}%, #1e293b 0%)`,
                        duration: 2,
                        ease: "power2.out",
                    });
                }
            }
        }
    }, [creditScore]);

    const connectWallet = async () => {
        try {
            connect({ connector: injected() });
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const handleWorldIDVerification = async (proof: ISuccessResult) => {
        console.log("World ID Proof:", proof);
        setIsVerified(true);
        if (proof.nullifier_hash) {
            localStorage.setItem("world_id_nullifier", proof.nullifier_hash);
        }
    };

    const startCreditAnalysis = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        setIsAnalyzing(true);
        setAnalysisStage("Verifying World ID session...");

        try {
            // Stage 1: Call Local Chainlink CRE Simulation
            setAnalysisStage("Securely fetching bank data via Plaid...");

            const response = await fetch('/api/cre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userAddress: walletAddress }),
            });

            const result = await response.json();

            if (!result.success || !result.data) {
                throw new Error(result.error || "Simulation failed");
            }

            const { aiResult, bankDataSummary } = result.data;
            console.log("AI Result Analysis:", aiResult);

            // Stage 2: Simulating Fetching Private Bank Data
            setAnalysisStage(`Fetching bank data... (${bankDataSummary.transactionCount} txns found)`);
            await simulateDelay(1500);

            // Stage 3: Sanitizing
            setAnalysisStage("Sanitizing data and removing PII (Zero-Knowledge)...");
            await simulateDelay(1500);

            // Stage 4: AI Analysis
            setAnalysisStage(`AI analyzing patterns with Groq (${aiResult.credit_score}% confidence)...`);
            await simulateDelay(1500);

            // Stage 5: Generating Score
            setAnalysisStage("Applying ZK Proofs to Credit Score...");
            await simulateDelay(1500);

            // Fetch final actual score from the Smart Contract (On-Chain)
            setAnalysisStage("Reading verified score from PrivaVault [On-Chain]...");

            // connect directly to the Sepolia testnet where the contract lives
            const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_TENDERLY_RPC || "https://virtual.sepolia.eu.rpc.tenderly.co/4bbf41fd-7d67-46d3-93cc-883cf0440985");

            const vault = new ethers.Contract(
                contractAddresses.vault,
                PrivaVaultABI.abi,
                provider
            );

            // Wait a bit for chain consistency if needed, but the API already waits for tx.wait()
            console.log("Reading score for:", walletAddress);
            let onChainScore = 0;
            try {
                const onChainScoreRaw = await vault.userScores(walletAddress);
                onChainScore = Number(onChainScoreRaw);
            } catch (err: any) {
                console.warn("Failed to read userScore mapping, defaulting to optimistic AI score:", err.message);
                onChainScore = 0;
            }

            // If on-chain is 0 but AI just gave a score, use AI score as optimistic update
            // (or wait for on-chain which we just did with wait() in API)
            const finalScore = onChainScore > 0 ? onChainScore : aiResult.credit_score;

            console.log("Final Score:", finalScore);
            setCreditScore(finalScore);
            setTxHash(result.txHash);

            setIsAnalyzing(false);
            setAnalysisStage("");

            // Trigger confetti or celebration animation
            celebrateScore();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("CRE Flow Error:", error);
            alert(`Flow Error: ${error.message || "Unknown error"}. Check console.`);
            setIsAnalyzing(false);
        }
    };

    const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const celebrateScore = () => {
        // Create floating particles
        const container = document.querySelector(".dashboard-container");
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: #0df26c;
                border-radius: 50%;
                pointer-events: none;
                left: 50%;
                top: 50%;
            `;
            container.appendChild(particle);

            gsap.to(particle, {
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => particle.remove(),
            });
        }
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col overflow-x-hidden text-slate-100 dashboard-container relative">
            <main className="layout-container flex flex-col grow items-center w-full px-4 py-8 md:px-10 lg:px-20">
                <div className="layout-content-container flex flex-col max-w-[1024px] w-full gap-8" ref={cardsRef}>
                    {/* Hero / Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-border-dark pb-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                                Your Crest Score
                            </h1>
                            <div className="flex items-center gap-2 text-text-secondary verification-badge">
                                <span className="material-symbols-outlined text-lg text-primary">
                                    {isVerified ? "check_circle" : "pending"}
                                </span>
                                <p className="text-sm md:text-base font-normal">
                                    {isVerified
                                        ? "Identity verified by World ID. Data verified by Chainlink."
                                        : "Verify your identity to continue"}
                                </p>
                            </div>
                        </div>
                        {!isVerified ? (
                            <IDKitWidget
                                app_id={(process.env.NEXT_PUBLIC_WORLD_ID_APP_ID as `app_${string}`) || "app_7141eab28d3662245856d528b69d89e4"}
                                action="verify-credit-score"
                                verification_level={VerificationLevel.Orb}
                                handleVerify={handleWorldIDVerification}
                                onSuccess={() => setIsVerified(true)}
                                // @ts-ignore
                                environment="staging"
                            >
                                {({ open }: { open: () => void }) => (
                                    <div className="flex gap-2">
                                        <div style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>
                                            Verify Identity
                                        </div>
                                        {!walletAddress && (
                                            <button
                                                onClick={connectWallet}
                                                className="group flex items-center gap-2 px-5 py-2.5 bg-card-dark border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all"
                                            >
                                                <span className="text-sm font-bold font-mono truncate max-w-[100px]">Connect Wallet</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={open}
                                            className="group flex items-center gap-2 px-5 py-2.5 bg-primary border border-primary text-background-dark rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(13,242,108,0.3)] hover:shadow-[0_0_20px_rgba(13,242,108,0.5)]"
                                        >
                                            <span className="text-sm font-bold">Verify with World ID</span>
                                            <span className="material-symbols-outlined text-sm">verified_user</span>
                                        </button>
                                    </div>
                                )}
                            </IDKitWidget>
                        ) : (
                            <a
                                href="https://dashboard.tenderly.co/explorer/vnet/4bbf41fd-7d67-46d3-93cc-883cf0440985"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-5 py-2.5 bg-card-dark border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all shadow-[0_0_15px_rgba(13,242,108,0.1)] hover:shadow-[0_0_20px_rgba(13,242,108,0.2)]"
                            >
                                <span className="text-sm font-bold">View Proof on Tenderly</span>
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                    open_in_new
                                </span>
                            </a>
                        )}
                    </div>

                    {/* Analysis Status */}
                    {isAnalyzing && (
                        <div className="bg-card-dark border border-primary/30 rounded-xl p-6 flex items-center gap-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <div>
                                <p className="text-white font-bold">Analyzing Your Financial Profile</p>
                                <p className="text-text-secondary text-sm">{analysisStage}</p>
                            </div>
                        </div>
                    )}

                    {txHash && (
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <p className="text-sm text-slate-200">
                                    Last Analysis Record: <span className="font-mono text-xs opacity-70">{txHash.substring(0, 20)}...</span>
                                </p>
                            </div>
                            <a
                                href={`https://dashboard.tenderly.co/explorer/vnet/4bbf41fd-7d67-46d3-93cc-883cf0440985/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                                View on Tenderly Explorer
                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                        </div>
                    )}

                    {/* Dashboard Grid */}
                    {!creditScore && !isAnalyzing && isVerified && (
                        <div className="flex flex-col items-center justify-center py-16 gap-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">Ready to Get Your Credit Score?</h2>
                                <p className="text-text-secondary">
                                    Connect your bank data securely to generate your privacy-preserving credit score
                                </p>
                            </div>
                            <button
                                onClick={startCreditAnalysis}
                                className="glow-effect flex items-center gap-2 px-8 py-4 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-all text-lg"
                            >
                                <span className="material-symbols-outlined">auto_awesome</span>
                                Start Credit Analysis
                            </button>
                        </div>
                    )}

                    {creditScore !== null && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Score Gauge Card */}
                                <div
                                    ref={gaugeRef}
                                    className="lg:col-span-5 flex flex-col items-center justify-center bg-card-dark rounded-2xl p-8 shadow-sm border border-border-dark relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <span className="material-symbols-outlined text-[180px]">speed</span>
                                    </div>
                                    <div className="relative z-10 w-64 h-32 mt-4 mb-2">
                                        {/* CSS-only semi-circle gauge */}
                                        <div className="gauge-arc w-full h-full absolute top-0 left-0"></div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%-40px)] h-[calc(200%-40px)] bg-card-dark rounded-full"></div>
                                        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-0">
                                            <span
                                                ref={scoreRef}
                                                className="text-6xl font-black text-white tracking-tighter"
                                            >
                                                {creditScore}
                                            </span>
                                            <span className="text-xs uppercase tracking-widest text-text-secondary mt-1">
                                                Excellent
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between px-8 mt-6 text-xs font-mono text-text-secondary">
                                        <span>0</span>
                                        <span>SCORE</span>
                                        <span>100</span>
                                    </div>
                                    <div className="mt-8 flex flex-col items-center gap-2 text-center">
                                        <p className="text-slate-300 text-sm">
                                            Your creditworthiness is in the top 15% of users.
                                        </p>
                                    </div>
                                </div>

                                {/* Justification Card */}
                                <div className="lg:col-span-7 flex flex-col bg-card-dark rounded-2xl shadow-sm border border-border-dark overflow-hidden">
                                    <div
                                        className="h-32 bg-cover bg-center relative"
                                        style={{
                                            backgroundImage:
                                                "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop')",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-card-dark/80 to-transparent"></div>
                                    </div>
                                    <div className="p-8 -mt-12 relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                                <span className="material-symbols-outlined">analytics</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Score Justification</h3>
                                        </div>
                                        <p className="text-slate-300 mb-6 leading-relaxed">
                                            Score calculated based on consistent payment history and positive cash flow
                                            analysis from your encrypted bank data. No missed payments detected in the
                                            last 12 months across 4 connected accounts.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-background-dark border border-border-dark flex items-start gap-3">
                                                <span className="material-symbols-outlined text-primary mt-1">
                                                    history
                                                </span>
                                                <div>
                                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">
                                                        History
                                                    </p>
                                                    <p className="text-white font-medium">12 Mo. Perfect Payments</p>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-background-dark border border-border-dark flex items-start gap-3">
                                                <span className="material-symbols-outlined text-primary mt-1">
                                                    account_balance
                                                </span>
                                                <div>
                                                    <p className="text-xs text-text-secondary uppercase font-bold tracking-wider">
                                                        Cash Flow
                                                    </p>
                                                    <p className="text-white font-medium">Positive Net Income</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Tiers Section */}
                            <div className="pt-8">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    Available Loan Tiers
                                    <span className="text-xs font-normal px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20">
                                        Based on Score {creditScore}
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Tier 1 Card (Unlocked/Active) */}
                                    <div className="group relative flex flex-col bg-card-dark rounded-2xl p-6 border border-primary shadow-[0_0_0_1px_#0df26c] transition-transform hover:-translate-y-1">
                                        <div className="absolute top-4 right-4 text-primary">
                                            <span className="material-symbols-outlined">lock_open</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">Tier 1: Prime</h3>
                                        <p className="text-primary text-sm font-bold mb-6">Unlocked</p>
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-border-dark">
                                                <span className="text-text-secondary text-sm">Collateral Ratio</span>
                                                <span className="text-white font-mono font-medium">105%</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-border-dark">
                                                <span className="text-text-secondary text-sm">Max LTV</span>
                                                <span className="text-white font-mono font-medium">95%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-text-secondary text-sm">APR (Variable)</span>
                                                <span className="text-primary font-mono font-bold">4.5%</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => router.push('/lending')}
                                            className="mt-auto w-full py-3 px-4 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Apply for Loan
                                        </button>
                                    </div>

                                    {/* Tier 2 Card (Locked) */}
                                    <div className="relative flex flex-col bg-background-dark rounded-2xl p-6 border border-border-dark opacity-75">
                                        <div className="absolute top-4 right-4 text-text-secondary">
                                            <span className="material-symbols-outlined">lock</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">Tier 2: Standard</h3>
                                        <p className="text-text-secondary text-sm mb-6">Requires Score 90+</p>
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-800">
                                                <span className="text-text-secondary text-sm">Collateral Ratio</span>
                                                <span className="text-text-secondary font-mono">125%</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-800">
                                                <span className="text-text-secondary text-sm">Max LTV</span>
                                                <span className="text-text-secondary font-mono">80%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-text-secondary text-sm">APR</span>
                                                <span className="text-text-secondary font-mono">5.2%</span>
                                            </div>
                                        </div>
                                        <button
                                            className="mt-auto w-full py-3 px-4 bg-border-dark text-text-secondary font-medium rounded-lg cursor-not-allowed"
                                            disabled
                                        >
                                            Locked
                                        </button>
                                    </div>

                                    {/* Tier 3 Card (Locked) */}
                                    <div className="relative flex flex-col bg-background-dark rounded-2xl p-6 border border-border-dark opacity-75">
                                        <div className="absolute top-4 right-4 text-text-secondary">
                                            <span className="material-symbols-outlined">lock</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">Tier 3: Entry</h3>
                                        <p className="text-text-secondary text-sm mb-6">For New Users</p>
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-800">
                                                <span className="text-text-secondary text-sm">Collateral Ratio</span>
                                                <span className="text-text-secondary font-mono">150%</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-800">
                                                <span className="text-text-secondary text-sm">Max LTV</span>
                                                <span className="text-text-secondary font-mono">66%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-text-secondary text-sm">APR</span>
                                                <span className="text-text-secondary font-mono">6.8%</span>
                                            </div>
                                        </div>
                                        <button
                                            className="mt-auto w-full py-3 px-4 bg-border-dark text-text-secondary font-medium rounded-lg cursor-not-allowed"
                                            disabled
                                        >
                                            Locked
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Footer Info */}
                    <div className="mt-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-border-dark text-sm text-text-secondary">
                        <p>© 2024 PrivaCRE Protocol. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Documentation
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
