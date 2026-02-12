"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, Variants, useMotionValueEvent } from "framer-motion";
import { Laugh } from "lucide-react";

interface KissDayProps {
    onComplete?: () => void;
}

// Typewriter effect variants
type TypewriterProps = {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
};

const TypewriterText = ({ text, className = "", delay = 0, speed = 0.05 }: TypewriterProps) => {
    // Split text into words for smoother/performant animation than characters
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, // Stagger per word
                delayChildren: delay
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }} // Only animate once
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
};

// Stable Confetti Component
const Confetti = () => {
    const particles = useRef([...Array(40)].map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        r: Math.random() * 360,
        color: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f43f5e' : '#ffffff',
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
    }))).current;

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0],
                        x: [0, p.x],
                        y: [0, p.y],
                        rotate: [0, p.r + 360]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: [0.22, 1, 0.36, 1],
                        times: [0, 0.1, 0.8, 1]
                    }}
                    className="absolute w-2 h-2 rounded-sm origin-center"
                    style={{
                        backgroundColor: p.color,
                        boxShadow: `0 0 8px ${p.color}`
                    }}
                />
            ))}
        </div>
    );
};

export default function KissDay({ onComplete }: KissDayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [autoScrollStarted, setAutoScrollStarted] = useState(false);

    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    // Auto-scroll logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        // Start auto-scroll once user scrolls past 100px
        if (latest > 100 && !autoScrollStarted) {
            setAutoScrollStarted(true);
        }
    });

    useEffect(() => {
        let animationFrameId: number;

        const autoScroll = () => {
            if (autoScrollStarted) {
                // Scroll speed: 1.5px per frame (approx 90px/sec at 60fps)
                // This fits ~2500vh in about 3-4 minutes, which is good for reading
                window.scrollBy(0, 1.8);

                // Stop if we hit the bottom
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                    return;
                }

                animationFrameId = requestAnimationFrame(autoScroll);
            }
        };

        if (autoScrollStarted) {
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [autoScrollStarted]);

    // ------------------------------------------------------------------
    // BACKGROUND TIMELINE (0.0 - 1.0)
    // ------------------------------------------------------------------
    const redBgOpacity = useTransform(smoothProgress, [0, 0.10, 0.15], [1, 1, 0]);
    const blackBgOpacity = useTransform(smoothProgress, [0.10, 0.15, 0.48, 0.52], [0, 1, 1, 0]);
    const roomOpacity = useTransform(smoothProgress, [0.48, 0.52, 0.9], [0, 1, 1]);
    const roomScale = useTransform(smoothProgress, [0.5, 1], [1, 1.15]);
    const roomY = useTransform(smoothProgress, [0.5, 1], ["0%", "5%"]);

    // ------------------------------------------------------------------
    // TEXT TIMELINE 
    // ------------------------------------------------------------------
    const landingOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

    // Opacity Transforms for sections (to hide/show containers)
    const t1 = useTransform(smoothProgress, [0.12, 0.13, 0.17, 0.18], [0, 1, 1, 0]);
    const t2 = useTransform(smoothProgress, [0.19, 0.20, 0.24, 0.25], [0, 1, 1, 0]);
    const t3a = useTransform(smoothProgress, [0.26, 0.27, 0.31, 0.32], [0, 1, 1, 0]);
    const t3b = useTransform(smoothProgress, [0.33, 0.34, 0.38, 0.39], [0, 1, 1, 0]);
    const t3c = useTransform(smoothProgress, [0.40, 0.41, 0.45, 0.46], [0, 1, 1, 0]);
    const t4 = useTransform(smoothProgress, [0.50, 0.51, 0.55, 0.56], [0, 1, 1, 0]);
    const t5 = useTransform(smoothProgress, [0.57, 0.58, 0.62, 0.63], [0, 1, 1, 0]);
    const t6 = useTransform(smoothProgress, [0.64, 0.65, 0.69, 0.70], [0, 1, 1, 0]);
    const t7a = useTransform(smoothProgress, [0.71, 0.72, 0.76, 0.77], [0, 1, 1, 0]);
    const t7b = useTransform(smoothProgress, [0.78, 0.79, 0.83, 0.84], [0, 1, 1, 0]);
    const t8a = useTransform(smoothProgress, [0.85, 0.86, 0.89, 0.90], [0, 1, 1, 0]);
    const t8b = useTransform(smoothProgress, [0.91, 0.92, 0.94, 0.95], [0, 1, 1, 0]);
    const t8c = useTransform(smoothProgress, [0.96, 0.97, 0.98, 0.99], [0, 1, 1, 0]);

    // Polaroid & Final Params
    const polaroidY = useTransform(smoothProgress, [0.97, 1], ["20%", "0%"]);
    const polaroidOpacity = useTransform(smoothProgress, [0.97, 1], [0, 1]);
    const finalSectionOpacity = useTransform(smoothProgress, [0.98, 1], [0, 1]);

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = '/kiss_real.png';
        link.download = 'our-first-kiss.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div ref={containerRef} className="relative h-[2500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* --- BACKGROUNDS --- */}

                {/* 1. Landing Red Background */}
                <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-b from-[#2d0a0a] via-[#1a0505] to-black"
                    style={{ opacity: redBgOpacity }}
                >
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />
                    <div className="absolute inset-0 opacity-8 bg-[url('/kissy.png')] bg-repeat" style={{ backgroundSize: '100px 100px' }} />
                </motion.div>

                {/* 2. Void */}
                <motion.div
                    className="absolute inset-0 z-5 bg-black"
                    style={{ opacity: blackBgOpacity }}
                />

                {/* 3. Room */}
                <motion.div
                    className="absolute inset-0 z-10 bg-black"
                    style={{ opacity: roomOpacity }}
                >
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/hotel_room.png')",
                            scale: roomScale,
                            y: roomY
                        }}
                    />
                    <div className="absolute inset-0 bg-black/65" />
                </motion.div>

                {/* Grain */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* --- CONTENT --- */}

                {/* LANDING */}
                <motion.div
                    style={{ opacity: landingOpacity }}
                    className="relative z-30"
                >
                    <div className="relative text-center space-y-8 px-4">
                        <TypewriterText
                            text="Kiss Day"
                            className="text-4xl md:text-6xl font-serif text-amber-100 mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse inline-block"
                        />
                        <div className="space-y-4">
                            <TypewriterText
                                text="Some memories live in your chest."
                                className="text-lg text-neutral-400"
                                delay={1}
                            />
                            <TypewriterText
                                text="This one still makes my heart race."
                                className="text-lg text-neutral-400"
                                delay={2}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
                >
                    <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">SCROLL TO REMEMBER</p>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0"
                    />
                </motion.div>

                <div className="relative z-30 w-full max-w-3xl px-8 text-center">

                    {/* SCENE 1 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t1 }}>
                            <TypewriterText text="Do you remember our first kiss?" className="text-2xl md:text-4xl font-serif text-white/90 drop-shadow-md leading-relaxed" />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t2 }} className="space-y-4">
                            <TypewriterText text="Almost three years ago…" className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="Two nervous kids closed a long distance gap." className="text-xl md:text-3xl font-serif text-white/90" delay={0.5} />
                            <TypewriterText text="300+ kilometers from my side." className="text-xl md:text-3xl font-serif text-white/90" delay={1.5} />
                            <TypewriterText text="20 minutes from yours." className="text-xl md:text-3xl font-serif text-white/90" delay={2.5} />
                            <TypewriterText text="And it still felt like the longest walk of our lives." className="text-xl md:text-3xl font-serif text-white/90" delay={3.5} />
                        </motion.div>
                    </div>

                    {/* SCENE 2 */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t3a }} className="space-y-4">
                            <TypewriterText text="I was starving." className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="Not just for food;" className="text-xl md:text-3xl font-serif text-white/90" delay={0.5} />
                            <TypewriterText text="but for the moment I'd been waiting for all day." className="text-xl md:text-3xl font-serif text-white/90" delay={1.5} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t3b }}>
                            <TypewriterText text="Nervous. Overthinking. Pretending I wasn't shaking." className="text-xl md:text-2xl font-serif text-white/90" />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t3c }} className="space-y-4">
                            <TypewriterText text="You came so late..." className="text-2xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="trying to look calm." className="text-xl md:text-2xl font-light text-white/80" delay={1} />
                            <div className="flex items-center justify-center gap-2">
                                <TypewriterText text="Failing beautifully." className="text-2xl md:text-3xl font-sans text-rose-300/90 italic" delay={2} />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2.5 }}
                                >
                                    <Laugh className="w-5 h-5 md:w-6 md:h-6 text-rose-300" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* SCENE 3 - REVEAL */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t4 }} className="space-y-4">
                            <TypewriterText text="And then…" className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="we stood here." className="text-xl md:text-3xl font-serif text-white/90 block" delay={1} />
                            <TypewriterText text="Not knowing this room would become a memory we'd replay for years." className="text-xl md:text-3xl font-serif text-white/90 block mt-8" delay={2} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t5 }} className="space-y-4">
                            <TypewriterText text="We were awkward." className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="Trying too hard." className="text-xl md:text-3xl font-serif text-white/90" delay={1} />
                            <TypewriterText text="Trying not to show it." className="text-xl md:text-3xl font-serif text-white/90" delay={2} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t6 }} className="space-y-4">
                            <TypewriterText text="We were just kids…" className="text-2xl md:text-4xl font-serif text-white/90" />
                            <TypewriterText text="pretending to be brave." className="text-2xl md:text-4xl font-serif text-white/90" delay={1} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t7a }} className="space-y-4">
                            <TypewriterText text="I pulled out a ring." className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="My hands were shaking." className="text-xl md:text-3xl font-serif text-white/90" delay={1} />
                            <TypewriterText text="It wasn't perfect. I wasn't perfect." className="text-xl md:text-3xl font-serif text-white/90 mt-6 block" delay={2} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t7b }} className="relative flex items-center justify-center">
                            <Confetti />
                            <TypewriterText
                                text="But you said yes."
                                className="text-3xl md:text-5xl font-serif text-amber-100/90 drop-shadow-lg relative z-10"
                            />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t8a }} className="space-y-4">
                            <TypewriterText text="And then… there was a pause." className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="The kind where the world goes quiet." className="text-xl md:text-3xl font-serif text-white/90" delay={1.5} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t8b }} className="space-y-4">
                            <TypewriterText text="No overthinking. No expectations." className="text-xl md:text-3xl font-serif text-white/90" />
                            <TypewriterText text="Just you. And me." className="text-xl md:text-3xl font-serif text-white/90" delay={1.5} />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div style={{ opacity: t8c }}>
                            <TypewriterText
                                text="And our first kiss."
                                className="text-4xl md:text-6xl font-serif text-rose-100/90 italic drop-shadow-lg leading-relaxed"
                            />
                        </motion.div>
                    </div>

                    {/* FINAL SCENE */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full px-8">

                            {/* POLAROID */}
                            <motion.div
                                style={{ y: polaroidY, opacity: polaroidOpacity }}
                                className="relative pointer-events-auto transform rotate-[-3deg] hover:rotate-[-1deg] transition-all duration-700 ease-out z-20 flex-shrink-0"
                            >
                                <div className="bg-white p-4 pb-16 shadow-2xl max-w-[280px] md:max-w-xs mx-auto">
                                    <div className="aspect-[4/5] bg-black overflow-hidden relative transition-all duration-1000">
                                        <img
                                            src="/kiss_real.png"
                                            alt="Our First Kiss"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-blue-500/5 mix-blend-overlay opacity-30" />
                                    </div>
                                    <div className="absolute bottom-4 left-0 w-full text-center">
                                        <p className="font-handwriting text-gray-600 text-xl tracking-wide opacity-80" style={{ fontFamily: '"Caveat", cursive' }}>
                                            Our First Kiss
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                            Oct 03 2023
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* TEXT & CTA */}
                            <motion.div
                                style={{ opacity: finalSectionOpacity }}
                                className="pointer-events-auto text-center md:text-left space-y-8 max-w-md"
                            >
                                <div className="space-y-4">
                                    <TypewriterText text="Some moments don't get photographed." className="text-white/80 font-serif text-2xl md:text-3xl italic leading-relaxed block" />
                                    <TypewriterText text="They just live in your heart." className="text-white/60 font-light text-lg block" delay={1} />
                                    <TypewriterText text="But maybe… this one deserves a frame." className="text-white/90 font-serif text-xl md:text-2xl mt-4 block" delay={2} />
                                    <TypewriterText text="Happy Kiss Day my baby lets makeout soon" className="text-white/90 font-serif text-xl md:text-2xl mt-4 block" delay={2} />
                                </div>

                                <div className="space-y-6 pt-4 border-t border-white/10">
                                    <div className="space-y-2">
                                        <TypewriterText text="We never really had a picture of that night." className="text-neutral-400 text-sm font-light block" delay={3} />
                                        <TypewriterText text="Maybe it's time we do." className="text-rose-200/80 text-sm font-light italic block" delay={4} />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 5 }}
                                        className="flex flex-col items-center md:items-start gap-4"
                                    >
                                        <button
                                            onClick={downloadImage}
                                            className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 text-xs tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            Download Memory
                                        </button>

                                        {onComplete && (
                                            <button
                                                onClick={onComplete}
                                                className="text-neutral-500 hover:text-rose-400 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                                            >
                                                Start Valentine's Day →
                                            </button>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Final Whisper */}
                                <div className="pt-8 opacity-60">
                                    <TypewriterText
                                        text="That night, we were just beginning. And somehow… we still are."
                                        className="text-white/40 text-xs font-light italic block"
                                        delay={6}
                                    />
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
