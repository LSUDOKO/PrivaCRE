"use client";

import Link from "next/link";
import { Home, LayoutDashboard, Coins, Network, Bridge } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function Header() {
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
        { name: 'Loans', url: '/lending', icon: Coins },
        { name: 'Orchestration', url: '/orchestration', icon: Network },
        { name: 'Bridge', url: '/bridge', icon: Bridge }
    ];

    return (
        <>
            <NavBar items={navItems} />
            <header className="fixed top-0 right-0 z-50 pt-6 pr-6">
                <div className="flex items-center gap-4">
                    <ConnectButton
                        accountStatus="address"
                        showBalance={false}
                        chainStatus="icon"
                    />
                    <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-black/40 backdrop-blur-xl text-primary hover:bg-primary/10 transition-all duration-300 shadow-lg shadow-primary/10">
                        <span className="material-symbols-outlined text-xl">
                            notifications
                        </span>
                    </button>
                </div>
            </header>
        </>
    );
}
