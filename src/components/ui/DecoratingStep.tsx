"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Drama, Heart, Laugh, Wand2, Sun, Map, HandHeart, Frown, Zap, Gem } from "lucide-react";

interface DecoratingStepProps {
    onComplete: () => void;
}

const INGREDIENTS = [
    { id: "patience", label: "Patience", icon: Clock, color: "from-blue-400 to-indigo-500", effect: "gloss" },
    { id: "cuteness", label: "Cuteness", icon: Sparkles, color: "from-pink-300 to-rose-400", effect: "sparkle" },
    { id: "drama", label: "Drama", icon: Drama, color: "from-purple-500 to-indigo-600", effect: "highlight" },
    { id: "love", label: "Love", icon: Heart, color: "from-red-500 to-rose-600", effect: "pulse" },
    { id: "funny", label: "Funny (That's Krish)", icon: Laugh, color: "from-yellow-400 to-orange-500", effect: "bounce" },
    { id: "magic", label: "Magic", icon: Wand2, color: "from-emerald-400 to-teal-500", effect: "sparkle" },
    { id: "warmth", label: "Warmth", icon: Sun, color: "from-orange-400 to-amber-500", effect: "pulse" },
    { id: "adventure", label: "Adventure", icon: Map, color: "from-sky-400 to-blue-500", effect: "bounce" },
    { id: "hugs", label: "Hugs", icon: HandHeart, color: "from-rose-400 to-pink-500", effect: "pulse" },
    { id: "kisses", label: "Kisses", icon: Zap, color: "from-fuchsia-400 to-purple-500", effect: "sparkle" },
    { id: "pouting", label: "Pouting", icon: Frown, color: "from-gray-400 to-slate-500", effect: "shake" },
    { id: "beauty", label: "Beauty", icon: Gem, color: "from-violet-400 to-fuchsia-500", effect: "shimmer" },
];

