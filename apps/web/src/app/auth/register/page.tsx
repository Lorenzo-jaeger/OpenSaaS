"use client";

import React from "react";
import { Button, Card, CardContent, Input, Label } from "@opensaas/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.03),transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center mb-4 border border-brand-secondary/30 shadow-lg shadow-brand-secondary/10">
                        <Zap className="w-8 h-8 text-brand-secondary" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-white">Comece agora.</h1>
                    <p className="text-white/40 mt-2 font-light">Crie sua conta OpenSaaS em segundos</p>
                </div>

                <Card className="glass border-white/5 bg-white/[0.02] shadow-2xl">
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nome</Label>
                                <Input id="firstName" placeholder="Nome" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Sobrenome</Label>
                                <Input id="lastName" placeholder="Sobrenome" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail corporativo</Label>
                            <Input id="email" type="email" placeholder="nome@empresa.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
                        </div>

                        <Button className="w-full h-12 bg-white text-black hover:bg-white/90 text-base font-bold mt-4 shadow-xl">
                            Criar Conta Grátis
                        </Button>

                        <p className="text-[10px] text-center text-white/20 mt-4 px-4">
                            Ao clicar em continuar, você concorda com nossos <Link href="#" className="underline">Termos de Serviço</Link> e <Link href="#" className="underline">Política de Privacidade</Link>.
                        </p>
                    </CardContent>
                </Card>

                <p className="text-center mt-8 text-sm text-white/40">
                    Já tem uma conta?{" "}
                    <Link href="/auth/login" className="text-brand-primary font-bold hover:underline">
                        Fazer login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
