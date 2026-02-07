"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    size: number;
    emoji: string;
}

export default function HeartCursorTrail() {
    const [points, setPoints] = useState<TrailPoint[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 10 + 10,
                emoji: Math.random() > 0.5 ? "❤️" : "✨"
            };

            setPoints(prev => [...prev.slice(-20), newPoint]);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => prev.filter(p => Date.now() - p.id < 1000));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {points.map((point) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 1, scale: 0.5, y: 0 }}
                        animate={{ opacity: 0, scale: 0, y: -20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-pink-400 drop-shadow-[0_0_5px_rgba(255,105,180,0.8)]"
                        style={{
                            left: point.x,
                            top: point.y,
                            fontSize: `${point.size}px`
                        }}
                    >
                        {point.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
