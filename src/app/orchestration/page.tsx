import Header from "@/components/layout/Header";

export default function OrchestrationPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4 py-8 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    {/* Page Title Area */}
                    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-1">
                                <span className="material-symbols-outlined text-lg">hub</span>
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    System Operational
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-white md:text-4xl">
                                CRE Orchestration Brain
                            </h2>
                            <p className="mt-2 text-slate-400 max-w-2xl">
                                Real-time execution environment for Zero-Knowledge Loan Processing.
                                Monitoring active decentralized nodes and privacy-preserving computation.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button className="flex items-center gap-2 rounded-lg bg-surface-dark px-4 py-2 text-sm font-medium text-white border border-surface-border hover:bg-surface-border transition-colors">
                                <span className="material-symbols-outlined text-sm">history</span>
                                Logs
                            </button>
                            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background-dark hover:bg-primary-dark transition-colors">
                                <span className="material-symbols-outlined text-sm">refresh</span>
                                Force Sync
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {/* Latency Card */}
                        <div className="rounded-xl border border-surface-border bg-surface-dark/50 p-5 backdrop-blur-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Network Latency</p>
                                    <h3 className="mt-1 text-2xl font-bold text-white">14ms</h3>
                                </div>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-lg">speed</span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="flex items-center text-xs font-medium text-primary">
                                    <span className="material-symbols-outlined text-sm mr-0.5">trending_down</span>
                                    -2%
                                </span>
                                <span className="text-xs text-slate-500">vs last hour</span>
                            </div>
                        </div>

                        {/* Encryption Card */}
                        <div className="rounded-xl border border-surface-border bg-surface-dark/50 p-5 backdrop-blur-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Encryption Layer</p>
                                    <h3 className="mt-1 text-2xl font-bold text-white">AES-256</h3>
                                </div>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                                    <span className="material-symbols-outlined text-lg">enhanced_encryption</span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="rounded bg-surface-border px-1.5 py-0.5 text-xs font-medium text-slate-300">
                                    ZK-SNARKs Enabled
                                </span>
                            </div>
                        </div>

                        {/* Node Status Card */}
                        <div className="rounded-xl border border-surface-border bg-surface-dark/50 p-5 backdrop-blur-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Node Status</p>
                                    <h3 className="mt-1 text-2xl font-bold text-success">Healthy</h3>
                                </div>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
                                <span className="text-xs text-slate-500">All systems operational</span>
                            </div>
                        </div>

                        {/* Active Sessions Card */}
                        <div className="rounded-xl border border-surface-border bg-surface-dark/50 p-5 backdrop-blur-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Active Sessions</p>
                                    <h3 className="mt-1 text-2xl font-bold text-white">12</h3>
                                </div>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                                    <span className="material-symbols-outlined text-lg">group</span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="h-5 w-5 rounded-full bg-slate-600 border border-surface-dark"></div>
                                    <div className="h-5 w-5 rounded-full bg-slate-500 border border-surface-dark"></div>
                                    <div className="h-5 w-5 rounded-full bg-slate-400 border border-surface-dark"></div>
                                </div>
                                <span className="text-xs text-slate-500">+3 joining</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Stepper Process */}
                        <div className="lg:col-span-2 rounded-2xl border border-surface-border bg-surface-dark p-6 lg:p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Loan Orchestration Pipeline</h3>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                    ID: #CRE-9928-XJ
                                </span>
                            </div>
                            <div className="relative">
                                {/* Connecting Line */}
                                <div className="absolute left-6 top-6 h-[calc(100%-48px)] w-0.5 bg-surface-border"></div>

                                {/* Step 1: Success */}
                                <div className="relative z-10 mb-8 flex gap-6 group">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success border-4 border-surface-dark shadow-[0_0_15px_rgba(11,218,67,0.3)]">
                                        <span className="material-symbols-outlined text-background-dark font-bold">check</span>
                                    </div>
                                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-dark/50 p-4 transition-all hover:bg-surface-border/30">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-white text-lg">Fetching Private Data</h4>
                                            <span className="text-xs font-mono text-success bg-success/10 px-2 py-0.5 rounded">
                                                COMPLETE
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 mb-2">
                                            Secure retrieval of banking data via Plaid integration.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span> 120ms
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">database</span> 2.4KB
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Active */}
                                <div className="relative z-10 mb-8 flex gap-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary border-4 border-surface-dark shadow-[0_0_20px_rgba(13,242,108,0.4)] animate-pulse">
                                        <span className="material-symbols-outlined text-background-dark font-bold">lock</span>
                                    </div>
                                    <div className="flex-1 rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-lg shadow-primary/5">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-white text-lg">Encrypting Payload</h4>
                                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded animate-pulse">
                                                ACTIVE
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-300 mb-3">
                                            Generating Zero-Knowledge proof inputs and encrypting sensitive fields.
                                        </p>
                                        {/* Progress Bar */}
                                        <div className="w-full bg-surface-border rounded-full h-1.5 mb-2 overflow-hidden">
                                            <div className="bg-primary h-1.5 rounded-full" style={{ width: "75%" }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs font-mono text-primary/80">
                                            <span>Key Exchange...</span>
                                            <span>75%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Processing (Next) */}
                                <div className="relative z-10 mb-8 flex gap-6 opacity-80">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-border border-4 border-surface-dark text-slate-400">
                                        <span className="material-symbols-outlined">psychology</span>
                                    </div>
                                    <div className="flex-1 rounded-xl border border-surface-border bg-surface-dark/30 p-4 border-dashed">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-300 text-lg">AI Risk Modeling</h4>
                                            <span className="text-xs font-mono text-warning bg-warning/10 px-2 py-0.5 rounded">
                                                QUEUED
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            AI analyzing vectors for creditworthiness and default probability.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 4: Waiting */}
                                <div className="relative z-10 flex gap-6 opacity-50">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-border border-4 border-surface-dark text-slate-500">
                                        <span className="material-symbols-outlined">signature</span>
                                    </div>
                                    <div className="flex-1 rounded-xl border border-surface-border bg-transparent p-4 border-dashed">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-400 text-lg">Signing On-Chain Proof</h4>
                                            <span className="text-xs font-mono text-slate-600 bg-slate-800 px-2 py-0.5 rounded">
                                                WAITING
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Pending final completion of risk analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Terminal & Details */}
                        <div className="flex flex-col gap-6">
                            {/* Terminal Window */}
                            <div className="flex-1 rounded-2xl border border-surface-border bg-[#0a0f0c] overflow-hidden flex flex-col shadow-2xl">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between border-b border-surface-border bg-[#161b18] px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-error/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-warning/80"></div>
                                        <div className="h-3 w-3 rounded-full bg-success/80"></div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-500">risk-engine-v4.2.sh</div>
                                    <div className="w-12"></div>
                                </div>
                                {/* Terminal Body */}
                                <div className="flex-1 p-4 font-mono text-xs md:text-sm leading-relaxed text-slate-300 overflow-hidden relative">
                                    <div className="space-y-1">
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:01</span>
                                            <span className="text-primary">&gt; System initialized...</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:02</span>
                                            <span className="text-white">Connecting to Plaid endpoint [secure]</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:04</span>
                                            <span className="text-success">&gt; Data retrieval successful (200 OK)</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:05</span>
                                            <span className="text-white">Parsing transaction history...</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:05</span>
                                            <span className="text-white">Found 124 relevant txns in last 90 days.</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:06</span>
                                            <span className="text-warning">! Encrypting payload with public key</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-slate-500">14:20:06</span>
                                            <span className="text-white">Generating ZK-SNARK inputs...</span>
                                        </div>
                                        <div className="flex gap-2 border-t border-slate-800 mt-2 pt-2">
                                            <span className="text-slate-500">14:20:07</span>
                                            <span className="text-primary font-bold">&gt; AI Model Analysis Started</span>
                                        </div>
                                        <div className="flex gap-2 pl-4 border-l-2 border-slate-700 ml-1">
                                            <span className="text-slate-400">Analyzing cash flow patterns...</span>
                                        </div>
                                        <div className="flex gap-2 pl-4 border-l-2 border-slate-700 ml-1">
                                            <span className="text-slate-400">Checking recurring revenue...</span>
                                        </div>
                                        <div className="flex gap-2 pl-4 border-l-2 border-slate-700 ml-1">
                                            <span className="text-slate-400">
                                                Probability of default: <span className="text-success font-bold">0.04</span>
                                            </span>
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            <span className="text-primary animate-pulse">_</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Code Snippet / Config */}
                            <div className="rounded-xl border border-surface-border bg-surface-dark p-4">
                                <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
                                    Proof Config
                                </h4>
                                <div className="font-mono text-xs text-slate-300 bg-background-dark p-3 rounded-lg border border-surface-border overflow-x-auto">
                                    <pre>{`{
  "proof_type": "groth16",
  "curve": "bn128",
  "public_signals": [
    "0x29a...f1b",
    "0x91c...3e2"
  ],
  "constraints": 4205
}`}</pre>
                                </div>
                            </div>

                            {/* Documentation Link */}
                            <a
                                className="group flex items-center justify-between rounded-xl border border-surface-border bg-surface-dark p-4 transition-colors hover:border-primary/50"
                                href="#"
                            >
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-primary">
                                        Developer Docs
                                    </h4>
                                    <p className="text-xs text-slate-500">View integration guide</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Footer / Map Visualization Area */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-surface-border bg-surface-dark p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,242,108,0.1),transparent_50%)]"></div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4">Node Distribution</h3>
                                {/* Abstract Map Representation */}
                                <div className="relative h-48 w-full rounded-lg bg-background-dark border border-surface-border overflow-hidden">
                                    <div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: "radial-gradient(#284435 1px, transparent 1px)",
                                            backgroundSize: "20px 20px",
                                        }}
                                    ></div>
                                    {/* Node Points */}
                                    <div className="absolute top-1/3 left-1/4 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_#0df26c]"></div>
                                    <div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary/50"></div>
                                    <div className="absolute top-1/4 left-2/3 h-2 w-2 rounded-full bg-primary/70"></div>
                                    <div className="absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_#0df26c]"></div>
                                    {/* Connecting Lines */}
                                    <svg className="absolute inset-0 h-full w-full pointer-events-none">
                                        <path
                                            d="M120 70 Q 250 100 380 140"
                                            fill="none"
                                            stroke="#0df26c"
                                            strokeOpacity="0.2"
                                            strokeWidth="1"
                                        ></path>
                                        <path
                                            d="M350 60 Q 360 100 380 140"
                                            fill="none"
                                            stroke="#0df26c"
                                            strokeOpacity="0.1"
                                            strokeWidth="1"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="mt-4 flex gap-4 text-xs font-mono text-slate-400">
                                    <span>
                                        US-EAST-1: <span className="text-success">ONLINE</span>
                                    </span>
                                    <span>
                                        EU-WEST-2: <span className="text-success">ONLINE</span>
                                    </span>
                                    <span>
                                        AP-SOUTH-1: <span className="text-warning">DEGRADED</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-surface-border bg-surface-dark p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-10 w-10 rounded bg-white flex items-center justify-center p-1">
                                    <div className="h-6 w-6 rounded-full border-2 border-black"></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Identity Verification</h3>
                                    <p className="text-sm text-slate-400">Powered by World ID</p>
                                </div>
                                <span className="ml-auto rounded-full bg-success/10 px-2 py-1 text-xs font-bold text-success border border-success/20">
                                    VERIFIED
                                </span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Nullifier Hash</span>
                                    <span className="font-mono text-white">0x71...9a2b</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Verification Level</span>
                                    <span className="text-white">Orb (Biometric)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Timestamp</span>
                                    <span className="font-mono text-white">2023-10-24 14:18:22 UTC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
