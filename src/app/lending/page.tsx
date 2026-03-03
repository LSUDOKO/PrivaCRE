import Header from "@/components/layout/Header";
import Image from "next/image";

export default function LendingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex justify-center py-8 lg:py-12 px-4">
                <div className="flex flex-col max-w-[960px] w-full gap-8">
                    {/* Page Title */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                            DeFi Lending Vault
                        </h1>
                        <p className="text-slate-400 text-lg font-normal max-w-2xl">
                            Borrow assets instantly against your encrypted reputation score. Your bank data remains
                            private and secure.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Crest Score Card */}
                        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-dark border border-border-green relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">shield</span>
                                <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">
                                    Your Crest Score
                                </p>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <p className="text-4xl font-bold">85</p>
                                <div className="flex items-center text-primary text-sm font-medium bg-primary/10 px-2 py-0.5 rounded">
                                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>+5 pts
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs">Based on recent bank data verification</p>
                        </div>

                        {/* Collateral Ratio Card */}
                        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-dark border border-border-green relative overflow-hidden">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-xl">percent</span>
                                <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">
                                    Collateral Ratio
                                </p>
                            </div>
                            <p className="text-4xl font-bold">65%</p>
                            <p className="text-slate-400 text-xs">Standard requirement: 150%</p>
                        </div>

                        {/* Available Liquidity */}
                        <div className="flex flex-col gap-3 rounded-xl p-6 bg-surface-dark border border-border-green relative overflow-hidden">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-xl">
                                    account_balance_wallet
                                </span>
                                <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">
                                    Available to Borrow
                                </p>
                            </div>
                            <p className="text-4xl font-bold">$50,000</p>
                            <p className="text-slate-400 text-xs">USDC Max Cap</p>
                        </div>
                    </div>

                    {/* Loan Interface */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Column: Input Form */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            <div className="bg-surface-dark rounded-xl border border-border-green p-6 lg:p-8">
                                <h3 className="text-xl font-bold mb-6">Configure Loan</h3>
                                {/* Amount Input */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-slate-300 text-sm font-medium">Borrow Amount</label>
                                            <span className="text-primary text-xs font-medium cursor-pointer hover:underline">
                                                Max: 15,000 USDC
                                            </span>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full bg-surface-darker border border-border-green rounded-lg py-4 pl-4 pr-32 text-2xl font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                                placeholder="0.00"
                                                type="number"
                                                defaultValue="5000"
                                            />
                                            <div className="absolute right-2 flex items-center gap-2 bg-surface-dark py-1.5 px-3 rounded border border-border-green">
                                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                                    $
                                                </div>
                                                <span className="font-bold">USDC</span>
                                                <span className="material-symbols-outlined text-slate-400 text-lg">
                                                    expand_more
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms Selection */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-300 text-sm font-medium">Repayment Term</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            <button className="py-3 px-4 rounded-lg bg-surface-darker border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
                                                30 Days
                                            </button>
                                            <button className="py-3 px-4 rounded-lg bg-surface-darker border border-border-green text-slate-400 font-medium text-sm hover:border-slate-500 transition-colors">
                                                60 Days
                                            </button>
                                            <button className="py-3 px-4 rounded-lg bg-surface-darker border border-border-green text-slate-400 font-medium text-sm hover:border-slate-500 transition-colors">
                                                90 Days
                                            </button>
                                        </div>
                                    </div>

                                    {/* Interest Info */}
                                    <div className="flex justify-between items-center py-4 border-t border-border-green mt-2">
                                        <span className="text-slate-400 text-sm">Interest Rate (APR)</span>
                                        <span className="font-bold">4.5%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Banner */}
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3 items-start">
                                <span className="material-symbols-outlined text-primary mt-0.5">verified_user</span>
                                <div>
                                    <p className="text-slate-200 text-sm font-medium">
                                        Undercollateralized Eligibility Confirmed
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Based on your Crest Score of 85, you are eligible for undercollateralized
                                        lending. Your bank data remains private.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Auto-Calculation & Action */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Auto-Calculation Box */}
                            <div className="bg-gradient-to-br from-surface-dark to-surface-darker rounded-xl border border-border-green p-6 lg:p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">
                                {/* Background accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <h4 className="text-lg font-bold flex items-center gap-2 z-10">
                                    <span className="material-symbols-outlined text-primary">calculate</span>
                                    Auto-Calculation
                                </h4>
                                <div className="space-y-4 z-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Borrow Amount</span>
                                        <span className="text-slate-200">5,000.00 USDC</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Standard Collateral</span>
                                        <span className="text-slate-400 line-through decoration-red-500/50">
                                            7,500.00 USDC
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-2 border-t border-dashed border-border-green">
                                        <span className="text-primary font-medium">Crest Discount</span>
                                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold">
                                            -45% Required
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-surface-darker/50 rounded-lg p-4 border border-border-green z-10">
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                        Collateral Required
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-white">4,125</span>
                                        <span className="text-sm font-medium text-slate-400">USDC worth of ETH</span>
                                    </div>
                                    <p className="text-xs text-primary mt-2">
                                        Based on your Crest Score (85), you save 3,375 USDC in capital efficiency.
                                    </p>
                                </div>
                                {/* Primary Action */}
                                <div className="flex flex-col gap-3 mt-2 z-10">
                                    <button className="w-full bg-primary hover:bg-green-400 text-surface-darker font-bold py-4 px-6 rounded-lg text-lg shadow-[0_0_20px_rgba(13,242,108,0.3)] hover:shadow-[0_0_30px_rgba(13,242,108,0.5)] transition-all flex items-center justify-center gap-2">
                                        Execute Loan via CRE
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                    <div className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-help">
                                        <span className="material-symbols-outlined text-[16px] text-slate-400">
                                            lock
                                        </span>
                                        <span className="text-xs text-slate-400">Encrypted by Chainlink Functions</span>
                                    </div>
                                </div>
                            </div>

                            {/* Protocol Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-dark p-4 rounded-lg border border-border-green">
                                    <p className="text-slate-400 text-xs mb-1">Protocol TVL</p>
                                    <p className="text-slate-200 font-bold">$124.5M</p>
                                </div>
                                <div className="bg-surface-dark p-4 rounded-lg border border-border-green">
                                    <p className="text-slate-400 text-xs mb-1">Active Loans</p>
                                    <p className="text-slate-200 font-bold">1,892</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
