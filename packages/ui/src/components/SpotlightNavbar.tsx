"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const NAV_ITEMS = [
    { label: "Soluções", href: "#solucoes" },
    { label: "IA & Analytics", href: "#ia-analytics" },
    { label: "Empresas", href: "#empresas" },
    { label: "Sobre", href: "#sobre" },
];

export function SpotlightNavbar() {
    const navRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<SVGFEPointLightElement>(null);
    const ambienceRef = useRef<SVGFEPointLightElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!navRef.current || !spotlightRef.current) return;

        const nav = navRef.current;
        const links = nav.querySelectorAll(".nav-link");

        const updateSpotlight = (index: number) => {
            const anchor = links[index] as HTMLElement;
            if (!anchor) return;

            const navBounds = nav.getBoundingClientRect();
            const anchorBounds = anchor.getBoundingClientRect();

            // Calculate center relative to nav container
            const x = anchorBounds.left - navBounds.left + anchorBounds.width / 2;

            gsap.to(spotlightRef.current, {
                duration: 0.5,
                attr: { x },
                ease: "power2.out"
            });
        };

        updateSpotlight(activeIndex);

        if (ambienceRef.current) {
            gsap.set(ambienceRef.current, {
                attr: { x: 120, y: -154, z: 160 }
            });
        }

    }, [activeIndex]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-6 pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
                <nav
                    ref={navRef}
                    className="relative h-12 px-1 flex items-center rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl"
                >
                    {/* Spotlight Filters */}
                    <svg className="sr-only">
                        <filter id="spotlight">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                            <feSpecularLighting
                                result="lighting"
                                in="blur"
                                surfaceScale="2"
                                specularConstant="1.2"
                                specularExponent="30"
                                lightingColor="#ffffff"
                            >
                                <fePointLight ref={spotlightRef} x="0" y="24" z="50" />
                            </feSpecularLighting>
                            <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
                            <feComposite
                                in="SourceAlpha"
                                in2="composite"
                                operator="arithmetic"
                                k1="0" k2="1" k3="1" k4="0"
                                result="litPaint"
                            />
                        </filter>
                        <filter id="ambience">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                            <feSpecularLighting
                                result="lighting"
                                in="blur"
                                surfaceScale="1"
                                specularConstant="0.5"
                                specularExponent="80"
                                lightingColor="#ffffff"
                            >
                                <fePointLight ref={ambienceRef} x="120" y="-154" z="160" />
                            </feSpecularLighting>
                            <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
                            <feComposite
                                in="SourceAlpha"
                                in2="composite"
                                operator="arithmetic"
                                k1="0" k2="1" k3="1" k4="0"
                                result="litPaint"
                            />
                        </filter>
                    </svg>

                    {/* Logo & Brand */}
                    <div className="flex items-center gap-2.5 px-4 mr-1 border-r border-white/10 h-8">
                        <img src="/logo.jpg" alt="NL Logo" className="w-5 h-5 rounded-sm object-cover" />
                        <span className="text-white font-black text-[10px] tracking-tighter whitespace-nowrap">NL SOLUTIONS</span>
                    </div>

                    {/* Nav Items Container */}
                    <div className="flex items-center relative h-full">
                        {NAV_ITEMS.map((item, i) => (
                            <div key={`item-${i}`} className="relative h-full flex items-center">
                                {/* Lit Text Layer */}
                                <span
                                    className="absolute inset-0 flex items-center justify-center px-6 text-[13px] font-medium text-white whitespace-nowrap pointer-events-none z-10"
                                    style={{
                                        filter: "url(#spotlight)",
                                        opacity: activeIndex === i ? 1 : 0
                                    }}
                                >
                                    {item.label}
                                </span>

                                {/* Interactive Link Layer */}
                                <Link
                                    href={item.href}
                                    onClick={() => setActiveIndex(i)}
                                    className={`nav-link px-6 py-2 text-[13px] font-medium transition-all duration-500 relative z-20 whitespace-nowrap ${activeIndex === i ? "text-white" : "text-white/40 hover:text-white/80"}`}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Edge Reflection Ambient Effect */}
                    <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none z-30" />
                </nav>

                {/* CTA Button Aligned Perfectly */}
                <Link href="/auth/register" className="shrink-0">
                    <button className="h-12 px-8 bg-white text-black font-bold text-[11px] tracking-wider rounded-full hover:bg-[#00ADFF] hover:text-white transition-all duration-500 flex items-center gap-3 group shadow-xl">
                        ABRA SUA CONTA
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </Link>
            </div>
        </header>
    );
}
