"use client";

import React from "react";
import { SpotlightNavbar, Button, Card, CardContent, Navbar } from "@opensaas/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Zap,
    Shield,
    ChevronRight,
    Github,
    ArrowUpRight,
    Activity,
    Globe,
    Lock,
    CreditCard,
    Megaphone,
    Cpu,
    Settings as SettingsIcon,
    Plus,
    CheckCircle2,
    BarChart3,
    ArrowRight,
    ShieldCheck
} from "lucide-react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import Link from "next/link";
import { MeshBackground } from "./_components/MeshBackground";
import { BenefitsBento } from "./_components/BenefitsBento";

export default function Home() {
    const { user } = useAuthStore();

    const navItems = [
        { title: "Dashboard", icon: LayoutDashboard, href: "/" },
        { title: "Financeiro", icon: CreditCard, href: "/finance", sector: "Financeiro" },
        { title: "Marketing", icon: Megaphone, href: "/marketing", sector: "Marketing" },
        { title: "Engenharia", icon: Cpu, href: "/engineering", sector: "Engenharia" },
        { title: "Segurança", icon: ShieldCheck, href: "/security", permission: "admin:all" },
        { title: "Configurações", icon: SettingsIcon, href: "/settings" },
    ];

    if (user) {
        return (
            <div className="bg-[#050505] min-h-screen">
                <Navbar user={user} items={navItems} />
                <AuthenticatedDashboard user={user} />
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen selection:bg-[#00ADFF]/30 overflow-x-hidden">
            <MeshBackground />
            <SpotlightNavbar />
            <LandingDashboard />
        </div>
    );
}

function LandingDashboard() {
    return (
        <div className="pt-24 uppercase">
            {/* Main Hero Section */}
            <section id="sobre" className="relative pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-apple text-[9px] font-black uppercase tracking-[0.3em] text-[#00ADFF] mb-12">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00ADFF] animate-pulse" />
                                Plataforma de Próxima Geração
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-10 italic">
                                NA NOVA <br />
                                <span className="text-[#00ADFF] not-italic">LÓGICA NL.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-2xl mb-12 tracking-tight normal-case">
                                Modularidade, segurança e performance unificadas em uma arquitetura pensada para o crescimento real do seu ecossistema digital.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 text-white">
                                <Link href="/auth/register" className="w-full sm:w-auto">
                                    <Button className="w-full sm:w-auto h-16 px-10 text-base font-black bg-[#00ADFF] text-black hover:bg-[#00ADFF]/90 rounded-full border-none active:scale-95 transition-all shadow-[0_0_50px_rgba(0,173,255,0.3)] group flex items-center justify-center gap-0 hover:gap-3">
                                        ABRA SUA CONTA
                                        <ArrowRight className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300" />
                                    </Button>
                                </Link>
                                <Link href="/auth/login" className="w-full sm:w-auto">
                                    <Button variant="glass" className="h-16 px-10 text-base font-black border-white/10 hover:bg-white/5 rounded-full active:scale-95 transition-all flex items-center justify-center gap-0 hover:gap-3 group backdrop-blur-3xl">
                                        SAIBA MAIS
                                        <ChevronRight className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Interactive Benefits Bento */}
            <section id="solucoes">
                <BenefitsBento />
            </section>

            {/* Why NL Solutions Section - Simplified for visual balance */}
            <section id="ia-analytics" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BarChart3 className="w-8 h-8 text-[#00ADFF]" />}
                            title="Analytics IA"
                            description="Insights preditivos baseados em inteligência artificial para decisões estratégicas."
                        />
                        <FeatureCard
                            icon={<Lock className="w-8 h-8 text-[#00ADFF]" />}
                            title="Zero Trust"
                            description="Criptografia ponta a ponta e auditoria completa de cada requisição no sistema."
                        />
                        <FeatureCard
                            icon={<Activity className="w-8 h-8 text-[#00ADFF]" />}
                            title="Monitoramento"
                            description="Painéis em tempo real com métricas vitais de cada setor da sua empresa."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string, description: string }) {
    return (
        <Card className="glass-hover cursor-default group border-white/5 bg-white/[0.01] backdrop-blur-xl relative overflow-hidden rounded-[24px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ADFF]/5 blur-[80px] pointer-events-none group-hover:bg-[#00ADFF]/10 transition-colors" />
            <CardContent className="p-8 md:p-12 relative z-10">
                <div className="mb-8 md:mb-10 bg-white/5 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#00ADFF]/20 transition-all duration-1000 group-hover:rotate-[15deg] border border-white/5 shadow-inner">
                    {icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter text-white uppercase italic">{title}</h3>
                <p className="text-white/30 text-base md:text-lg leading-snug font-medium group-hover:text-white/50 transition-colors tracking-tight">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}

function AuthenticatedDashboard({ user }: { user: any }) {
    return (
        <div className="p-6 md:p-16 min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ADFF]/5 rounded-full blur-[200px] pointer-events-none animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#00ADFF]/5 rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-3 text-[#00ADFF] font-black tracking-[0.3em] text-xs uppercase mb-2">
                            <span className="w-8 h-[1px] bg-[#00ADFF]/50" />
                            Operação Ativa
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                            NL SOLUTIONS <br />
                            <span className="text-[#00ADFF] uppercase drop-shadow-[0_0_30_px_rgba(0,173,255,0.2)]">
                                {user.name || user.email.split('@')[0]}
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-xl"
                    >
                        <div className="px-6 py-3">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 text-center">Saúde do Sistema</p>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1.5 h-4 bg-[#00ADFF] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div>
                                <span className="text-xl font-black text-white italic">OPTIMAL</span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <StatCard label="Sectors Ativos" value="04" icon={Cpu} trend="Integrado" color="primary" />
                    <StatCard label="Load Balancer" value="2.4ms" icon={Zap} trend="Instant" color="primary" />
                    <StatCard label="Firewall Node" value="SECURE" icon={Shield} trend="Uptime 100%" color="primary" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ModuleCard
                            title="Financeiro"
                            description="Fluxo de caixa, faturamento e análise de ROI em tempo real."
                            icon={CreditCard}
                            sector="Financeiro"
                            color="emerald"
                        />
                        <ModuleCard
                            title="Marketing"
                            description="Campanhas, analytics avançado e gestão de leads qualificados."
                            icon={Megaphone}
                            sector="Marketing"
                            color="orange"
                        />
                        <ModuleCard
                            title="Engenharia"
                            description="Monitoramento de deploys, logs e infraestrutura escalável."
                            icon={Cpu}
                            sector="Engenharia"
                            color="blue"
                        />
                        <ModuleCard
                            title="Workspaces"
                            description="Configurações globais, membros e gestão de setores corporativos."
                            icon={Plus}
                            sector="Settings"
                            color="gray"
                        />
                    </div>

                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl h-full flex flex-col">
                        <CardContent className="p-10 flex-1 flex flex-col">
                            <h3 className="text-xl font-black mb-8 text-white flex items-center justify-between">
                                <span className="flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-[#00ADFF]" />
                                    LOGS DO SETOR
                                </span>
                                <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-white/40">LIVE</span>
                            </h3>
                            <div className="space-y-8 flex-1">
                                {[
                                    { msg: "Novo setor 'Design' criado", sub: "Por Admin Lorenzo", time: "12m" },
                                    { msg: "Permissão 'EDIT' adicionada", sub: "Setor Marketing", time: "45m" },
                                    { msg: "Deploy finalizado em Produção", sub: "Setor Engenharia", time: "2h" },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== 2 && <div className="absolute left-[19px] top-10 w-[2px] h-8 bg-white/5" />}
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-[#00ADFF] shadow-[0_0_10px_rgba(0,173,255,0.8)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white tracking-tight">{log.msg}</p>
                                            <p className="text-xs text-white/30 font-medium uppercase tracking-wider mt-1">{log.sub}</p>
                                        </div>
                                        <span className="ml-auto text-[10px] font-black text-white/10 italic">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="glass" className="w-full mt-12 py-6 font-black uppercase tracking-widest border-white/5 hover:bg-white/5">
                                Ver Todos os Logs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ModuleCard({ title, description, icon: Icon, color }: any) {
    const colors: any = {
        emerald: "text-emerald-400 group-hover:text-emerald-300",
        orange: "text-orange-400 group-hover:text-orange-300",
        blue: "text-[#00ADFF] group-hover:text-[#00ADFF]/80",
        gray: "text-white/40 group-hover:text-white"
    };

    return (
        <Card className="bg-white/[0.01] border-white/5 hover:border-[#00ADFF]/30 transition-all duration-500 group cursor-pointer relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#00ADFF]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[22px] bg-white/[0.03] flex items-center justify-center mb-6 md:mb-8 border border-white/5 group-hover:bg-white/5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className={cn("w-7 h-7 md:w-8 md:h-8", colors[color])} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tighter uppercase">{title}</h3>
                <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed group-hover:text-white/60 transition-colors">
                    {description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[#00ADFF] font-black text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 uppercase">
                    ACESSAR MÓDULO <ArrowUpRight className="w-4 h-4" />
                </div>
            </CardContent>
        </Card>
    );
}

function StatCard({ label, value, icon: Icon, trend, color }: any) {
    const isPrimary = color === "primary";
    return (
        <Card className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all group overflow-hidden relative backdrop-blur-3xl">
            <div className={cn(
                "absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none transition-all duration-1000 group-hover:scale-150",
                isPrimary ? "bg-[#00ADFF]/10" : "bg-brand-secondary/10"
            )} />
            <CardContent className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className={cn(
                        "p-3 md:p-4 rounded-2xl bg-white/[0.03] transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 border border-white/5",
                        isPrimary ? "group-hover:bg-[#00ADFF]/20" : "group-hover:bg-brand-secondary/20"
                    )}>
                        <Icon className={cn("w-5 h-5 md:w-6 md:h-6", isPrimary ? "text-[#00ADFF]" : "text-brand-secondary")} />
                    </div>
                    <span className={cn(
                        "text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/5 bg-white/[0.01] uppercase tracking-widest",
                        isPrimary ? "text-[#00ADFF]" : "text-brand-secondary"
                    )}>
                        {trend}
                    </span>
                </div>
                <p className="text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2">{label}</p>
                <h4 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">{value}</h4>
            </CardContent>
        </Card>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
