"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, Variants } from "framer-motion";
import { ChevronDown, Check, Sparkles } from "lucide-react";

import Candle from "../ui/Candle";

// Enhanced Animation Variants for a "Calm & Effortful" feel
const slowFadeIn: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 2.5, ease: "easeOut" }
    }
};

const wordReveal: Variants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }
    }
};

const containerStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.8, // Slower stagger
            delayChildren: 0.5
        }
    }
};

interface PromiseDayProps {
    onComplete?: () => void;
}

export default function PromiseDay({ onComplete }: PromiseDayProps) {
    const [isNoted, setIsNoted] = useState(false);
    const containerRef = useRef(null);

    // Mouse Tracking for Spotlight
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 100, 50, 0.08), transparent 80%)`;


    // Deep parallax for the background usage
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const candleOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0.6, 0.2]); // Dim candle near bottom
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtle parallax lift

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black text-neutral-300 font-sans selection:bg-rose-900/30 selection:text-white overflow-hidden pb-48 cursor-default">

            {/* Dynamic Spotlight Overlay */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-20"
                style={{ background: spotlightBackground }}
            />

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black opacity-80" />
                <motion.div style={{ opacity: 0.05 }} className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay" />
                <motion.div style={{ opacity: candleOpacity }} className="absolute inset-0 transition-opacity duration-1000">
                    <Candle />
                </motion.div>

                {/* Floating Particles/Dust */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/10 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 0.5, 0],
                                scale: [0, 1.5, 0]
                            }}
                            transition={{
                                duration: 15 + Math.random() * 15,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 10
                            }}
                        />
                    ))}
                </div>
            </div>

            <motion.div style={{ y: textY }} className="relative z-10 max-w-2xl mx-auto px-8 md:px-16 flex flex-col gap-40 md:gap-64 py-32">

                {/* 🌑 LANDING TEXT */}
                <motion.div
                    className="min-h-[90vh] flex flex-col justify-center items-center text-center space-y-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerStagger}
                >
                    <motion.div variants={slowFadeIn} className="space-y-8 relative">
                        {/* Subtle glowing orb behind text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-900/10 blur-[60px] rounded-full pointer-events-none animate-pulse duration-[4000ms]" />

                        <h1 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 tracking-wide drop-shadow-2xl">
                            This is the hardest day to write.
                        </h1>
                        <p className="text-lg md:text-xl font-light text-neutral-400 max-w-lg mx-auto leading-relaxed">
                            Because promises used to mean everything.<br />
                            And I didn’t always keep them.
                        </p>
                    </motion.div>

                    <motion.div variants={slowFadeIn} className="pt-8 flex flex-col items-center gap-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 animate-pulse">
                            Read slowly
                        </p>
                        <motion.div
                            animate={{ y: [0, 5, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <ChevronDown className="w-4 h-4 text-neutral-500" />
                        </motion.div>
                    </motion.div>
                </motion.div>


                {/* 🧱 SECTION 1: ACCOUNTABILITY */}
                <Section title="Letters to my dearest Richaaaa <3">
                    <p className="text-2xl md:text-4xl font-serif text-white/90 leading-tight">
                        I know promises I made were broken.
                    </p>
                    <div className="space-y-6 text-neutral-400 font-light text-lg md:text-xl leading-loose">
                        <p>
                            Not because I didn’t care<br />
                            but because I didn’t always know how to show it right.
                        </p>
                        <p>
                            I’m not here to rewrite the past.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="pl-6 border-l w-full border-neutral-800"
                    >
                        <p className="text-neutral-500 text-base italic">
                            But to try to be here for you as a better man.
                        </p>
                    </motion.div>
                </Section>


                {/* 🔒 SECTION 2: THE SHIFT */}
                <Section>
                    <h2 className="text-2xl md:text-4xl font-serif text-white mb-10 drop-shadow-lg">
                        So I’m not making any big promises today.
                    </h2>

                    <div className="space-y-12 pl-6 relative">
                        {/* Decorative Line */}
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-900/50 to-transparent"
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />

                        <div className="space-y-8">
                            <h3 className="text-neutral-600 uppercase text-[10px] tracking-[0.3em] mb-8">What I Won't Promise</h3>

                            <ListItem negative delay={0.2}>
                                "Hollow Promises" when I don’t know tomorrow yet
                            </ListItem>
                            <ListItem negative delay={0.4}>
                                Perfection
                            </ListItem>
                            <ListItem negative delay={0.6}>
                                That I’ll never mess up again
                            </ListItem>
                        </div>

                        <motion.p
                            variants={wordReveal}
                            className="text-neutral-500 text-base italic pt-4"
                        >
                            Because saying those things without earning them would be unfair to you.
                        </motion.p>
                    </div>
                </Section>


                {/* 🌱 SECTION 3: THE CHOICE */}
                <Section title="What I will try to be">
                    <h2 className="text-2xl md:text-4xl font-serif text-white mb-12">
                        Instead of empty vows,<br />here’s what I’m choosing.
                    </h2>

                    <div className="space-y-10">
                        <ListItem delay={0.1}>I’m choosing to be clearer, even when it’s uncomfortable</ListItem>
                        <ListItem delay={0.3}>I’m choosing to pause before reacting</ListItem>
                        <ListItem delay={0.5}>I’m choosing consistency over grand gestures</ListItem>
                        <ListItem delay={0.7}>I’m choosing actions you can see, not words you have to trust</ListItem>
                    </div>

                    <motion.div
                        variants={slowFadeIn}
                        className="mt-20 bg-neutral-900/20 p-8 md:p-10 rounded-xl border border-white/5 backdrop-blur-[2px]"
                    >
                        <p className="text-neutral-300 text-lg md:text-xl font-serif italic text-center leading-relaxed opacity-90">
                            These aren’t vows and I am still a work in progress but I will try to be a better person, the person you fell in love with.
                        </p>
                    </motion.div>
                </Section>


                {/* 🕯️ SECTION 4: NO PRESSURE */}
                <Section title="But hey,">
                    <div className="text-center space-y-10 max-w-lg mx-auto">
                        <p className="text-2xl md:text-4xl text-white font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            You don’t owe me belief.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-400">
                            You don’t have to trust this right away.
                        </p>
                        <div className="py-16 relative">
                            {/* Subtle animated brackets */}
                            <motion.span
                                className="absolute -top-4 -left-4 text-8xl text-neutral-800 font-serif opacity-20"
                                animate={{ x: [0, 5, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity }}
                            >“</motion.span>
                            <motion.span
                                className="absolute -bottom-8 -right-4 text-8xl text-neutral-800 font-serif opacity-20"
                                animate={{ x: [0, -5, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity }}
                            >”</motion.span>

                            <p className="text-neutral-500 font-serif italic text-xl md:text-2xl leading-relaxed">
                                This page isn’t a contract.<br />
                                It’s just me showing you where my head is now.
                            </p>
                        </div>
                    </div>
                </Section>


                {/* 🔓 FINAL INTERACTION */}
                <motion.div
                    className="min-h-[70vh] flex flex-col justify-center items-center text-center gap-16 relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: "-100px" }}
                    variants={slowFadeIn}
                >
                    {/* Final glow behind interaction */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 blur-[100px] rounded-full pointer-events-none" />

                    {!isNoted ? (
                        <motion.button
                            onClick={() => setIsNoted(true)}
                            whileHover={{ scale: 1.05, letterSpacing: "0.25em", borderColor: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.03)" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="group relative px-12 py-5 bg-transparent border border-neutral-700 text-neutral-400 hover:text-white rounded-full font-serif tracking-[0.2em] text-sm transition-all duration-700 backdrop-blur-sm"
                        >
                            <span className="relative z-10">THIS IS NOTED</span>
                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                            className="space-y-12 relative z-10"
                        >
                            <div className="space-y-6 pt-12">
                                <motion.p
                                    variants={wordReveal}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-3xl md:text-5xl font-serif text-white drop-shadow-2xl"
                                >
                                    Thank you for reading this babe.
                                </motion.p>
                                <motion.p
                                    variants={wordReveal}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 1.8 }}
                                    className="text-3xl md:text-4xl font-serif text-rose-200/90"
                                >
                                    I love you.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.5, duration: 2 }}
                                className="pt-12 flex flex-col gap-6 items-center"
                            >
                                <p className="text-neutral-600 text-sm tracking-wide opacity-60 font-light">
                                    (Happy Promise Day my love &lt;3)
                                </p>
                            </motion.div>

                            {/* Next Day Trigger - Subtle */}
                            {onComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 6, duration: 2.5 }}
                                    className="pt-32"
                                >
                                    <button
                                        onClick={onComplete}
                                        className="text-neutral-800 hover:text-neutral-500 transition-colors text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 mx-auto group pb-8"
                                    >
                                        I'll see you tomorrow
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>

            </motion.div>
        </section>
    );
}

// Helper Components for Cleaner JSX
function Section({ children, title }: { children: React.ReactNode, title?: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Focus effect: blur out when near top/bottom of view
    const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ filter: blur, opacity, scale }}
            className="flex flex-col gap-8 relative py-12"
        >
            {title && (
                <motion.h3
                    variants={slowFadeIn}
                    className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-2 border-l border-neutral-800 pl-4 py-2"
                >
                    {title}
                </motion.h3>
            )}
            {children}
        </motion.div>
    );
}

function ListItem({ children, negative = false, delay = 0 }: { children: React.ReactNode, negative?: boolean, delay?: number }) {
    return (
        <motion.div
            variants={slowFadeIn}
            custom={delay}
            className="flex items-start gap-6 group"
        >
            <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.5 }}
                className={`mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-700 ${negative ? 'bg-red-900/30 group-hover:bg-red-800/60 group-hover:shadow-[0_0_15px_rgba(153,27,27,0.5)]' : 'bg-neutral-800 group-hover:bg-neutral-600 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}
            />
            <p className={`text-lg md:text-xl font-light leading-loose transition-all duration-700 ${negative ? 'text-neutral-500 line-through decoration-red-900/20 decoration-1 group-hover:text-neutral-400 group-hover:decoration-red-800/40' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                {children}
            </p>
        </motion.div>
    );
}
