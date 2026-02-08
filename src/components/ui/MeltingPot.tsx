"use client";

import React, { useState, useRef, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";

interface MeltingPotProps {
    onComplete: () => void;
}

// --------------------------------------------------------
// 3D Chocolate Cube Component
// Adapted from the provided snippet to be React-controlled
// --------------------------------------------------------
const ChocolateCube = React.memo(({ progress, offset, index }: { progress: number; offset: { x: number, y: number }; index: number }) => {
    // Progress 0 -> Solid (scaleY 1)
    // Progress 100 -> Melted (scaleY 0.01)

    // Stagger melting slightly based on index
    const adjustedProgress = Math.min(Math.max((progress - index * 5) * 1.2, 0), 100);
    const meltFactor = adjustedProgress / 100;

    const scaleY = 1 - meltFactor * 0.99; // 1 -> 0.01
    const translateY = meltFactor * 50; // 50 is half of cube size (100px)

    return (
        <div
            className="absolute"
            style={{
                left: `calc(50% + ${offset.x}px)`,
                top: `calc(50% + ${offset.y}px)`,
                width: "60px",
                height: "60px",
                transformStyle: "preserve-3d",
                transform: `translate(-50%, -50%) rotateX(-30deg) rotateY(45deg)`, // Isometric view
                zIndex: 10
            }}
        >
            <div
                className="w-full h-full relative"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `translate3d(0, ${translateY}px, 0) scaleY(${scaleY})`,
                    transition: "transform 0.1s linear" // Smooth melting
                }}
            >
                {/* Faces */}
                {/* Top (1) */}
                <div className="absolute inset-0 bg-[#5D4037] border border-[#3E2723]/30" style={{ transform: "translate3d(0,0,30px)" }} />
                {/* Back (2) */}
                <div className="absolute inset-0 bg-[#4E342E] border border-[#3E2723]/30" style={{ transform: "rotateX(90deg) translate3d(0,0,30px)" }} />
                {/* Bottom (3) - Not strictly visible usually */}
                <div className="absolute inset-0 bg-[#3E2723]" style={{ transform: "rotateX(180deg) translate3d(0,0,30px)" }} />
                {/* Front (4) - Puddle face could be here */}
                <div className="absolute inset-0 bg-[#4E342E] border border-[#3E2723]/30" style={{ transform: "rotateX(270deg) translate3d(0,0,30px)" }} />
                {/* Right (5) */}
                <div className="absolute inset-0 bg-[#6D4C41] border border-[#3E2723]/30" style={{ transform: "rotateY(90deg) translate3d(0,0,30px)" }} />
                {/* Left (6) */}
                <div className="absolute inset-0 bg-[#4E342E] border border-[#3E2723]/30" style={{ transform: "rotateY(-90deg) translate3d(0,0,30px)" }} />
            </div>

            {/* Puddle Effect (Scales UP as cube melts) */}
            <div
                className="absolute inset-0 rounded-full blur-md opacity-80"
                style={{
                    background: "radial-gradient(circle, #5D4037 0%, transparent 70%)",
                    transform: `translate3d(0, 40px, 0) rotateX(90deg) scale(${0.5 + meltFactor * 2})`,
                    opacity: meltFactor,
                    transition: "transform 0.1s linear, opacity 0.1s linear"
                }}
            />
        </div>
    );
});
ChocolateCube.displayName = "ChocolateCube";

