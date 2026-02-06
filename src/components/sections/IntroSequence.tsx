"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroSequenceProps {
    onComplete: () => void;
}

const STEPS = [
    {
        main: "Heyyyyy... <3",
        sub: "I know things have been rough lately..."
    },
    {
        main: "But I couldn't let this day pass...",
        sub: "Without asking you something special."
    }
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <section
            className="h-screen w-full flex flex-col items-center justify-center relative bg-romantic-dark text-center px-6 cursor-pointer"
            onClick={handleNext}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 max-w-2xl"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white drop-shadow-md">
                        {STEPS[step].main}
                    </h2>
                    <p className="text-xl md:text-2xl text-romantic-pink/80 font-light italic">
                        {STEPS[step].sub}
                    </p>
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="absolute bottom-10 text-white/30 text-sm flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Tap to continue <ArrowRight className="w-4 h-4" />
            </motion.div>
        </section>
    );
}
