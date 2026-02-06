"use client";

import { motion } from "framer-motion";

interface DigitalRoseProps {
    progress: number; // 0 to 1
}

export default function DigitalRose({ progress }: DigitalRoseProps) {
    // Map progress to scale (starts at 0, grows to full size)
    // We can clamp it so it doesn't get too huge or stay invisible too long
    const scale = Math.min(Math.max(progress, 0), 1);
    const opacity = Math.min(progress * 2, 1); // Fade in faster

    return (
        <div className="relative w-full h-full flex items-end justify-center pb-40 md:pb-60 pointer-events-none">
            <motion.img
                src="/rose-character.png"
                alt="Valentine Character"
                className="max-h-[70vh] w-auto object-contain drop-shadow-2xl"
                style={{
                    scale: scale,
                    opacity: opacity,
                    transformOrigin: "bottom center"
                }}
            />
        </div>
    );
}
