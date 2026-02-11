"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface DaysNavProps {
    currentDay: number;
    onNavigate: (day: number) => void;
}

const DAYS = [
    { id: 1, label: "Rose Day", locked: false },
    { id: 2, label: "Propose Day", locked: false },
    { id: 3, label: "Chocolate Day", locked: false },
    { id: 4, label: "Teddy Day", locked: false },
    { id: 5, label: "Promise Day", locked: false },
    { id: 6, label: "Hug Day", locked: false },
    { id: 7, label: "Kiss Day", locked: true },
    { id: 8, label: "Valentine's", locked: true },
];

export default function DaysNav({ currentDay, onNavigate }: DaysNavProps) {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-[100] flex justify-center py-4 px-4 pointer-events-none"
        >
            <div className="bg-black/40 backdrop-blur-md rounded-full px-2 py-2 flex items-center gap-1 border border-white/10 pointer-events-auto overflow-x-auto max-w-full">
                {DAYS.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => !day.locked && onNavigate(day.id)}
                        disabled={day.locked}
                        className={`
                            relative px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all
                            ${currentDay === day.id
                                ? "bg-romantic-red text-white shadow-lg shadow-romantic-red/40"
                                : day.locked
                                    ? "text-white/20 cursor-not-allowed"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            {day.id === 8 ? "❤️" : `Day ${day.id}`}
                            {day.locked && <Lock className="w-3 h-3" />}
                        </span>

                        {/* Current Indicator Dot */}
                        {currentDay === day.id && (
                            <motion.div
                                layoutId="activeDay"
                                className="absolute inset-0 border border-white/20 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
