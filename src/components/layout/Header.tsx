import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-surface-border bg-background-dark/95 px-6 py-4 backdrop-blur-md lg:px-10">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">token</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                    PrivaCRE
                </h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                >
                    Dashboard
                </Link>
                <Link
                    href="/lending"
                    className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                >
                    Loans
                </Link>
                <Link
                    href="/orchestration"
                    className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                >
                    Orchestration
                </Link>
                <Link
                    href="/bridge"
                    className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                >
                    Bridge
                </Link>
            </nav>
            <div className="flex items-center gap-3">
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface-dark text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">
                        notifications
                    </span>
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface-dark text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">
                        account_circle
                    </span>
                </button>
            </div>
        </header>
    );
}
