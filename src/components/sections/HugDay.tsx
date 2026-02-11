"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface HugDayProps {
    onComplete?: () => void;
}

export default function HugDay({ onComplete }: HugDayProps) {
    const [started, setStarted] = useState(false);
    const [showHiddenMessage, setShowHiddenMessage] = useState(false);

    return (
        <>
            {/* Landing Scene */}
            {!started && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: "rgb(25, 6, 4)" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="relative z-10 text-center space-y-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif text-amber-100 mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                            Hug Day
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 2 }}
                            className="space-y-4"
                        >
                            <p className="text-lg text-neutral-400">Today isn't loud.</p>
                            <p className="text-lg text-neutral-400">It's quiet.</p>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3, duration: 2 }}
                            onClick={() => setStarted(true)}
                            className="mt-12 px-8 py-3 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 rounded-full text-sm tracking-widest transition-all duration-500 relative z-20 pointer-events-auto cursor-pointer"
                        >
                            Shall we?
                        </motion.button>


                    </motion.div>
                </motion.div>
            )}

            {/* Main Scroll Experience */}
            {started && (
                <ScrollExperience
                    onComplete={onComplete}
                    showHiddenMessage={showHiddenMessage}
                    setShowHiddenMessage={setShowHiddenMessage}
                />
            )}
        </>
    );
}

