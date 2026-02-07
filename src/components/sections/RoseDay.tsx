"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import DigitalRose from "@/components/ui/DigitalRose";
import LoveLetter from "@/components/ui/LoveLetter";
import { useState, useEffect } from "react";

export default function RoseDay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setProgress(latest);
        });
    }, [scrollYProgress]);

    // Animation Maps
    const stemHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    const petalScale = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
    const petalOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
    const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const flowerGridOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] bg-romantic-dark"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Main Rose Animation Area */}
                <div className="relative w-full h-[80vh] flex flex-col items-center justify-end">
                    <DigitalRose progress={progress} />
                </div>

                {/* Message */}
                {/* Message Layer */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute bottom-[20vh] text-center z-40 space-y-4 px-4 w-full"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Happy Rose Day 🌹
                    </h2>
                    <p className="text-xl md:text-2xl text-white font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] italic max-w-lg mx-auto">
                        "Wait... are you giving me a virtual flower?"
                        <br />
                        <span className="text-base opacity-90 font-light">(Yes. I am. But if you allow me to send real ones, Can I?? PLSSSSSSS)</span>
                    </p>
                </motion.div>

                {/* Flower Bed Background (Bottom-most layer) */}
                <motion.div
                    style={{ opacity: flowerGridOpacity }}
                    className="absolute -bottom-5 w-full z-30 pointer-events-none rounded-t-[100%] overflow-hidden"
                >
                    <img
                        src="/flower-bed.png"
                        alt="Flower Bed"
                        className="w-full h-auto max-h-[60vh] object-contain object-bottom rotate-90 scale-150 origin-center"
                    />
                    {/* Gradient fade to blend top of image if needed, or just let it sit */}
                </motion.div>

                {/* Love Letter (Left Side) */}
                <motion.div
                    style={{ opacity: textOpacity, x: textOpacity.get() === 1 ? 0 : -20 }}
                    className="absolute bottom-10 left-4 md:left-10 z-[50]"
                >
                    <LoveLetter />
                </motion.div>

            </div>
        </section>
    );
}
