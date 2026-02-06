"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// The heart paths from the user's snippet
const HEART_PATH = "M102.7,12.4L102.7,12.4C90.5,0.2,71.3-1,57.7,8.8c-13.6-9.9-32.9-8.7-45.2,3.5l0,0 c-13.6,13.6-13.6,35.8,0,49.3L48.8,98c1.8,1.8,4,2.9,6.3,3.3c3.9,0.9,8.2-0.1,11.2-3.2l36.3-36.3C116.2,48.2,116.2,26,102.7,12.4 z";
const INNER_HEART_PATH = "M74.7,34L74.7,34c-4.6-4.6-11.9-5.1-17.1-1.4c-5.2-3.8-12.5-3.3-17.1,1.3c-5.1,5.1-5.1,13.6,0,18.7 l13.8,13.8c0.7,0.7,1.5,1.1,2.4,1.3c1.5,0.3,3.1-0.1,4.2-1.2l13.8-13.8C79.9,47.6,79.9,39.2,74.7,34z";

interface Heart {
    id: number;
    x: number;
    y: number;
    scale: number;
    rotation: number;
}

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        // Determine bounds based on window
        const spawnHeart = () => {
            const id = Date.now();
            const x = Math.random() * 100; // Percentage
            const y = Math.random() * 100; // Percentage
            const scale = 0.5 + Math.random() * 1; // 0.5 to 1.5
            const rotation = Math.random() * 40 - 20; // -20 to 20 deg

            setHearts((prev) => [...prev, { id, x, y, scale, rotation }]);

            // Cleanup heart after animation
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== id));
            }, 3000); // 3 seconds lifecycle
        };

        const interval = setInterval(spawnHeart, 600); // Spawn every 600ms
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.svg
                        key={heart.id}
                        viewBox="0 0 120 120"
                        className="absolute w-24 h-24 text-romantic-pink/20"
                        style={{
                            left: `${heart.x}%`,
                            top: `${heart.y}%`,
                        }}
                        initial={{ scale: 0, opacity: 0, rotate: heart.rotation }}
                        animate={{
                            scale: [0, heart.scale * 1.2, heart.scale],
                            opacity: [0, 0.8, 0],
                            y: -50 // Float up slightly
                        }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                    >
                        <path d={HEART_PATH} className="fill-romantic-pink/30" />
                        <path d={INNER_HEART_PATH} className="fill-romantic-red/40" />
                    </motion.svg>
                ))}
            </AnimatePresence>
        </div>
    );
}
