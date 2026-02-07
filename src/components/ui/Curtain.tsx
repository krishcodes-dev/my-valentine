"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CurtainProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function Curtain({ isOpen, children }: CurtainProps) {
    // Determine the number of units based on screen width roughly, or fixed number
    // The original CSS used 10 units of 10vw each to cover 100vw.
    const units = Array(12).fill(0);

    return (
        <div className="relative w-full h-full overflow-hidden bg-romantic-dark">
            {/* The Content Behind the Curtain */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* The Curtain Overlay */}
            <div
                className="absolute inset-0 z-50 pointer-events-none flex"
                style={{
                    transformOrigin: "-120% top",
                    transition: "transform 2.5s ease-in-out",
                    transform: isOpen ? "scaleX(0)" : "scaleX(1)",
                }}
            >
                {units.map((_, i) => (
                    <div
                        key={i}
                        className="h-[120vh] w-[10vw] origin-top bg-gradient-to-l from-romantic-red/90 via-red-800 to-rose-900"
                        style={{
                            animation: `sway 3s ease-in-out infinite alternate`,
                            animationDelay: `${i * -0.1}s`,
                            backgroundSize: "100% 100%",
                            background: `repeating-linear-gradient(
                                to left,
                                hsl(340, 80%, 40%) 4vw, 
                                hsl(340, 80%, 20%) 8vw,
                                hsl(340, 80%, 60%) 10vw
                            )`
                        }}
                    >
                        <style jsx>{`
                            @keyframes sway {
                                0% { transform: rotate(3deg); }
                                100% { transform: rotate(-3deg); }
                            }
                        `}</style>
                    </div>
                ))}
            </div>
        </div>
    );
}
