export default function DashboardPage() {
    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col overflow-x-hidden text-slate-100">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-border-dark bg-background-dark/80 backdrop-blur-md px-6 py-4 md:px-10">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-8 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">PrivaCRE</h2>
                </div>
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    <a
                        className="text-text-secondary hover:text-primary text-sm font-medium transition-colors"
                        href="/dashboard"
                    >
                        Dashboard
                    </a>
                    <a
                        className="text-text-secondary hover:text-primary text-sm font-medium transition-colors"
                        href="/lending"
                    >
                        Borrow
                    </a>
                    <a
                        className="text-text-secondary hover:text-primary text-sm font-medium transition-colors"
                        href="#"
                    >
                        Repay
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 text-sm font-medium text-white bg-card-dark hover:bg-border-dark px-4 py-2 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        <span>0x84...c92</span>
                    </button>
                    <button className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary text-background-dark">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                </div>
            </header>

            <main className="layout-container flex flex-col grow items-center w-full px-4 py-8 md:px-10 lg:px-20">
                <div className="layout-content-container flex flex-col max-w-[1024px] w-full gap-8">
                    {/* Hero / Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-border-dark pb-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                                Your Crest Score
                            </h1>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="material-symbols-outlined text-lg text-primary">check_circle</span>
                                <p className="text-sm md:text-base font-normal">
                                    Identity verified by World ID. Data verified by Chainlink.
                                </p>
                            </div>
                        </div>
                        <button className="group flex items-center gap-2 px-5 py-2.5 bg-card-dark border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all shadow-[0_0_15px_rgba(13,242,108,0.1)] hover:shadow-[0_0_20px_rgba(13,242,108,0.2)]">
                            <span className="text-sm font-bold">View Proof on Tenderly</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                open_in_new
                            </span>
                        </button>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Score Gauge Card */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-card-dark rounded-2xl p-8 shadow-sm border border-border-dark relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="material-symbols-outlined text-[180px]">speed</span>
                            </div>
                            <div className="relative z-10 w-64 h-32 mt-4 mb-2">
                                {/* CSS-only semi-circle gauge */}
                                <div className="gauge-arc w-full h-full absolute top-0 left-0"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%-40px)] h-[calc(200%-40px)] bg-card-dark rounded-full"></div>
                                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-0">
                                    <span className="text-6xl font-black text-white tracking-tighter">85</span>
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
                                    analysis from your encrypted bank data. No missed payments detected in the last
                                    12 months across 4 connected accounts.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-background-dark border border-border-dark flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary mt-1">history</span>
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
                                Based on Score 85
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
                                <button className="mt-auto w-full py-3 px-4 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-colors">
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