// Separate component for scroll experience to ensure proper hydration
function ScrollExperience({
    onComplete,
    showHiddenMessage,
    setShowHiddenMessage
}: {
    onComplete?: () => void;
    showHiddenMessage: boolean;
    setShowHiddenMessage: (value: boolean) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [hasPlayedMusic, setHasPlayedMusic] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth spring for animations
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // Boy position and state (left figure)
    const boyX = useTransform(smoothProgress, [0, 0.15, 0.4, 0.6], [-200, -80, -80, -20]);
    const boyY = useTransform(smoothProgress, [0, 0.15, 0.25, 0.4, 0.6], [0, 0, -5, 5, 0]); // Subtle vertical movement
    const boyBent = useTransform(smoothProgress, [0.25, 0.4, 0.55], [0, 8, 3]); // Bend then straighten a bit
    const boyLeftArmX = useTransform(smoothProgress, [0.5, 0.6], [15, 35]);
    const boyLeftArmY = useTransform(smoothProgress, [0.5, 0.6], [55, 50]);
    const boyScale = useTransform(smoothProgress, [0, 0.15, 0.6, 0.75], [0.8, 1, 1, 1.02]); // Depth scale
    const boyHeadBob = useTransform(smoothProgress, [0.2, 0.3, 0.4], [0, -2, 0]); // Head bob during stress

    // Girl position and state (right figure)
    const girlX = useTransform(smoothProgress, [0, 0.15, 0.4, 0.6], [200, 80, 80, 20]);
    const girlY = useTransform(smoothProgress, [0.1, 0.15, 0.5, 0.6], [0, 0, 0, -3]); // Slight lift during approach
    const girlRightArmX = useTransform(smoothProgress, [0.5, 0.6], [45, 25]);
    const girlRightArmY = useTransform(smoothProgress, [0.5, 0.6], [55, 50]);
    const girlScale = useTransform(smoothProgress, [0.1, 0.15, 0.6, 0.75], [0.8, 1, 1, 1.02]); // Depth scale
    const girlSway = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 2, -1, 0]); // Gentle sway

    // Background color transition with more steps
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.3, 0.4, 0.6, 0.85, 1],
        ["#0a0a0a", "#12121c", "#1a1a2e", "#2d1b1b", "#1a1410", "#0f0c08"]
    );

    // Problem words animation
    const problemsOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0.1]);
    const problemsBlur = useTransform(smoothProgress, [0.6, 0.75], [0, 20]);
    const problemsScale = useTransform(smoothProgress, [0.6, 0.75], [1, 1.5]);
    const problemsRotate = useTransform(smoothProgress, [0.3, 0.6], [0, 15]); // Spiral effect

    // Text labels opacity with smoother transitions
    const boyLabelOpacity = useTransform(smoothProgress, [0, 0.08, 0.18, 0.28], [0, 1, 1, 0]);
    const girlLabelOpacity = useTransform(smoothProgress, [0.1, 0.15, 0.22, 0.3], [0, 1, 1, 0]);
    const problemsTextOpacity = useTransform(smoothProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
    const messageOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);

    // Camera/parallax effects
    const cameraZoom = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [1, 1.1, 1, 0.98]);
    const vignetteIntensity = useTransform(smoothProgress, [0, 0.3, 0.6, 0.8], [0.3, 0.6, 0.4, 0.2]);

    // Boy lean into hug
    const boyLean = useTransform(smoothProgress, [0.6, 0.7], [0, 2]);

    // Particles at hug moment
    const particlesOpacity = useTransform(smoothProgress, [0.58, 0.62, 0.75, 0.8], [0, 1, 1, 0]);

    const problems = [
        "Expectations", "Deadlines", "Career", "Standards",
        "Doubts", "Fear", "Overthinking", "Pressure",
        "Anxiety", "Comparison", "Perfectionism", "Loneliness",
        "Failure", "Rejection", "Uncertainty", "Guilt"
    ];

    // Generate random positions for each problem (only once)
    const problemPositions = useRef(
        problems.map(() => ({
            x: (Math.random() - 0.5) * 300, // Random x between -150 and 150
            y: (Math.random() - 0.5) * 300, // Random y between -150 and 150
            drift: {
                x: (Math.random() - 0.5) * 30,
                y: (Math.random() - 0.5) * 30,
                duration: 3 + Math.random() * 3
            }
        }))
    ).current;

    // Play music at hug moment
    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            if (latest >= 0.58 && latest <= 0.62 && !hasPlayedMusic && audioRef.current) {
                audioRef.current.play().catch((err: unknown) => console.log('Audio play failed:', err));
                setHasPlayedMusic(true);
            }
        });
        return () => unsubscribe();
    }, [smoothProgress, hasPlayedMusic]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
            style={{ height: "500vh" }}
            onClick={() => setShowHiddenMessage(true)}
        >
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{
                    backgroundColor: bgColor,
                    scale: cameraZoom
                }}
            >
                {/* Hidden Audio Element */}
                <audio ref={audioRef} src="/perfect.mp3" />

                {/* Scroll Indicator - appears after "Shall we?" is clicked */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-rose-300/50 text-sm flex flex-col items-center gap-1 pointer-events-none"
                >
                    <span>Scroll Down</span>
                    <span className="text-lg font-light">|</span>
                </motion.div>

                {/* Two Persistent Stick Figures */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Boy - Left Figure (with short hair and broader shoulders) */}
                        <motion.div
                            style={{
                                x: boyX,
                                y: boyY,
                                scale: boyScale
                            }}
                            className="absolute"
                        >
                            <motion.svg
                                width="60"
                                height="130"
                                viewBox="0 0 60 130"
                                className="mx-auto"
                                animate={{
                                    scaleY: [1, 1.02, 1],
                                }}
                                transition={{
                                    scaleY: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                }}
                                style={{
                                    rotate: useTransform(
                                        [boyBent, boyLean],
                                        ([bent, lean]) => (bent as number) + (lean as number)
                                    )
                                }}
                            >
                                {/* Head with subtle bob */}
                                <motion.g style={{ y: boyHeadBob }}>
                                    <circle cx="30" cy="20" r="12" fill="none" stroke="white" strokeWidth="2" />
                                    {/* Short Hair (boy) */}
                                    <path d="M 18 15 Q 18 8 30 8 Q 42 8 42 15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    {/* Eyes - blink effect */}
                                    <motion.g
                                        animate={{ scaleY: [1, 0.1, 1] }}
                                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
                                    >
                                        <circle cx="25" cy="18" r="1.5" fill="white" />
                                        <circle cx="35" cy="18" r="1.5" fill="white" />
                                    </motion.g>
                                </motion.g>
                                {/* Body */}
                                <line x1="30" y1="32" x2="30" y2="70" stroke="white" strokeWidth="2.5" />
                                {/* Left Arm - animated for hug */}
                                <motion.line
                                    x1="30" y1="45"
                                    x2={boyLeftArmX}
                                    y2={boyLeftArmY}
                                    stroke="white"
                                    strokeWidth="2"
                                />
                                {/* Right Arm */}
                                <line x1="30" y1="45" x2="45" y2="55" stroke="white" strokeWidth="2" />
                                {/* Legs with weight shift */}
                                <motion.line
                                    x1="30" y1="70"
                                    x2="20" y2="105"
                                    stroke="white"
                                    strokeWidth="2"
                                    animate={{ x2: [20, 19, 20] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.line
                                    x1="30" y1="70"
                                    x2="40" y2="105"
                                    stroke="white"
                                    strokeWidth="2"
                                    animate={{ x2: [40, 41, 40] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                />
                            </motion.svg>

                            {/* Boy Label */}
                            <motion.p
                                style={{ opacity: boyLabelOpacity }}
                                className="text-neutral-500 text-sm mt-4 text-center absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap"
                            >
                                This is me.
                            </motion.p>
                        </motion.div>

                        {/* Girl - Right Figure (with long hair and dress) */}
                        <motion.div
                            style={{
                                x: girlX,
                                y: girlY,
                                scale: girlScale,
                                rotate: girlSway
                            }}
                            className="absolute"
                        >
                            <motion.svg
                                width="60"
                                height="130"
                                viewBox="0 0 60 130"
                                className="mx-auto"
                                animate={{
                                    scaleY: [1, 1.015, 1],
                                }}
                                transition={{
                                    scaleY: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                                }}
                            >
                                {/* Head */}
                                <motion.g
                                    animate={{ y: [0, -1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    <circle cx="30" cy="20" r="12" fill="none" stroke="white" strokeWidth="2" />
                                    {/* Long Hair (girl) - with sway */}
                                    <path d="M 18 15 Q 18 8 30 8 Q 42 8 42 15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    <motion.line
                                        x1="18" y1="18"
                                        x2="16" y2="32"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        animate={{ x2: [16, 15, 16] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.line
                                        x1="42" y1="18"
                                        x2="44" y2="32"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        animate={{ x2: [44, 45, 44] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                    />
                                    {/* Eyes - blink effect */}
                                    <motion.g
                                        animate={{ scaleY: [1, 0.1, 1] }}
                                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                                    >
                                        <circle cx="25" cy="18" r="1.5" fill="white" />
                                        <circle cx="35" cy="18" r="1.5" fill="white" />
                                    </motion.g>
                                </motion.g>
                                {/* Body */}
                                <line x1="30" y1="32" x2="30" y2="65" stroke="white" strokeWidth="2" />
                                {/* Dress/Skirt - with subtle movement */}
                                <motion.path
                                    d="M 30 65 L 20 85 M 30 65 L 40 85"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                    animate={{
                                        d: [
                                            "M 30 65 L 20 85 M 30 65 L 40 85",
                                            "M 30 65 L 19 85 M 30 65 L 41 85",
                                            "M 30 65 L 20 85 M 30 65 L 40 85"
                                        ]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <line x1="20" y1="85" x2="40" y2="85" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                {/* Left Arm */}
                                <line x1="30" y1="45" x2="15" y2="55" stroke="white" strokeWidth="2" />
                                {/* Right Arm - animated for hug */}
                                <motion.line
                                    x1="30" y1="45"
                                    x2={girlRightArmX}
                                    y2={girlRightArmY}
                                    stroke="white"
                                    strokeWidth="2"
                                />
                                {/* Legs */}
                                <line x1="25" y1="85" x2="22" y2="105" stroke="white" strokeWidth="2" />
                                <line x1="35" y1="85" x2="38" y2="105" stroke="white" strokeWidth="2" />
                            </motion.svg>

                            {/* Girl Label */}
                            <motion.p
                                style={{ opacity: girlLabelOpacity }}
                                className="text-neutral-500 text-sm mt-4 text-center absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap"
                            >
                                This is you (riri da baddie).
                            </motion.p>
                        </motion.div>

                        {/* Floating Problems - around boy with collapse animation */}
                        <motion.div
                            style={{
                                opacity: problemsOpacity,
                                filter: useTransform(problemsBlur, (v) => `blur(${v}px)`),
                                scale: problemsScale,
                                rotate: problemsRotate,
                                x: boyX
                            }}
                            className="absolute"
                        >
                            {problems.map((problem, i) => {
                                const pos = problemPositions[i];
                                const baseX = pos.x;
                                const baseY = pos.y;

                                // Collapse toward center during hug
                                const collapseX = useTransform(smoothProgress, [0.55, 0.7], [baseX, 0]);
                                const collapseY = useTransform(smoothProgress, [0.55, 0.7], [baseY, 0]);

                                return (
                                    <motion.div
                                        key={problem}
                                        className="absolute text-neutral-400 text-sm md:text-base font-light whitespace-nowrap"
                                        style={{
                                            x: collapseX,
                                            y: collapseY,
                                        }}
                                        animate={{
                                            x: [0, pos.drift.x, 0],
                                            y: [0, pos.drift.y, 0],
                                        }}
                                        transition={{
                                            duration: pos.drift.duration,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {problem}
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* "99 problems" text */}
                        <motion.div
                            style={{ opacity: problemsTextOpacity }}
                            className="absolute top-2/3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        >
                            <p className="text-3xl md:text-5xl font-serif text-white">99 problems.</p>
                        </motion.div>

                        {/* Warm Particles at Hug Moment */}
                        <motion.div
                            style={{ opacity: particlesOpacity }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 rounded-full bg-amber-400/60"
                                    style={{
                                        left: `${45 + Math.random() * 10}%`,
                                        top: `${45 + Math.random() * 10}%`,
                                    }}
                                    animate={{
                                        y: [-20, -80],
                                        x: [0, (Math.random() - 0.5) * 40],
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Final Message */}
                <motion.div
                    style={{ opacity: messageOpacity }}
                    className="absolute inset-0 flex items-end justify-center pb-32 pointer-events-none"
                >
                    <div className="text-center space-y-12 max-w-2xl px-8">
                        <motion.p
                            style={{ opacity: useTransform(smoothProgress, [0.75, 0.8], [0, 1]) }}
                            className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed"
                        >
                            Maybe you cannot solve all my problems.
                        </motion.p>
                        <motion.p
                            style={{ opacity: useTransform(smoothProgress, [0.8, 0.85], [0, 1]) }}
                            className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed"
                        >
                            But your presence makes it bearable.
                        </motion.p>
                        <motion.div
                            style={{ opacity: useTransform(smoothProgress, [0.85, 0.95], [0, 1]) }}
                            className="pt-8 space-y-4"
                        >
                            <p className="text-2xl md:text-4xl font-serif text-rose-200">
                                You are my comfort.
                            </p>
                            <p className="text-lg text-neutral-400">
                                And I love you for that. Happy Hug Day my cuddlebear!
                            </p>
                        </motion.div>

                        {/* Hidden Message */}
                        {showHiddenMessage && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2 }}
                                className="text-sm text-neutral-600 italic pt-12"
                            >
                                Happy Hug Day My cuddlebear! Thank you for staying.
                            </motion.p>
                        )}

                        {/* Next Day Button */}
                        {onComplete && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                onClick={onComplete}
                                className="mt-16 text-neutral-700 hover:text-neutral-500 text-xs tracking-widest uppercase transition-colors pointer-events-auto"
                            >
                                Continue →
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* Cinematic Effects */}

                {/* Dynamic Vignette */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: useTransform(
                            vignetteIntensity,
                            (v) => `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,${v}) 80%, rgba(0,0,0,${v * 1.5}) 100%)`
                        )
                    }}
                />

                {/* Film Grain */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat"
                    }}
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                {/* Heartbeat Pulse (during hug) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: useTransform(smoothProgress, [0.55, 0.6, 0.65, 0.7], [0, 0.15, 0, 0]),
                        background: "radial-gradient(circle at center, rgba(255,100,100,0.1) 0%, transparent 50%)"
                    }}
                />

                {/* Ambient Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: useTransform(
                            smoothProgress,
                            [0.6, 0.8],
                            [
                                "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                                "radial-gradient(circle at center, rgba(255,200,150,0.15) 0%, transparent 60%)"
                            ]
                        )
                    }}
                />

                {/* Slow Zoom Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        scale: useTransform(smoothProgress, [0, 1], [1, 1.05]),
                        opacity: 0
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
