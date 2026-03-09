"use client";

import { Button, Card, CardContent } from "@opensaas/ui";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Zap, Shield } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-4xl"
            >
                <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tighter">
                    OpenSaaS Premium
                </h1>
                <p className="text-xl md:text-2xl text-white/60 mb-10 font-light leading-relaxed">
                    O boilerplate open-source com arquitetura de elite. <br />
                    Next.js 15, NestJS, Turborepo e Design Sistêmico.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                    <Button size="lg" className="h-14 px-8 text-lg">
                        Começar Grátis
                    </Button>
                    <Button variant="glass" size="lg" className="h-14 px-8 text-lg">
                        Ver Documentação
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                <FeatureCard
                    icon={<Zap className="w-6 h-6 text-yellow-400" />}
                    title="Ultra Rápido"
                    description="Turborepo + Next.js 15 para builds e performance instantâneos."
                />
                <FeatureCard
                    icon={<Shield className="w-6 h-6 text-blue-400" />}
                    title="Segurança"
                    description="JWT + Passport + RBAC. Proteção de dados multi-tenant nativa."
                />
                <FeatureCard
                    icon={<Users className="w-6 h-6 text-green-400" />}
                    title="Multi-tenant"
                    description="Gerencie múltiplos workspaces e times em uma única conta."
                />
                <FeatureCard
                    icon={<LayoutDashboard className="w-6 h-6 text-purple-400" />}
                    title="UI Premium"
                    description="Design system baseado em Glassmorphism e Framer Motion."
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string, description: string }) {
    return (
        <Card className="hover:scale-[1.02] transition-transform cursor-default group">
            <CardContent className="pt-6">
                <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
