"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MeltingPot from "@/components/ui/MeltingPot";
import PouringStep from "@/components/ui/PouringStep";
import DecoratingStep from "@/components/ui/DecoratingStep";

import NextDayLock from "@/components/sections/NextDayLock";

export default function ChocolateDay() {
    const [step, setStep] = useState<"INTRO" | "MELTING" | "POURING" | "DECORATING" | "LOCKED">("INTRO");

    return (
        <section className="min-h-screen w-full bg-[#1a0505] text-[#fdf2f8] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-[#1a0505] to-black opacity-60 pointer-events-none" />

            {/* Intro Sequence */}
            <AnimatePresence mode="wait">
                {step === "INTRO" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1 }}
                        className="z-10 text-center flex flex-col items-center max-w-2xl p-8"
                    >
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-4xl md:text-6xl font-serif text-amber-100 mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                        >
                            Krish’s Chocolate Lab 🍫
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="space-y-4 text-xl md:text-2xl font-light text-rose-100/80 leading-relaxed mb-12"
                        >
                            <p>I could’ve just sent you chocolate.</p>
                            <p>But I thought…</p>
                            <p className="italic text-amber-200">what if we made one together?</p>
                        </motion.div>


                        {/* Melting Filter Definition */}
                        <svg className="hidden">
                            <defs>
                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                    <feBlend in="SourceGraphic" in2="goo" />
                                </filter>
                            </defs>
                        </svg>

                        <div className="relative group cursor-pointer" onClick={() => setStep("MELTING")}>
                            {/* Drips Container */}
                            <motion.div
                                className="absolute -inset-2 bg-amber-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ filter: "url(#goo)" }}
                            >
                                {/* Animated Drips */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-6 h-6 bg-amber-800 rounded-full top-1/2 left-1/2"
                                        initial={{ y: 0, x: (i - 2.5) * 30, scale: 0 }}
                                        whileHover={{
                                            y: [0, 40 + Math.random() * 20],
                                            scale: [1, 0],
                                            transition: {
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeIn",
                                                delay: i * 0.1
                                            }
                                        }}
                                    />
                                ))}
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 2.5, duration: 0.5 }}
                                className="relative z-10 flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-[#5D4037] to-[#3E2723] border border-amber-500/30 rounded-full text-amber-100 shadow-[0_4px_15px_rgba(62,39,35,0.5)] overflow-hidden"
                            >
                                {/* Glossy sheen */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

                                <span className="font-serif tracking-widest uppercase text-sm drop-shadow-sm">Let’s Begin</span>
                                <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {step === "MELTING" && (
                    <motion.div
                        key="melting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="z-10 w-full"
                    >
                        <MeltingPot onComplete={() => setStep("POURING")} />
                    </motion.div>
                )}

                {step === "POURING" && (
                    <motion.div
                        key="pouring"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="z-10 w-full"
                    >
                        <PouringStep onComplete={() => setStep("DECORATING")} />
                    </motion.div>
                )}

                {step === "DECORATING" && (
                    <motion.div
                        key="decorating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="z-10 w-full"
                    >
                        <DecoratingStep onComplete={() => setStep("LOCKED")} />
                    </motion.div>
                )}

                {step === "LOCKED" && (
                    <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90"
                    >
                        <NextDayLock unlockDate="2026-02-10T00:00:00+05:30" />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