export default function DecoratingStep({ onComplete }: DecoratingStepProps) {
    const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
    const [status, setStatus] = useState<'decorating' | 'freezing' | 'complete'>('decorating');

    // Effect to trigger freezing when enough ingredients are added
    useEffect(() => {
        if (addedIngredients.length >= 3 && status === 'decorating') {
            setStatus('freezing');
        }
    }, [addedIngredients, status]);

    // Effect to transition from freezing to complete
    useEffect(() => {
        if (status === 'freezing') {
            const timer = setTimeout(() => {
                setStatus('complete');
                // Optional: Call parent onComplete after some time if needed, 
                // but for now we just show the chocolate.
                // setTimeout(onComplete, 4000); 
            }, 4000); // 4 seconds of freezing
            return () => clearTimeout(timer);
        }
    }, [status, onComplete]);

    const handleDrop = (id: string, info: any) => {
        // Simple hit detection logic or just assume dropped if drag ends
        // We'll rely on the visual "snap" or just add it if dragging over the heart area.
        // For simplicity in this 2D view without complex extensive hit testing:
        // We can just add it when drag ends, assuming the user aimed for the heart.
        // Or checking `info.point` vs heart bounds.

        // Let's just Add it on drag end for a smooth experience.
        if (status !== 'decorating') return;
        if (!addedIngredients.includes(id)) {
            setAddedIngredients((prev) => [...prev, id]);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full select-none overflow-x-hidden">

            {/* Snow Storm Overlay - No background, just particles */}
            <AnimatePresence>
                {status === 'freezing' && (
                    <motion.div
                        key="snow-storm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
                    >
                        {/* Snowflakes */}
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-white rounded-full opacity-80"
                                style={{
                                    width: Math.random() * 4 + 2 + "px",
                                    height: Math.random() * 4 + 2 + "px",
                                    left: Math.random() * 100 + "%",
                                    top: -10 + "%"
                                }}
                                animate={{
                                    top: "110%",
                                    x: (Math.random() - 0.5) * 50, // Slight horizontal drift
                                }}
                                transition={{
                                    duration: Math.random() * 2 + 1, // 1-3s fall duration
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}

                        {/* Freezing Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.h2
                                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                className="text-white font-serif text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-center"
                            >
                                Freezing this moment...
                            </motion.h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Text */}
            <motion.div
                className="absolute top-10 text-center z-20 space-y-2 w-full px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {status === 'decorating' ? (
                        <motion.p
                            key="instruct"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-amber-100/80 font-serif text-lg tracking-wide"
                        >
                            Sprinkle some magic...
                        </motion.p>
                    ) : status === 'complete' ? (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            <p className="text-pink-200 font-serif text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                                Happy Chocolate Day baby ❤️
                            </p>
                            <p className="text-pink-200/80 font-serif text-lg md:text-xl italic">
                                Turns out you always knew the best recipe
                            </p>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </motion.div>

            {/* The Heart Container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mt-10 md:mt-20">
                <AnimatePresence mode="wait">
                    {status !== 'complete' ? (
                        /* Visual Effects Container & Mold */
                        <motion.div
                            key="mold"
                            className="absolute inset-0 z-10"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                scale: addedIngredients.includes("love") ? [1, 1.05, 1] : 1,
                                filter: status === 'freezing' ? "brightness(1.2) hue-rotate(180deg) blur(1px)" : "none"
                            }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1.5 } }}
                            transition={{
                                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            {/* Base Heart Shape (Filled) */}
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_30px_rgba(42,24,16,0.5)]">
                                <path
                                    d="M50 88.9L48.5 87.4C17.9 59.8 4 47.3 4 28.5C4 15.3 14.3 5 27.5 5C34.9 5 42 8.4 46.6 13.8C51.2 8.4 58.3 5 65.7 5C78.9 5 89.2 15.3 89.2 28.5C89.2 47.3 75.3 59.8 44.7 87.4L43.2 88.9"
                                    fill="#5D4037"
                                    stroke="#3E2723"
                                    strokeWidth="2"
                                />
                                {/* Gloss Effect (Patience) */}
                                <motion.path
                                    d="M20 25 Q 35 15 50 25 T 80 25"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    opacity="0.1"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: addedIngredients.includes("patience") ? 1 : 0,
                                        opacity: addedIngredients.includes("patience") ? 0.3 : 0
                                    }}
                                    transition={{ duration: 1 }}
                                />
                                {/* Drama Effect (Stronger Shadow/Highlight) */}
                                <motion.path
                                    d="M50 88.9L48.5 87.4C17.9 59.8 4 47.3 4 28.5C4 15.3 14.3 5 27.5 5C34.9 5 42 8.4 46.6 13.8C51.2 8.4 58.3 5 65.7 5C78.9 5 89.2 15.3 89.2 28.5C89.2 47.3 75.3 59.8 44.7 87.4L43.2 88.9"
                                    fill="none"
                                    stroke="rgba(255,215,0,0.5)"
                                    strokeWidth="3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: addedIngredients.includes("drama") ? 1 : 0 }}
                                />
                            </svg>

                            {/* Sparkles (Cuteness) */}
                            {addedIngredients.includes("cuteness") && (
                                <>
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute bg-white rounded-full"
                                            style={{
                                                width: Math.random() * 4 + 2 + "px",
                                                height: Math.random() * 4 + 2 + "px",
                                                top: 20 + Math.random() * 60 + "%",
                                                left: 20 + Math.random() * 60 + "%",
                                            }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1.5, 0]
                                            }}
                                            transition={{
                                                duration: 1 + Math.random(),
                                                repeat: Infinity,
                                                delay: Math.random() * 2
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </motion.div>
                    ) : (
                        /* Final Chocolate Image */
                        <motion.div
                            key="chocolate"
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-full h-full flex flex-col items-center justify-center"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/chocolate.png"
                                alt="Your Perfect Chocolate"
                                className="w-[80%] h-[80%] object-contain drop-shadow-2xl"
                            />

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Note - Moved outside for visibility */}
            <AnimatePresence>
                {status === 'complete' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-40 mt-8 md:mt-12 px-6 text-center space-y-6 max-w-lg mb-10"
                    >
                        <p className="text-rose-100/90 font-serif text-sm md:text-base italic leading-relaxed drop-shadow-md">
                            Have tasted thousands of chocolates but nothing ever was as sweet as you are.
                            Happy Chocolate Day my love... Keep bringing that sweetness in every place you go.
                        </p>

                        <motion.button
                            onClick={onComplete}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-full text-pink-200 text-sm backdrop-blur-sm transition-colors"
                        >
                            Continue to Day 04 →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ingredients Tray */}
            {/* Ingredients Tray (Right Side Grid) */}
            {/* Ingredients Tray (Right Side Grid) */}
            <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 grid grid-cols-3 gap-2 z-30 max-w-[300px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                {INGREDIENTS.map((ing) => (
                    !addedIngredients.includes(ing.id) && status === 'decorating' && (
                        <motion.div
                            key={ing.id}
                            drag
                            dragConstraints={{ top: -300, left: -400, right: 0, bottom: 300 }}
                            dragElastic={0.2}
                            dragSnapToOrigin={true}
                            onDragEnd={(e, info) => {
                                // Check if dragged left significantly towards heart (x < -100)
                                if (info.offset.x < -100) {
                                    handleDrop(ing.id, info);
                                }
                            }}
                            whileHover={{ scale: 1.05, cursor: "grab", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
                            className="
                                flex flex-col items-center justify-center gap-1 p-2 rounded-lg
                                bg-white/5 border border-white/10
                                text-rose-100/80 font-medium shadow-sm hover:shadow-md
                                backdrop-blur-sm transition-colors
                                cursor-grab active:cursor-grabbing w-20 h-20 text-center
                            "
                        >
                            <ing.icon className="w-5 h-5 text-rose-200/90 drop-shadow-sm mb-0.5" />
                            <span className="text-xs font-serif tracking-wide opacity-80 leading-tight">
                                {ing.label}
                            </span>
                        </motion.div>
                    )
                ))}
            </motion.div>

        </div>
    );
}
