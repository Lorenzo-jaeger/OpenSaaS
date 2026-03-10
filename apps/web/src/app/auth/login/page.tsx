"use client";

import React from "react";
import { Button, Card, CardContent, Input, Label } from "@opensaas/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#050505]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-brand-primary/30 shadow-lg shadow-brand-primary/10">
                        <Zap className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-white">Bem-vindo de volta.</h1>
                    <p className="text-white/40 mt-2 font-light">Entre na sua conta OpenSaaS</p>
                </div>

                <Card className="glass border-white/5 bg-white/[0.02] shadow-2xl">
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="nome@exemplo.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Senha</Label>
                                <Link href="#" className="text-xs text-brand-primary hover:underline">Esqueceu a senha?</Link>
                            </div>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>

                        <Button className="w-full h-12 bg-white text-black hover:bg-white/90 text-base font-bold mt-4 shadow-xl">
                            Entrar
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#050505] px-2 text-white/30">Ou continue com</span>
                            </div>
                        </div>

                        <Button variant="glass" className="w-full h-12 border-white/10 hover:bg-white/5">
                            Google
                        </Button>
                    </CardContent>
                </Card>

                <p className="text-center mt-8 text-sm text-white/40">
                    Não tem uma conta?{" "}
                    <Link href="/auth/register" className="text-brand-primary font-bold hover:underline">
                        Criar agora
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
