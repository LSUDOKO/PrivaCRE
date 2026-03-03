import Header from "@/components/layout/Header";

export default function BridgePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center py-10 px-4 sm:px-6 lg:px-8 w-full">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    {/* Security Badge */}
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

                    {/* Bank Selection Grid */}
                    <div className="w-full mb-10">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-semibold text-lg">Select Data Source</h3>
                            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                                + Add Custom Source
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Active Bank Card */}
                            <div className="group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border-2 border-primary cursor-pointer transition-all">
                                <div className="absolute top-3 right-3 text-primary">
                                    <span className="material-symbols-outlined fill-1">check_circle</span>
                                </div>
                                <div className="size-12 rounded-full bg-blue-900 flex items-center justify-center text-white overflow-hidden border border-white/10">
                                    <span className="font-bold text-xs">CHASE</span>
                                </div>
                                <div>
                                    <p className="font-bold">Chase Checking</p>
                                    <p className="text-slate-400 text-xs mt-1">Last synced: Just now</p>
                                </div>
                            </div>

                            {/* Inactive Bank Card */}
                            <div className="group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all">
                                <div className="size-12 rounded-full bg-red-800 flex items-center justify-center text-white overflow-hidden border border-white/10">
                                    <span className="font-bold text-xs">WF</span>
                                </div>
                                <div>
                                    <p className="font-bold">Wells Fargo</p>
                                    <p className="text-slate-400 text-xs mt-1">Connect to bridge</p>
                                </div>
                            </div>

                            {/* Mock Bank Card */}
                            <div className="group relative flex flex-col items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all">
                                <div className="size-12 rounded-full bg-slate-700 flex items-center justify-center text-white overflow-hidden border border-white/10">
                                    <span className="material-symbols-outlined">account_balance</span>
                                </div>
                                <div>
                                    <p className="font-bold">Mock Bank</p>
                                    <p className="text-slate-400 text-xs mt-1">Sandbox Mode</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permission Toggles */}
                    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 mb-8">
                        <h3 className="font-bold text-lg mb-1">Data Permissions</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Review what data will be encrypted and used for your credit scoring.
                        </p>
                        <div className="space-y-4">
                            {/* Allowed Item */}
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Monthly Income Analysis</p>
                                        <p className="text-slate-400 text-xs">Verifies recurring deposits</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                    <span className="material-symbols-outlined text-lg">check</span>
                                    <span>Allowed</span>
                                </div>
                            </div>

                            {/* Allowed Item */}
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Average Spending Habits</p>
                                        <p className="text-slate-400 text-xs">Calculates risk metrics</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                    <span className="material-symbols-outlined text-lg">check</span>
                                    <span>Allowed</span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/10 my-2"></div>

                            {/* Redacted Item */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 opacity-80">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined">badge</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-300 font-medium">Personal Identity (PII)</p>
                                        <p className="text-slate-500 text-xs">Name, SSN, Address</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm bg-white/10 px-3 py-1 rounded">
                                    <span className="material-symbols-outlined text-sm">visibility_off</span>
                                    <span>REDACTED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full md:w-auto min-w-[320px] group relative flex items-center justify-center gap-3 bg-primary hover:bg-emerald-400 text-background-dark text-lg font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(13,242,108,0.3)] hover:shadow-[0_0_30px_rgba(13,242,108,0.5)]">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span>Start Confidential AI Analysis</span>
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
