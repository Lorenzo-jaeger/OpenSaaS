"use client";

import React from "react";
import { Button, Card, CardContent, Input, Label } from "@opensaas/ui";
import { motion } from "framer-motion";
import { Users, UserPlus, Shield, MoreVertical, Search, Mail } from "lucide-react";

export default function MembersSettingsPage() {
    const members = [
        { id: 1, name: "Lorenzo Jaeger", email: "lorenzo@exemplo.com", role: "Owner", avatar: "LJ" },
        { id: 2, name: "Ana Silva", email: "ana@exemplo.com", role: "Admin", avatar: "AS" },
        { id: 3, name: "Bruno Costa", email: "bruno@exemplo.com", role: "Member", avatar: "BC" },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white mb-2">Equipe & Permissões</h1>
                    <p className="text-white/40 font-light">Gerencie quem tem acesso a este workspace e suas funções.</p>
                </div>
                <Button className="h-12 px-6 bg-brand-primary text-white hover:bg-brand-primary/90 font-bold shadow-lg shadow-brand-primary/20">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Convidar Membro
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <Card className="glass border-white/5 bg-white/[0.02]">
                    <CardContent className="p-0">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <Input className="pl-10 h-10 border-none bg-white/5 focus-visible:ring-1" placeholder="Buscar membros..." />
                            </div>
                            <Button variant="glass" size="sm" className="h-10">Filtrar</Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/30">
                                        <th className="px-6 py-4 font-medium">Membro</th>
                                        <th className="px-6 py-4 font-medium">Função</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {members.map((member) => (
                                        <tr key={member.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
                                                        {member.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white">{member.name}</div>
                                                        <div className="text-xs text-white/30 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {member.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter text-white/60">
                                                    <Shield className="w-3 h-3 text-brand-primary" />
                                                    {member.role}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    <span className="text-xs text-white/40">Ativo</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="glass" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RoleCard
                        title="Administradores"
                        count={2}
                        description="Acesso total às configurações e faturamento."
                        color="text-brand-primary"
                    />
                    <RoleCard
                        title="Membros"
                        count={1}
                        description="Podem criar e visualizar projetos no workspace."
                        color="text-blue-400"
                    />
                    <RoleCard
                        title="Visualizadores"
                        count={0}
                        description="Acesso apenas leitura aos projetos."
                        color="text-white/40"
                    />
                </div>
            </div>
        </div>
    );
}

function RoleCard({ title, count, description, color }: { title: string; count: number; description: string; color: string }) {
    return (
        <Card className="glass border-white/5 bg-white/[0.02]">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white/60 text-sm uppercase tracking-widest">{title}</h4>
                    <span className={`text-2xl font-black ${color}`}>{count}</span>
                </div>
                <p className="text-xs text-white/30 leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    );
}
