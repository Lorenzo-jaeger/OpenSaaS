"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

interface NavItem {
    title: string;
    href: string;
    permission?: string;
    sector?: string;
}

interface NavbarProps {
    user?: any;
    items?: NavItem[];
}

export function Navbar({ user, items = [] }: NavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    // Filter items based on user permissions
    const visibleItems = items.filter(item => {
        if (!user) return false; // Guest doesn't see these items
        if (!item.permission) return true;
        // Basic permission check (can be expanded)
        return user.role === 'admin' || user.permissions?.includes(item.permission);
    });

    const guestItems = ["Soluções", "IA & Analytics", "Empresas", "Sobre"];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-apple border-b border-white/5 h-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <img
                        src="/logo.jpg"
                        alt="NL Solutions"
                        className="w-8 h-8 rounded-lg object-cover border border-white/10 transition-transform group-hover:scale-110"
                    />
                    <span className="text-lg font-black tracking-tighter text-white whitespace-nowrap">NL SOLUTIONS</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center justify-end flex-1 gap-6">
                    {/* Navigation Items */}
                    <div className="flex items-center gap-4 xl:gap-6">
                        {user ? (
                            // Auth Items
                            visibleItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-sm font-medium text-white/60 hover:text-white transition-colors whitespace-nowrap"
                                >
                                    {item.title}
                                </Link>
                            ))
                        ) : (
                            // Guest Items
                            guestItems.map((item) => (
                                <button
                                    key={item}
                                    className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1 group whitespace-nowrap"
                                >
                                    {item}
                                    <ChevronDown className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:rotate-180 transition-transform" />
                                </button>
                            ))
                        )}
                    </div>

                    <div className="h-6 w-[1px] bg-white/10 mx-2 shrink-0" />

                    {/* CTAs */}
                    <div className="flex items-center gap-2 xl:gap-4 shrink-0">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-[#00ADFF] uppercase tracking-wider bg-[#00ADFF]/5 px-3 py-1.5 rounded-lg border border-[#00ADFF]/20">
                                    {user.role || 'Membro'}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 uppercase">
                                    {user.name?.[0] || user.email?.[0] || 'U'}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <span className="text-sm font-bold text-white/80 hover:text-white transition-colors px-3 py-2">
                                        Login
                                    </span>
                                </Link>
                                <Link href="/auth/register">
                                    <Button className="bg-[#00ADFF] text-black hover:bg-[#00ADFF]/90 font-black px-5 py-2 rounded-xl border-none shadow-[0_0_20px_rgba(0,173,255,0.2)] whitespace-nowrap group flex items-center justify-center gap-0 hover:gap-2 transition-all duration-300">
                                        ABRA SUA CONTA
                                        <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden bg-[#050505] border-b border-white/10 p-8 fixed top-16 left-0 w-full shadow-2xl z-[9999] min-h-[calc(100vh-4rem)] backdrop-blur-3xl"
                >
                    <div className="flex flex-col gap-6">
                        {user ? (
                            visibleItems.map((item) => (
                                <Link key={item.title} href={item.href} className="text-lg font-bold text-white/80 hover:text-white">
                                    {item.title}
                                </Link>
                            ))
                        ) : (
                            guestItems.map((item) => (
                                <Link key={item} href="#" className="text-lg font-bold text-white/80 hover:text-white">
                                    {item}
                                </Link>
                            ))
                        )}

                        <div className="h-[1px] bg-white/5 w-full" />

                        {user ? (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white/40">{user.email}</span>
                                <span className="text-xs font-black text-[#00ADFF] uppercase px-2 py-1 bg-[#00ADFF]/10 rounded">
                                    {user.role}
                                </span>
                            </div>
                        ) : (
                            <>
                                <Link href="/auth/register">
                                    <Button className="w-full bg-[#00ADFF] text-black font-black py-4 rounded-xl">
                                        ABRA SUA CONTA
                                    </Button>
                                </Link>
                                <Link href="/auth/login" className="text-center text-white/40 font-bold uppercase tracking-widest text-xs">
                                    Área do Cliente
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
