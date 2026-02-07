"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MazeGame from "@/components/ui/MazeGame";
import { BrainCircuit, Sparkles, Heart } from "lucide-react";
import FireEffect from "@/components/ui/FireEffect";
import Curtain from "@/components/ui/Curtain";
import ProposeScene from "@/components/ui/ProposeScene";

export default function ProposeDay({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"CHOICE" | "GAME" | "HARD_WIN" | "EASY_WIN" | "TEXTS" | "REVEAL">("CHOICE");
    const [difficulty, setDifficulty] = useState<"easy" | "hard">("easy");
    const [messageStep, setMessageStep] = useState(0);
    const [curtainOpen, setCurtainOpen] = useState(false);

    // Final Texts Sequence
    const [textIndex, setTextIndex] = useState(0);
    const finalTexts = [
        "I know I am flawed...",
        "I am not perfect...",
        "But..",
        "I want to be better for you..",
        "I am trying to..",
    ];

    const handleChoice = (diff: "easy" | "hard") => {
        setDifficulty(diff);
        setPhase("GAME");
    };

    const handleGameComplete = () => {
        if (difficulty === "hard") {
            setPhase("HARD_WIN");
        } else {
            setPhase("EASY_WIN");
        }
    };

    // --- Hard Win Sequence ---
    const hardMessages = [
        "You chose to endure the hardships...",
        "And still… you came to me.",
        "I will forever cherish that fact.. ❤️"
    ];

    const handleHardNext = () => {
        if (messageStep < hardMessages.length - 1) {
            setMessageStep(prev => prev + 1);
        } else {
            setPhase("TEXTS");
        }
    };

    // --- Easy Win Sequence ---
    const [easyStep, setEasyStep] = useState(0);
    const easyMessages = [
        { text: "That was easy.", delay: 2000 },
        { text: "Some things shouldn't be.", delay: 3000, showJoker: true },
        { text: "But...", delay: 2000 },
        { text: "It does not matter how you reach here...", delay: 3000 },
        { text: "At the end..", delay: 2000 },
        { text: "You made a choice to choose to be here..", delay: 3000 },
        { text: "I am forever grateful for that...", delay: 4000 }
    ];

    const handleEasyNext = () => {
        if (easyStep < easyMessages.length - 1) {
            setEasyStep(prev => prev + 1);
        } else {
            setPhase("TEXTS");
        }
    };

    // Handle Texts Sequence
    const handleTextNext = () => {
        if (textIndex < finalTexts.length - 1) {
            setTextIndex(prev => prev + 1);
        } else {
            setPhase("REVEAL"); // Trigger Curtain
        }
    };

    // Trigger curtain opening when entering REVEAL phase
    useEffect(() => {
        if (phase === "REVEAL") {
            const timer = setTimeout(() => {
                setCurtainOpen(true);
            }, 500); // Small delay before opening
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <section className="min-h-screen w-full bg-romantic-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Show Day Title only when NOT in reveal phase, to avoid clutter behind curtain */}


            <AnimatePresence mode="wait">
                {/* Phase 1: Choice */}
                {phase === "CHOICE" && (
                    <motion.div
                        key="choice"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="space-y-12 text-center z-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Choose a Path</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            <button
                                onClick={() => handleChoice("hard")}
                                className="relative w-64 h-40 bg-black/60 border border-purple-500/30 rounded-xl overflow-hidden hover:scale-105 transition-transform flex flex-col items-center justify-center space-y-2 group"
                            >
                                {/* Fire Effect on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <FireEffect />
                                </div>
                                <div className="relative z-10 flex flex-col items-center p-4">
                                    <BrainCircuit className="w-8 h-8 text-purple-400 group-hover:text-white transition-colors mb-2" />
                                    <span className="text-lg font-bold text-purple-200 group-hover:text-white leading-tight">Take the Hard Way</span>
                                    <span className="text-[10px] text-purple-400/60 uppercase tracking-widest mt-1">(If You Mean It)</span>
                                </div>
                            </button>

                            <button
                                onClick={() => handleChoice("easy")}
                                className="relative w-64 h-40 bg-black/60 border border-pink-500/30 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500 flex flex-col items-center justify-center space-y-2 group hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] hover:border-yellow-400/50"
                            >
                                {/* Enlightenment Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <Sparkles className="w-10 h-10 text-pink-400 group-hover:text-yellow-200 transition-colors animate-pulse" />
                                    <span className="text-xl font-bold text-pink-200 group-hover:text-yellow-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">Take the Easy Way</span>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Phase 2: Game */}
                {phase === "GAME" && (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-full max-w-4xl"
                    >
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-serif text-white mb-2">Find me... &lt;3</h3>
                            {difficulty === "hard" && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2, duration: 2 }}
                                    className="text-purple-300/50 italic text-sm"
                                >
                                    Love isn&apos;t a straight path.
                                </motion.p>
                            )}
                        </div>
                        <MazeGame difficulty={difficulty} onComplete={handleGameComplete} />
                    </motion.div>
                )}

                {/* Phase 3: Hard Win (Poetic) */}
                {phase === "HARD_WIN" && (
                    <motion.div
                        key="hard-win"
                        className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center cursor-pointer p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        onClick={handleHardNext}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mb-8"
                        >
                            <Heart className="w-20 h-20 text-romantic-red fill-romantic-red drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" />
                        </motion.div>

                        <motion.p
                            key={messageStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-2xl"
                        >
                            {hardMessages[messageStep]}
                        </motion.p>
                        <p className="fixed bottom-10 text-white/20 text-xs animate-pulse">(Tap to continue)</p>
                    </motion.div>
                )}

                {/* Phase 4: Easy Win (Joker/Poetic) */}
                {phase === "EASY_WIN" && (
                    <motion.div
                        key="easy-win"
                        className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center cursor-pointer p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        onClick={handleEasyNext}
                    >
                        {/* Joker Laugh Visual (Using emoji for now, or text art) */}
                        {easyMessages[easyStep].showJoker && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1.5, rotate: 0 }}
                                className="text-9xl mb-8"
                            >
                                🃏
                            </motion.div>
                        )}
                        {!easyMessages[easyStep].showJoker && (
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="mb-8"
                            >
                                <Heart className="w-16 h-16 text-pink-500 fill-pink-500/20" />
                            </motion.div>
                        )}

                        <motion.p
                            key={easyStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-2xl"
                        >
                            {easyMessages[easyStep].text}
                        </motion.p>
                        <p className="fixed bottom-10 text-white/20 text-xs animate-pulse">(Tap to continue)</p>
                    </motion.div>
                )}

                {/* Phase 5: Texts Sequence (Before Reveal) */}
                {phase === "TEXTS" && (
                    <motion.div
                        key="texts"
                        className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-center cursor-pointer p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleTextNext}
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={textIndex}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 1 }}
                                className="text-3xl md:text-5xl font-serif text-rose-100 leading-relaxed"
                            >
                                {finalTexts[textIndex]}
                            </motion.h2>
                        </AnimatePresence>
                        <p className="fixed bottom-10 text-white/20 text-xs animate-pulse">(Tap to continue)</p>
                    </motion.div>
                )}

                {/* Phase 6: Curtain & Final Scene */}
                {phase === "REVEAL" && (
                    <motion.div
                        key="reveal"
                        className="absolute inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Curtain isOpen={curtainOpen}>
                            <ProposeScene onComplete={onComplete} />
                        </Curtain>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
