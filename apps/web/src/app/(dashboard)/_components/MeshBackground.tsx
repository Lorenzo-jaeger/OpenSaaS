"use client";

import React, { useEffect, useRef } from "react";

const ITEM_COUNT = 30;

export function MeshBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const items = containerRef.current.querySelectorAll(".mesh-item");
        items.forEach((item) => {
            const htmlItem = item as HTMLElement;
            htmlItem.style.setProperty("--d", (Math.random() * 8).toString());
            htmlItem.style.setProperty("--a", (Math.random() * 8 + 4).toString());
            htmlItem.style.setProperty("--hue", (200 + Math.random() * 20).toString()); // NL Solutions Blue range
            htmlItem.style.setProperty("--y", (Math.random() * 100).toString());
        });
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-none" ref={containerRef}>
            <main className="w-full h-full" style={{ transformStyle: "preserve-3d", perspective: "80vmin" }}>
                <section
                    className="w-[120cqi] aspect-[4/3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        transformOrigin: "100% 50%",
                        rotate: "y 40deg",
                        containerType: "inline-size",
                        mask: "linear-gradient(90deg, #0000 0 40px, #fff, #0000 calc(100% - 40px) 100%)"
                    }}
                >
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="mesh-item absolute w-10 aspect-square bg-[#00ADFF]"
                            style={{
                                top: "calc(var(--y) * 1%)",
                                background: "hsl(var(--hue) 90% 60%)",
                                animationName: "travel",
                                animationIterationCount: "infinite",
                                animationDelay: "calc(var(--d) * -1s)",
                                animationDuration: "calc(var(--a) * 1s)",
                                filter: "blur(1px)",
                                boxShadow: "0 0 20px #00ADFF44",
                                borderRadius: "4px"
                            }}
                        />
                    ))}
                </section>
            </main>

            <style jsx>{`
                @keyframes travel {
                    0% { translate: 100cqi 0; }
                    100% { translate: -50% 0; }
                }
            `}</style>
        </div>
    );
}
