"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@opensaas/ui";
import { Shield, Zap, LayoutDashboard, Database, BarChart3, Users } from "lucide-react";

const BENEFITS = [
    {
        title: "Segurança Total",
        description: "Infraestrutura industrial com criptografia de ponta a ponta e auditorias constantes.",
        icon: Shield,
        color: "#00ADFF",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80\u0026w=1000\u0026auto=format",
    },
    {
        title: "Performance Extrema",
        description: "Zero latência em operações complexas através de algoritmos otimizados.",
        icon: Zap,
        color: "#00ADFF",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80\u0026w=1000\u0026auto=format",
    },
    {
        title: "Gestão Avançada",
        description: "Controle granular de usuários e setores para máxima eficiência corporativa.",
        icon: LayoutDashboard,
        color: "#00ADFF",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80\u0026w=1000\u0026auto=format",
    },
    {
        title: "Dados em Realtime",
        description: "Visualização imediata de métricas críticas para tomada de decisão.",
        icon: BarChart3,
        color: "#00ADFF",
        image: "https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80\u0026w=1000\u0026auto=format",
    },
    {
        title: "Infra Escalonável",
        description: "Sua plataforma cresce junto com seu negócio sem gargalos técnicos.",
        icon: Database,
        color: "#00ADFF",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80\u0026w=1000\u0026auto=format",
    },
];

export function BenefitsBento() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black italic mb-4">
                    POR QUE A <span className="text-[#00ADFF] not-italic">NOVA LÓGICA?</span>
                </h2>
                <p className="text-white/40 text-lg max-w-2xl mx-auto normal-case">
                    Não é apenas tecnologia, é um novo paradigma de eficiência para o seu negócio.
                </p>
            </div>

            <div
                className="hidden md:grid gap-4 transition-all duration-700 ease-[cubic-bezier(0.15,0,0,1)]"
                style={{
                    gridTemplateColumns: BENEFITS.map((_, i) => i === activeIndex ? "10fr" : "1fr").join(" ")
                }}
            >
                {BENEFITS.map((benefit, i) => (
                    <motion.div
                        key={i}
                        className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer group glass-apple border-white/5"
                        onPointerEnter={() => setActiveIndex(i)}
                    >
                        <img
                            src={benefit.image}
                            alt={benefit.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${i === activeIndex ? "opacity-30 scale-105" : "opacity-0 scale-100"}`}
                            style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)" }}
                        />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className={`p-4 rounded-xl glass-apple w-fit mb-4 transition-all duration-500 ${i === activeIndex ? "bg-[#00ADFF] text-black" : "bg-white/5 text-[#00ADFF]"}`}>
                                <benefit.icon className="w-6 h-6" />
                            </div>

                            <div className={`transition-all duration-500 ${i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                <h3 className="text-2xl font-black italic mb-2">{benefit.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed max-w-xs normal-case">{benefit.description}</p>
                            </div>

                            {/* Text for collapsed state */}
                            {i !== activeIndex && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="rotate-90 text-[10px] font-black tracking-[0.5em] text-[#00ADFF] uppercase opacity-40 whitespace-nowrap">
                                        {benefit.title}
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile View */}
            <div className="grid md:hidden grid-cols-1 gap-6">
                {BENEFITS.map((benefit, i) => (
                    <Card key={i} className="glass-apple p-8 rounded-[24px]">
                        <benefit.icon className="w-10 h-10 text-[#00ADFF] mb-6" />
                        <h3 className="text-2xl font-black italic mb-4">{benefit.title}</h3>
                        <p className="text-white/40 text-base normal-case">{benefit.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}
