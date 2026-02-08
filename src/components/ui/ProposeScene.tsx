"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Footprints } from "lucide-react";
import Image from "next/image";
import CanvasConfetti from "@/components/ui/CanvasConfetti";

interface ProposeSceneProps {
    onComplete: () => void;
}

export default function ProposeScene({ onComplete }: ProposeSceneProps) {
    const [stepCount, setStepCount] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const TOTAL_STEPS = 5;

    // Initial sequence: Guy takes a step automatically
    useEffect(() => {
        const timer = setTimeout(() => {
            setStepCount(1); // Guy steps forward
            setTimeout(() => {
                setShowButton(true); // Button appears
            }, 1000);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // 10-second timer after Finale starts
    useEffect(() => {
        const isFinale = stepCount >= TOTAL_STEPS;
        if (isFinale) {
            const timer = setTimeout(() => {
                setShowFinalMessage(true);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [stepCount]);

    const handleTakeStep = () => {
        if (stepCount < TOTAL_STEPS) {
            setStepCount(prev => prev + 1);
        }

        if (stepCount + 1 >= TOTAL_STEPS) {
            // Reached center
            setTimeout(onComplete, 6000);
        }
    };

    const isFinale = stepCount >= TOTAL_STEPS;

    // Position Calculations (Relative to Center)
    const getProgress = () => Math.min(stepCount / TOTAL_STEPS, 1);

    // Boy (Left) moves on every step: 0 -> 1 -> ... -> TOTAL
    const leftX = -35 + (getProgress() * 30); // -35vw -> -5vw

    // Girl (Right) moves only AFTER step 1.
    // She stays at 0 progress for step 0 and 1.
    // For steps 2 to 5 (4 steps total), she needs to travel from 0 to 1.
    // Progress calculation: (stepCount - 1) / (TOTAL_STEPS - 1)
    const girlProgressRaw = TOTAL_STEPS > 1 ? (Math.max(0, stepCount - 1) / (TOTAL_STEPS - 1)) : 1;
    const girlProgress = Math.min(girlProgressRaw, 1);
    const rightX = 35 - (girlProgress * 30); // 35vw -> 5vw

    return (
        <div className="relative w-full h-full flex flex-col items-center p-4 overflow-hidden">

            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/30 via-romantic-dark to-black opacity-50 pointer-events-none" />

            {/* Top Content: Title & Guitar */}
            {/* Top Content: Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isFinale ? 0 : 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 text-center mt-10 md:mt-20 text-4xl md:text-6xl font-serif text-rose-100 drop-shadow-lg"
            >
                Happy Propose Day Richaaaa ❤️
            </motion.h1>

            {/* Background Music */}
            <audio src="/guitar.mp3" autoPlay className="hidden" />

            {/* Scene Area */}
            <div className="flex-1 w-full relative flex items-end justify-center pb-20 md:pb-32 px-4">

                {/* HIM (Left) - Krish */}
                <motion.div
                    className="absolute bottom-20 flex flex-col items-center z-20"
                    initial={{ x: "-35vw", opacity: 0 }}
                    animate={{
                        x: `${leftX}vw`,
                        opacity: isFinale ? 0 : 1,
                        y: [0, -10, 0]
                    }}
                    transition={{
                        x: { duration: 1, ease: "easeInOut" },
                        y: { duration: 0.3 },
                        opacity: { duration: 1 }
                    }}
                >
                    <div className="relative w-32 h-48 md:w-40 md:h-60 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Image
                            src="/krish.png"
                            alt="Krish"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-blue-200/50 text-xs mt-2 font-serif tracking-widest uppercase">Me</span>
                </motion.div>

                {/* HER (Right) - Richa */}
                <motion.div
                    className="absolute bottom-20 flex flex-col items-center z-20"
                    initial={{ x: "35vw", opacity: 0 }}
                    animate={{
                        x: `${rightX}vw`,
                        opacity: isFinale ? 0 : 1,
                        // Only bounce if she actually moves (progress changed)
                        y: stepCount > 1 ? [0, -10, 0] : 0
                    }}
                    transition={{
                        x: { duration: 1, ease: "easeInOut" },
                        y: { duration: 0.3 },
                        opacity: { duration: 1 }
                    }}
                >
                    <div className="relative w-32 h-48 md:w-40 md:h-60 filter drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                        <Image
                            src="/richa.png"
                            alt="Richa"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* UPDATED LABEL */}
                    <span className="text-rose-200/50 text-xs mt-2 font-serif tracking-widest uppercase">You</span>
                </motion.div>

                {/* Step Button */}
                <AnimatePresence>
                    {!isFinale && showButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute bottom-10 z-50 pointer-events-auto"
                        >
                            <button
                                onClick={handleTakeStep}
                                className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.6)] animate-pulse flex items-center gap-2 font-serif tracking-widest transition-all hover:scale-105 active:scale-95 border border-rose-400"
                            >
                                <Footprints className="w-5 h-5" />
                                Take a Step?
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Finale Effects: Full Screen Overlay */}
            {isFinale && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Confetti Explosion - Covers entire viewport */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <CanvasConfetti />
                    </div>

                    {/* Ring Reveal - Centered */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45, y: 50 }}
                        // Animate based on 'showFinalMessage'
                        animate={showFinalMessage
                            ? { scale: 0.7, rotate: 0, y: -50 }
                            : { scale: 1, rotate: 0, y: 0 }
                        }
                        transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                        className="relative z-50 flex flex-col items-center justify-center"
                    >
                        <div className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center relative transition-all duration-1000">
                            <Image
                                src="/ring.png"
                                alt="Ring"
                                fill
                                className="object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]"
                            />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={showFinalMessage ? "love" : "propose"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute -bottom-32 w-full text-center text-yellow-100 font-serif text-4xl md:text-6xl italic tracking-wide drop-shadow-lg p-4 whitespace-nowrap"
                            >
                                {showFinalMessage ? "I love you <3" : "I love you bae"}
                            </motion.p>
                        </AnimatePresence>

                        {/* Day 03 Button */}
                        <AnimatePresence>
                            {showFinalMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2, duration: 1 }}
                                    className="absolute -bottom-56 pointer-events-auto"
                                >
                                    <button
                                        onClick={onComplete} // Will trigger transition to next day
                                        className="group flex items-center gap-3 pl-6 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/90 hover:bg-white/10 hover:border-white/30 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_50px_rgba(225,29,72,0.5)]"
                                        style={{ transform: "translateX(5px) scale(1.05)" }}
                                    >
                                        <span className="font-serif tracking-[0.2em] uppercase text-sm">Day 03</span>
                                        <div className="w-8 h-8 rounded-full bg-romantic-red flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 text-white" aria-hidden="true">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
