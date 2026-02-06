"use client";

import { useState } from "react";
import styles from "./love-letter.module.css";
import { motion } from "framer-motion";

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const [showFullLetter, setShowFullLetter] = useState(false);

    // Auto-open modal after animation
    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setShowFullLetter(true), 1500); // 1.5s delay for animation
        } else {
            // If already open, just show letter immediately
            setShowFullLetter(true);
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div
                    className={`${styles.envelope} ${isOpen ? styles.open : ''}`}
                    onClick={handleOpen}
                >
                    <div className={`${styles.flap} ${styles.front}`}></div>
                    <div className={`${styles.flap} ${styles.top}`}></div>
                    <div className={styles.letter}>
                        <div className="text-center font-serif leading-tight p-2 flex flex-col items-center justify-center h-full w-full">
                            <p className="font-bold text-[10px] uppercase tracking-widest text-[#d4af37]">For Richa</p>
                        </div>
                    </div>
                </div>

                {/* Label */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs italic whitespace-nowrap"
                    >
                        Read my letter 💌
                    </motion.div>
                )}
            </div>

            {/* Full Letter Modal */}
            {showFullLetter && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowFullLetter(false)}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-[#fff0f5] text-romantic-dark p-8 md:p-12 max-w-lg w-full rounded-sm shadow-2xl relative font-serif"
                        onClick={(e) => e.stopPropagation()} // Prevent close on paper click
                    >
                        {/* Paper Texture/Lines */}
                        <div className="absolute inset-0 border-2 border-[#d4af37]/20 m-2 pointer-events-none" />

                        <button
                            onClick={() => setShowFullLetter(false)}
                            className="absolute top-4 right-4 text-romantic-red/50 hover:text-romantic-red transition-colors"
                        >
                            ✕
                        </button>

                        <div className="space-y-6 text-center md:text-left leading-relaxed">
                            <p className="font-bold text-xl text-romantic-red">To my dearest Richaaaa 💕🌹,</p>

                            <p>I hope you are doing well..</p>

                            <p>
                                Roses are the language of love and I cannot count how many roses I might have sent you.
                                What I could not speak the roses could, I guess that&apos;s why I loved sending them to you.
                            </p>

                            <p>
                                I pray to God that the thorns on your life&apos;s path be vanished and it is filled with the beautiful petals of love.
                            </p>

                            <p className="font-medium">Happy Rose Day sweetie.</p>

                            <div className="pt-4 text-right">
                                <p className="italic text-sm text-gray-500">Yours truly,</p>
                                <p className="font-dancing text-2xl text-romantic-red">Krish</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
