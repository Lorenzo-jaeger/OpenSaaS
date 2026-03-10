"use client";

import {
    LayoutDashboard,
    CreditCard,
    Megaphone,
    Cpu,
    Settings as SettingsIcon,
    ShieldCheck
} from "lucide-react";
import { Sidebar } from "@opensaas/ui";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        // Limpeza agressiva de cookies para garantir logout
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.location.href = "/auth/login";
    };

    const navItems = [
        { title: "Dashboard", icon: LayoutDashboard, href: "/" },
        { title: "Financeiro", icon: CreditCard, href: "/finance", sector: "Financeiro" },
        { title: "Marketing", icon: Megaphone, href: "/marketing", sector: "Marketing" },
        { title: "Engenharia", icon: Cpu, href: "/engineering", sector: "Engenharia" },
        { title: "Segurança", icon: ShieldCheck, href: "/security", permission: "admin:all" },
        { title: "Configurações", icon: SettingsIcon, href: "/settings" },
    ];

    const sidebarUser = user ? {
        name: user.name || user.email,
        plan: "Plano Pro", // Mock or from user.plan if exists
    } : null;

    if (!user) {
        return <div className="min-h-screen bg-[#050505]">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <Sidebar
                user={sidebarUser}
                items={navItems}
                onLogout={handleLogout}
            />
            <main className="flex-1 overflow-y-auto">
                <div className="min-h-screen relative border-l border-white/5">
                    {children}
                </div>
            </main>
        </div>
    );
}
