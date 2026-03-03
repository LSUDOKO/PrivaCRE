import Link from "next/link";

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <div className="layout-container flex h-full grow flex-col">
                {/* Header */}
                <div className="w-full flex justify-center sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-border-dark">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        <header className="flex items-center justify-between whitespace-nowrap px-4 md:px-10 py-4">
                            <div className="flex items-center gap-3 text-white">
                                <div className="size-8 text-primary">
                                    <span className="material-symbols-outlined !text-[32px]">security</span>
                                </div>
                                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">
                                    PrivaCRE
                                </h2>
                            </div>
                            <div className="hidden md:flex items-center gap-8">
                                <nav className="flex items-center gap-8">
                                    <a
                                        className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                                        href="#how-it-works"
                                    >
                                        How it Works
                                    </a>
                                    <a
                                        className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                                        href="#security"
                                    >
                                        Security
                                    </a>
                                    <Link
                                        className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                                        href="/orchestration"
                                    >
                                        Governance
                                    </Link>
                                    <a
                                        className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                                        href="#faq"
                                    >
                                        FAQ
                                    </a>
                                </nav>
                            </div>
                            <Link
                                href="/dashboard"
                                className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-wide hover:bg-white transition-colors"
                            >
                                <span className="truncate">Launch App</span>
                            </Link>
                        </header>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        {/* Hero Section */}
                        <div className="px-4 md:px-10 py-12 md:py-20">
                            <div className="relative overflow-hidden rounded-2xl bg-surface-dark border border-border-dark">
                                {/* Background glow effect */}
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="flex min-h-[560px] flex-col gap-8 items-center justify-center p-8 md:p-12 relative z-10 text-center">
                                    <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter max-w-4xl">
                                        Your Privacy is <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                            Your Credit
                                        </span>
                                    </h1>
                                    <p className="text-text-secondary text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                                        Unlock undercollateralized DeFi loans using encrypted bank data and World ID
                                        verification. No credit score needed, just your financial reputation.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                                        <Link
                                            href="/dashboard"
                                            className="glow-effect flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold leading-normal hover:bg-white hover:scale-105 transition-all duration-300"
                                        >
                                            Launch Crest App
                                        </Link>
                                        <button className="flex w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 border border-border-dark bg-transparent text-white text-base font-bold leading-normal hover:bg-white/5 transition-colors">
                                            Read Documentation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How it Works Section */}
                        <div id="how-it-works" className="flex flex-col gap-10 px-4 md:px-10 py-16">
                            <div className="flex flex-col gap-4 text-center items-center">
                                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    How PrivaCRE Works
                                </h2>
                                <p className="text-text-secondary text-lg font-normal max-w-2xl">
                                    Secure, private, and efficient lending powered by zero-knowledge proofs.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Step 1 */}
                                <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                    <div className="w-14 h-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                                        <span className="material-symbols-outlined !text-3xl">lock</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-white text-xl font-bold">Connect Private Data</h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            Securely link your bank account. Your raw data is encrypted locally and
                                            never leaves your device or revealed to the protocol.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                    <div className="w-14 h-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                                        <span className="material-symbols-outlined !text-3xl">smart_toy</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-white text-xl font-bold">AI Risk Analysis</h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            Our decentralized AI analyzes transaction history to generate a ZK-proof
                                            credit score without exposing sensitive details.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                    <div className="w-14 h-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                                        <span className="material-symbols-outlined !text-3xl">currency_bitcoin</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-white text-xl font-bold">Unlock DeFi Loans</h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            Access undercollateralized stablecoin loans instantly based on your proven
                                            financial reputation and on-chain history.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Banner / Partners */}
                        <div id="security" className="px-4 md:px-10 py-16 bg-background-dark">
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                        Trusted By Industry Leaders
                                    </h2>
                                    <p className="text-text-secondary text-lg font-normal">
                                        Built with the most secure infrastructure in Web3.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Card 1 */}
                                    <div className="flex flex-col gap-4 p-4 rounded-xl hover:bg-surface-dark transition-colors">
                                        <div className="w-full h-48 bg-surface-dark border border-border-dark rounded-lg flex items-center justify-center overflow-hidden relative">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-60 hover:opacity-100 transition-opacity"
                                                style={{
                                                    backgroundImage:
                                                        "url('https://www.creativefabrica.com/wp-content/uploads/2021/06/15/Cryptocurrency-Chainlink-Logo-Graphics-13436600-1.jpg')",
                                                }}
                                            ></div>
                                            <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/30">
                                                Infrastructure
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-lg font-bold flex items-center gap-2">
                                                Chainlink
                                                <span className="material-symbols-outlined text-primary text-sm">
                                                    verified
                                                </span>
                                            </h4>
                                            <p className="text-text-secondary text-sm mt-1">
                                                Providing decentralized oracle networks for reliable off-chain data
                                                feeds.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="flex flex-col gap-4 p-4 rounded-xl hover:bg-surface-dark transition-colors">
                                        <div className="w-full h-48 bg-surface-dark border border-border-dark rounded-lg flex items-center justify-center overflow-hidden relative">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-60 hover:opacity-100 transition-opacity"
                                                style={{
                                                    backgroundImage:
                                                        "url('https://logowik.com/content/uploads/images/worldcoin2094.logowik.com.webp')",
                                                }}
                                            ></div>
                                            <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/30">
                                                Identity
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-lg font-bold flex items-center gap-2">
                                                World ID
                                                <span className="material-symbols-outlined text-primary text-sm">
                                                    verified
                                                </span>
                                            </h4>
                                            <p className="text-text-secondary text-sm mt-1">
                                                Ensuring unique human verification without revealing identity.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="flex flex-col gap-4 p-4 rounded-xl hover:bg-surface-dark transition-colors">
                                        <div className="w-full h-48 bg-surface-dark border border-border-dark rounded-lg flex items-center justify-center overflow-hidden relative">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-60 hover:opacity-100 transition-opacity"
                                                style={{
                                                    backgroundImage:
                                                        "url('https://storage.googleapis.com/job-listing-logos/898e7932-499b-4059-96ac-af7564448c85.png')",
                                                }}
                                            ></div>
                                            <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/30">
                                                Security
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white text-lg font-bold flex items-center gap-2">
                                                Tenderly
                                                <span className="material-symbols-outlined text-primary text-sm">
                                                    verified
                                                </span>
                                            </h4>
                                            <p className="text-text-secondary text-sm mt-1">
                                                Real-time monitoring and simulation for secure smart contracts.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="px-4 md:px-10 py-20">
                            <div className="rounded-3xl bg-gradient-to-br from-surface-dark to-background-dark border border-border-dark p-10 md:p-16 text-center relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                                <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6 relative z-10">
                                    Ready to leverage your reputation?
                                </h2>
                                <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                                    Join the future of private decentralized finance. Start building your on-chain
                                    credit score today.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
                                    <Link
                                        href="/dashboard"
                                        className="glow-effect flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-background-dark text-lg font-bold hover:bg-white transition-colors"
                                    >
                                        Launch PrivaCRE App
                                    </Link>
                                    <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 border border-border-dark bg-surface-dark text-white text-lg font-bold hover:bg-white/5 transition-colors">
                                        Join Discord
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="border-t border-border-dark bg-background-dark px-4 md:px-10 py-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-white">
                                        <div className="size-6 text-primary">
                                            <span className="material-symbols-outlined">security</span>
                                        </div>
                                        <span className="text-lg font-bold">PrivaCRE</span>
                                    </div>
                                    <p className="text-text-secondary text-sm">
                                        © 2024 PrivaCRE Protocol. All rights reserved.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-8">
                                    <a
                                        className="text-text-secondary hover:text-white transition-colors text-sm"
                                        href="#"
                                    >
                                        Terms of Service
                                    </a>
                                    <a
                                        className="text-text-secondary hover:text-white transition-colors text-sm"
                                        href="#"
                                    >
                                        Privacy Policy
                                    </a>
                                    <a
                                        className="text-text-secondary hover:text-white transition-colors text-sm"
                                        href="#"
                                    >
                                        Documentation
                                    </a>
                                    <a
                                        className="text-text-secondary hover:text-white transition-colors text-sm"
                                        href="#"
                                    >
                                        Twitter
                                    </a>
                                    <a
                                        className="text-text-secondary hover:text-white transition-colors text-sm"
                                        href="#"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
