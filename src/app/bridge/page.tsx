"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { IDKitWidget, VerificationLevel, type ISuccessResult } from "@worldcoin/idkit";

const WORLD_ID_APP_ID = (process.env.NEXT_PUBLIC_WORLD_ID_APP_ID as `app_${string}`) || "app_7141eab28d3662245856d528b69d89e4";

export default function BridgePage() {
    const { isConnected } = useAccount();
    const [connectedSource, setConnectedSource] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const source = localStorage.getItem("privacre_source");
        if (source) setConnectedSource(source);
        const verified = localStorage.getItem("privacre_verified") === "true";
        setIsVerified(verified);
    }, []);

    const connectSource = (source: string) => {
        setConnectedSource(source);
        localStorage.setItem("privacre_source", source);
        alert(`Connected to ${source} successfully!`);
    };

    const handleWorldIDVerification = async (proof: ISuccessResult) => {
        console.log("World ID Proof (Bridge):", proof);
        setIsVerified(true);
        localStorage.setItem("privacre_verified", "true");
        if (proof.nullifier_hash) {
            localStorage.setItem("world_id_nullifier", proof.nullifier_hash);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center py-10 px-4 sm:px-6 lg:px-8 w-full">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    {/* Secure Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/30 px-4 py-1.5 border border-emerald-500/20 mb-8">
                        <span className="material-symbols-outlined text-primary text-sm">lock</span>
                        <span className="text-emerald-100 text-xs font-medium uppercase tracking-wider">
                            Secure Environment • End-to-End Encrypted
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            Confidential Data Bridge
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Securely connect your primary banking institution. Our Zero-Knowledge architecture ensures
                            your raw data never leaves your device unencrypted.
                        </p>
                    </div>

                    {/* World ID Verification Gate */}
                    {!isVerified && (
                        <div className="w-full mb-8 rounded-xl border-2 border-dashed border-yellow-500/30 bg-yellow-900/10 p-6 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                    <div className="h-5 w-5 rounded-full border-2 border-black"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">World ID Required</h3>
                                    <p className="text-xs text-slate-400">Verify your identity before connecting bank data</p>
                                </div>
                            </div>
                            <IDKitWidget
                                app_id={WORLD_ID_APP_ID}
                                action="verify-bridge-access"
                                verification_level={VerificationLevel.Orb}
                                handleVerify={handleWorldIDVerification}
                                onSuccess={() => setIsVerified(true)}
                                // @ts-ignore
                                environment="staging"
                            >
                                {({ open }: { open: () => void }) => (
                                    <button
                                        onClick={open}
                                        className="flex items-center gap-2 px-6 py-3 bg-primary text-background-dark rounded-lg font-bold hover:shadow-[0_0_20px_rgba(13,242,108,0.3)] transition-all"
                                    >
                                        <span className="material-symbols-outlined text-lg">verified_user</span>
                                        Verify with World ID
                                    </button>
                                )}
                            </IDKitWidget>
                            <p className="text-[10px] text-yellow-400/60">⚠️ Sybil resistance: one human = one score. Verification boosts your Crest Score by +15%.</p>
                        </div>
                    )}

                    {/* Verified Badge */}
                    {isVerified && (
                        <div className="w-full mb-8 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                            <div>
                                <span className="text-sm font-bold text-primary">World ID Verified</span>
                                <p className="text-xs text-slate-400">Your identity is confirmed. You can now connect bank data securely.</p>
                            </div>
                        </div>
                    )}

                    {/* Bank Selection Grid */}
                    <div className={`w-full mb-10 ${!isVerified ? 'opacity-40 pointer-events-none' : ''}`}>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-semibold text-lg">Select Data Source</h3>
                            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                                + Add Custom Source
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div
                                onClick={() => connectSource("Chase Checking")}
                                className={`group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border-2 cursor-pointer transition-all ${connectedSource === "Chase Checking" ? "border-primary" : "border-white/10 hover:border-white/20"}`}
                            >
                                {connectedSource === "Chase Checking" && (
                                    <div className="absolute top-3 right-3 text-primary">
                                        <span className="material-symbols-outlined fill-1">check_circle</span>
                                    </div>
                                )}
                                <div className="size-12 rounded-full bg-blue-900 flex items-center justify-center text-white overflow-hidden border border-white/10 font-bold text-xs">CHASE</div>
                                <div><p className="font-bold">Chase Checking</p></div>
                            </div>
                            <div
                                onClick={() => connectSource("Wells Fargo")}
                                className={`group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border-2 cursor-pointer transition-all ${connectedSource === "Wells Fargo" ? "border-primary" : "border-white/10 hover:border-white/20"}`}
                            >
                                {connectedSource === "Wells Fargo" && (
                                    <div className="absolute top-3 right-3 text-primary">
                                        <span className="material-symbols-outlined fill-1">check_circle</span>
                                    </div>
                                )}
                                <div className="size-12 rounded-full bg-red-800 flex items-center justify-center text-white overflow-hidden border border-white/10 font-bold text-xs">WF</div>
                                <div><p className="font-bold">Wells Fargo</p></div>
                            </div>
                            <div
                                onClick={() => connectSource("Mock Bank")}
                                className={`group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border-2 cursor-pointer transition-all ${connectedSource === "Mock Bank" ? "border-primary" : "border-white/10 hover:border-white/20"}`}
                            >
                                {connectedSource === "Mock Bank" && (
                                    <div className="absolute top-3 right-3 text-primary">
                                        <span className="material-symbols-outlined fill-1">check_circle</span>
                                    </div>
                                )}
                                <div className="size-12 rounded-full bg-slate-700 flex items-center justify-center text-white overflow-hidden border border-white/10"><span className="material-symbols-outlined">account_balance</span></div>
                                <div><p className="font-bold">Mock Bank</p></div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => {
                            if (!isConnected) {
                                alert("Please connect your wallet first.");
                                return;
                            }
                            if (!isVerified) {
                                alert("Please verify your identity with World ID first.");
                                return;
                            }
                            if (!connectedSource) {
                                alert("Please select a bank data source.");
                                return;
                            }
                            window.location.href = '/orchestration';
                        }}
                        className={`w-full md:w-auto min-w-[320px] group relative flex items-center justify-center gap-3 text-lg font-bold py-4 px-8 rounded-xl transition-all ${isConnected && connectedSource && isVerified ? "bg-primary hover:bg-emerald-400 text-background-dark shadow-[0_0_20px_rgba(13,242,108,0.3)] hover:shadow-[0_0_30px_rgba(13,242,108,0.5)]" : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}
                    >
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span>{!isVerified ? "Verify World ID First" : isConnected ? "Start Confidential AI Analysis" : "Connect Wallet to Start"}</span>
                        <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all material-symbols-outlined">
                            arrow_forward
                        </span>
                    </button>
                    <p className="mt-4 text-xs text-slate-400 text-center">
                        By clicking start, you agree to the{" "}
                        <a className="text-primary hover:underline" href="#">
                            Terms of Service
                        </a>
                        . No data is stored on our servers.
                    </p>
                </div>
            </main>
        </div>
    );
}