export default function MeltingPot({ onComplete }: MeltingPotProps) {
    const [progress, setProgress] = useState(0);
    const [lastAngle, setLastAngle] = useState<number | null>(null);
    const [warning, setWarning] = useState("");
    const potRef = useRef<HTMLDivElement>(null);

    // Optimization: Use MotionValues for mouse tracking to avoid React renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const progressSpring = useSpring(0, { stiffness: 100, damping: 30 }); // Smooth progress for visuals

    useEffect(() => {
        progressSpring.set(progress);
    }, [progress, progressSpring]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!potRef.current || progress >= 100) return;

        const rect = potRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update motion values directly (no re-render)
        mouseX.set(x);
        mouseY.set(y);

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

        if (lastAngle !== null) {
            let delta = angle - lastAngle;
            // Handle wrap around (e.g. 179deg -> -179deg)
            if (delta > Math.PI) delta -= 2 * Math.PI;
            if (delta < -Math.PI) delta += 2 * Math.PI;

            const absDelta = Math.abs(delta);

            if (absDelta > 0.05) { // Minimum threshold to count as stirring
                // Reward consistent motion
                // Using functional update to avoid dependency on 'progress' in this callback if possible, 
                // but we need 'progress' for the early return above.
                // Actually, we can just strict set.
                // We'll throttle the state update or just trust React's batching.
                // Ideally we wouldn't update state on every mouse move if possible, but we need it for progress.
                // The 'progress' state update IS the heavy part if it happens every frame.
                // But stirring isn't every frame usually.

                if (absDelta > 0.5) {
                    setWarning("Slower, mommy... ❤️");
                    // setTimeout(() => setWarning(""), 1000); // This causes extra re-renders. Let's start a timer only if not running.
                } else {
                    setWarning("");
                    setProgress(prev => Math.min(prev + absDelta * 2, 100));
                }
            }
        }
        setLastAngle(angle);
    };

    // Auto-complete when done
    useEffect(() => {
        if (progress >= 100) {
            setTimeout(onComplete, 2000);
        }
    }, [progress, onComplete]);

    // Randomize cube positions a bit
    const cubePositions = useMemo(() => [
        { x: -40, y: -30 }, { x: 40, y: -20 },
        { x: -20, y: 40 }, { x: 30, y: 30 },
        { x: 0, y: 0 }
    ], []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full select-none">

            {/* Warning Text */}
            <div className="h-8 mb-8">
                <AnimatePresence>
                    {warning && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-rose-300 font-serif italic text-lg"
                        >
                            {warning}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* The Stove/Pot Assembly */}
            <div className="relative" style={{ perspective: "1000px" }}>

                {/* Gas Stove Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-[60px] rounded-full animate-pulse z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-500/10 blur-[40px] rounded-full z-0" />

                {/* The Pot Geometry */}
                {/* We tilt the container to give the "Top View into Pot" feel while keeping cubes isometric */}
                <div
                    ref={potRef}
                    onMouseMove={handleMouseMove}
                    className="relative w-80 h-80 rounded-full border-8 border-slate-400 bg-slate-800 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden cursor-none z-10"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, #475569, #0f172a)",
                    }}
                >
                    {/* Molten Chocolate Base (Fills up as they melt) */}
                    <motion.div
                        className="absolute inset-0 bg-[#5D4037]"
                        style={{
                            opacity: useTransform(progressSpring, p => p / 100), // Fade in the liquid base
                            transform: "scale(1.1)"
                        }}
                    />

                    {/* Liquid Swirls (Animated when melted) */}
                    {progress > 50 && (
                        <motion.div
                            className="absolute inset-0 opacity-50"
                            style={{
                                background: "conic-gradient(from 0deg, transparent, #3E2723, transparent)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    )}

                    {/* Solid Cubes */}
                    <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                        {cubePositions.map((pos, i) => (
                            <ChocolateCube key={i} index={i} offset={pos} progress={progress} />
                        ))}
                    </div>

                    {/* Wooden Stirrer (Follows Mouse) */}
                    <motion.div
                        className="absolute pointer-events-none z-50 origin-top"
                        style={{
                            left: mouseX,
                            top: mouseY,
                            transform: "translate(-50%, -50%) rotate(15deg)",
                        }}
                    >
                        {/* Spoon Head */}
                        <div className="w-12 h-16 bg-[#8D6E63] rounded-[50%] border-b-4 border-[#5D4037] shadow-xl" />
                        {/* Spoon Handle */}
                        <div className="w-4 h-48 bg-[#6D4C41] absolute top-10 left-1/2 -translate-x-1/2 -z-10" />
                    </motion.div>

                </div>
            </div>

            {/* Instruction / Success Text */}
            <div className="mt-12 h-16 text-center">
                <AnimatePresence mode="wait">
                    {progress < 100 ? (
                        <motion.p
                            key="instruct"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="text-amber-100/40 uppercase tracking-widest text-xs"
                        >
                            Stir gently in circles...
                        </motion.p>
                    ) : (
                        <motion.p
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-amber-100 font-serif text-2xl drop-shadow-lg"
                        >
                            Good things take a little warmth.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
