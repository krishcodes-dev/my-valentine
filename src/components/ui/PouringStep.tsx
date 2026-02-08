"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PouringStepProps {
    onComplete: () => void;
}

export default function PouringStep({ onComplete }: PouringStepProps) {
    const [pourProgress, setPourProgress] = useState(0);
    const [isPouring, setIsPouring] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startPouring = () => {
        if (isComplete) return;
        setIsPouring(true);
        intervalRef.current = setInterval(() => {
            setPourProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current!);
                    setIsComplete(true);
                    return 100;
                }
                return prev + 1; // Adjust speed here
            });
        }, 30);
    };

    const stopPouring = () => {
        if (isComplete) return;
        setIsPouring(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        if (isComplete) {
            setTimeout(onComplete, 2000);
        }
    }, [isComplete, onComplete]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full select-none">

            {/* Instruction / Success Text */}
            <div className="absolute top-10 h-16 text-center z-20">
                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.p
                            key="instruct"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="text-amber-100/60 uppercase tracking-widest text-xs md:text-sm"
                        >
                            {isPouring ? "Keep holding..." : "Click & Hold to Pour"}
                        </motion.p>
                    ) : (
                        <motion.p
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-amber-100 font-serif text-2xl drop-shadow-lg"
                        >
                            All in. Just how you like it.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Interactive Area */}
            <div
                className="relative w-full max-w-md h-96 flex items-center justify-center cursor-pointer"
                onMouseDown={startPouring}
                onMouseUp={stopPouring}
                onMouseLeave={stopPouring}
                onTouchStart={startPouring}
                onTouchEnd={stopPouring}
            >
                {/* 1. The Pot (Tilted when pouring) */}
                <AnimatePresence>
                    {!isComplete && (
                        <motion.div
                            key="pot"
                            className="absolute top-0 right-[-100px] z-30 origin-top-right"
                            initial={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
                            animate={{
                                rotate: isPouring ? -45 : 0,
                                x: isPouring ? -260 : 0, // Move much further left to center
                                y: isPouring ? -70 : 0
                            }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
                            transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        >
                            {/* Pot Body */}
                            <div className="w-32 h-24 bg-slate-700 rounded-b-[3rem] border-4 border-slate-500 relative overflow-hidden shadow-xl">
                                {/* Highlights */}
                                <div className="absolute top-4 left-4 w-20 h-4 bg-white/10 rounded-full rotate-[-10deg] blur-sm" />

                                {/* Liquid inside pot (Empties as we pour) */}
                                <motion.div
                                    className="absolute inset-x-2 bottom-2 bg-[#5D4037] rounded-b-[2.5rem] opacity-90"
                                    style={{ height: "4rem" }}
                                    animate={{
                                        height: isPouring ? `${Math.max(0, 64 * (1 - pourProgress / 100))}px` : "64px",
                                        transform: isPouring ? "rotate(15deg) scaleX(1.1) translateX(-5px)" : "rotate(0deg)"
                                    }}
                                />
                            </div>
                            {/* Handle */}
                            <div className="absolute top-2 right-[-20px] w-6 h-12 border-4 border-slate-600 rounded-r-xl" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. The Stream (Visible only when pouring) */}
                <AnimatePresence>
                    {isPouring && !isComplete && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 260, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[80px] left-1/2 -translate-x-1/2 w-4 bg-[#5D4037] z-20 rounded-full origin-top"
                            style={{
                                background: "linear-gradient(to bottom, #5D4037, #3E2723)"
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* 3. The Heart Mold (Fills up) */}
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-64 h-64 z-10">
                    {/* Mold Container (Outline) */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        {/* Mold Shape - Empty */}
                        <path
                            d="M50 88.9L48.5 87.4C17.9 59.8 4 47.3 4 28.5C4 15.3 14.3 5 27.5 5C34.9 5 42 8.4 46.6 13.8C51.2 8.4 58.3 5 65.7 5C78.9 5 89.2 15.3 89.2 28.5C89.2 47.3 75.3 59.8 44.7 87.4L43.2 88.9"
                            fill="#2a1810" // Dark chocolate background
                            stroke="#8D6E63"
                            strokeWidth="2"
                        />

                        {/* Liquid Fill Mask */}
                        <defs>
                            <mask id="heartMask">
                                <path
                                    d="M50 88.9L48.5 87.4C17.9 59.8 4 47.3 4 28.5C4 15.3 14.3 5 27.5 5C34.9 5 42 8.4 46.6 13.8C51.2 8.4 58.3 5 65.7 5C78.9 5 89.2 15.3 89.2 28.5C89.2 47.3 75.3 59.8 44.7 87.4L43.2 88.9"
                                    fill="white"
                                />
                            </mask>
                        </defs>

                        {/* Animated Liquid */}
                        <g mask="url(#heartMask)">
                            <motion.rect
                                x="0"
                                y={100 - pourProgress} // Rise from bottom
                                width="100"
                                height="100"
                                fill="#5D4037"
                                initial={{ y: 100 }}
                                animate={{ y: 100 - pourProgress }}
                                transition={{ type: "tween", ease: "linear", duration: 0.1 }} // Smoother transition
                            />
                            {/* Glossy sheen on liquid */}
                            <motion.ellipse
                                cx="30" cy="30" rx="10" ry="5" fill="white" opacity="0.2"
                                animate={{ y: 100 - pourProgress > 30 ? 100 : 0 }} // Simple visibility toggle for sheen
                            />
                        </g>

                        {/* Mold Highlights */}
                        <path
                            d="M50 88.9L48.5 87.4C17.9 59.8 4 47.3 4 28.5C4 15.3 14.3 5 27.5 5C34.9 5 42 8.4 46.6 13.8C51.2 8.4 58.3 5 65.7 5C78.9 5 89.2 15.3 89.2 28.5C89.2 47.3 75.3 59.8 44.7 87.4L43.2 88.9"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                        />
                    </svg>

                    {/* Progress Percentage Text (Subtle) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center">
                        <span className="text-amber-100/40 font-serif text-3xl font-bold tracking-widest drop-shadow-md">
                            {Math.floor(pourProgress)}%
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
}
