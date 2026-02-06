"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/ui/FloatingHearts";

export default function Landing() {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
        setNoBtnPosition({ x, y });
    };

    const handleYesClick = () => {
        const nextSection = document.getElementById("valentine-week");
        nextSection?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <FloatingHearts />
                <div className="absolute top-20 left-20 w-72 h-72 bg-romantic-red/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-romantic-pink/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center z-10 space-y-12"
            >
                <div className="space-y-4">
                    <p className="text-xl md:text-2xl text-romantic-pink/80 font-light italic">
                        So... here is my question...
                    </p>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-2xl">
                        Will you be my <br />
                        <span className="text-romantic-red">Valentine?</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative min-h-[100px]">
                    {/* YES Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYesClick}
                        className="group relative px-8 py-4 bg-romantic-red text-white rounded-full text-xl font-bold tracking-wider overflow-hidden shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_40px_rgba(225,29,72,0.6)] transition-all"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            YESSS <Heart className="w-5 h-5 fill-current" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </motion.button>

                    {/* NO Button (Runaway) */}
                    <motion.button
                        onMouseEnter={moveNoButton}
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-8 py-4 bg-gray-800/50 text-gray-400 rounded-full text-xl font-bold tracking-wider hover:bg-gray-800 hover:text-white transition-colors cursor-not-allowed"
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-romantic-pink/50 text-sm flex flex-col items-center gap-1"
            >
                <span>Scroll Down</span>
                <span className="text-lg font-light">|</span>
            </motion.div>
        </section>
    );
}
