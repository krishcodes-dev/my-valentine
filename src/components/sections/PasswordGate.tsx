"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart } from "lucide-react";
import { ANNIVERSARY_DATE, PASSWORD_HINTS, ERRORS } from "@/lib/constants";
import { clsx } from "clsx";

interface PasswordGateProps {
    onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
    const [input, setInput] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!input) {
            setError(ERRORS.EMPTY);
            triggerShake();
            return;
        }

        if (input === ANNIVERSARY_DATE) {
            handleSuccess();
        } else {
            handleFailure();
        }
    };

    const handleSuccess = () => {
        localStorage.setItem("valentine_unlocked", "true");
        setIsVisible(false);
        setTimeout(onUnlock, 1000); // Allow exit animation to play
    };

    const handleFailure = () => {
        setError(ERRORS.WRONG);
        setAttempts((prev) => prev + 1);
        triggerShake();
        setInput("");
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setError(""), 2000); // Auto-clear error after 2s
    };

    // Show hint based on attempts (progressive)
    const currentHint = attempts > 0 ? PASSWORD_HINTS[Math.min(attempts - 1, PASSWORD_HINTS.length - 1)] : null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-dark text-romantic-light p-4"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-full max-w-md text-center space-y-8"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <Heart className="w-16 h-16 text-romantic-red animate-pulse" fill="currentColor" />
                                <Lock className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">
                            Hey...
                        </h1>
                        <p className="text-romantic-pink/80 text-lg">
                            What&apos;s the magic date?
                        </p>

                        <form onSubmit={handleSubmit} className="relative max-w-xs mx-auto space-y-4">
                            <motion.div
                                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="DDMMYYYY"
                                    className={clsx(
                                        "w-full px-6 py-4 text-center bg-black/30 border-2 rounded-full outline-none transition-all duration-300 placeholder:text-white/20",
                                        error ? "border-red-500/50" : "border-romantic-red/30 focus:border-romantic-red"
                                    )}
                                />
                            </motion.div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-romantic-red/20 hover:bg-romantic-red/40 text-romantic-light rounded-full transition-all duration-300 uppercase tracking-widest text-sm font-semibold hover:scale-105 active:scale-95"
                            >
                                Unlock
                            </button>

                            <div className="h-20 flex flex-col items-center justify-start pt-4 space-y-2">
                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.p
                                            key="error"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-400 text-sm"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                    {currentHint && (
                                        <motion.p
                                            key="hint"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-romantic-pink/50 text-sm italic mt-2"
                                        >
                                            Hint: {currentHint}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
