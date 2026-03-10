"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Layers,
    Users,
    Settings,
    Hexagon,
    ChevronRight,
    Search,
    Bell,
    LogOut
} from "lucide-react";
import { PermissionGuard } from "./PermissionGuard";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NavItem {
    title: string;
    icon: React.ElementType;
    href: string;
    permission?: string;
    sector?: string;
}

interface User {
    name: string;
    plan: string;
    avatar?: string;
}

interface SidebarProps {
    user?: User | null;
    items: NavItem[];
    onLogout?: () => void;
}

export function Sidebar({ user, items, onLogout }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-72 h-screen flex flex-col border-r border-white/5 bg-[#050505]/50 backdrop-blur-xl sticky top-0">
            <div className="p-8 flex items-center gap-3">
                <img src="/logo.jpg" alt="NL Solutions" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                <span className="text-xl font-black tracking-tighter text-white">NL SOLUTIONS</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <PermissionGuard
                            key={item.href}
                            permission={item.permission}
                            sector={item.sector}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-white/5 border border-white/10 text-brand-primary"
                                        : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={cn(
                                        "w-5 h-5",
                                        isActive ? "text-brand-primary" : "text-white/20 group-hover:text-white/60"
                                    )} />
                                    <span className="font-bold text-sm tracking-tight">{item.title}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                    />
                                )}
                            </Link>
                        </PermissionGuard>
                    );
                })}
            </nav>

            {user && (
                <div className="p-4 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 overflow-hidden">
                            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : null}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">{user.name}</p>
                            <p className="text-[10px] text-white/30 truncate">{user.plan}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                            title="Sair"
                        >
                            <LogOut className="w-4 h-4 text-white/20 group-hover:text-red-400 transition-colors" />
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}
