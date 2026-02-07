"use client";

import { useState, useEffect } from "react";
import { Lock, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface NextDayLockProps {
    unlockDate?: string; // ISO string
}

export default function NextDayLock({ unlockDate = "2026-02-09T00:00:00+05:30" }: NextDayLockProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        isExpired: boolean;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
        // Target Date
        const targetDate = new Date(unlockDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
                return;
            }

            // Calculate time components
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
        };

        // Initial call
        updateTimer();

        // Update every second
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm relative border-t border-white/10">
            <div className="text-center space-y-8 p-8 max-w-md w-full">

                {/* Lock Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10"
                >
                    <Lock className="w-10 h-10 text-white/50" />
                </motion.div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-serif text-white/90">
                        Next Surprise Unlocks In...
                    </h3>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 text-romantic-red font-mono text-3xl md:text-5xl font-bold tracking-wider">
                        {timeLeft.days > 0 && (
                            <>
                                <div className="flex flex-col items-center">
                                    <span>{String(timeLeft.days).padStart(2, '0')}</span>
                                    <span className="text-[10px] md:text-xs text-white/40 font-sans font-light tracking-normal mt-1">DAYS</span>
                                </div>
                                <span className="text-white/20 pb-6">:</span>
                            </>
                        )}
                        <div className="flex flex-col items-center">
                            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-white/40 font-sans font-light tracking-normal mt-1">HOURS</span>
                        </div>
                        <span className="text-white/20 pb-6">:</span>
                        <div className="flex flex-col items-center">
                            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-white/40 font-sans font-light tracking-normal mt-1">MINS</span>
                        </div>
                        <span className="text-white/20 pb-6">:</span>
                        <div className="flex flex-col items-center">
                            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-[10px] md:text-xs text-white/40 font-sans font-light tracking-normal mt-1">SECS</span>
                        </div>
                    </div>
                </div>

                <p className="text-white/60 italic text-lg pt-4 animate-pulse">
                    Come back tomorrow babygirl &lt;3
                </p>

            </div>
        </section>
    );
}
