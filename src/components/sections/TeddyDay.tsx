"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import RetroGridRun from "@/components/ui/RetroGridRun";
import ClawMachine from "@/components/ui/ClawMachine";

interface TeddyDayProps {
    onHideNav?: (hide: boolean) => void;
    onComplete?: () => void;
}

export default function TeddyDay({ onHideNav, onComplete }: TeddyDayProps) {
    const [step, setStep] = useState<'INTRO' | 'INVITATION' | 'GAME_INTRO' | 'PLAYING' | 'WIN'>('INTRO');

    // Auto-transition from GAME_INTRO to PLAYING
    useEffect(() => {
        if (step === 'GAME_INTRO') {
            onHideNav?.(true); // Hide nav when game starts
            const timer = setTimeout(() => {
                setStep('PLAYING');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step, onHideNav]);

    const handleWin = () => {
        setStep('WIN');
    };

    return (
        <section className="min-h-screen w-full bg-romantic-dark text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Ambience - Consistent with other days (Hidden in GAME_INTRO/PLAYING/WIN to let canvas shine) */}
            {step !== 'GAME_INTRO' && step !== 'PLAYING' && step !== 'WIN' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-romantic-red/10 via-romantic-dark to-black opacity-60 pointer-events-none" />
            )}

            {/* Retro Grid Background for Game Intro & Playing */}
            <AnimatePresence>
                {(step === 'GAME_INTRO' || step === 'PLAYING') && (
                    <motion.div
                        key="retro-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0"
                    >
                        <RetroGridRun />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Player 1 Badge - Persistent and moved in PLAYING state */}
            {step === 'PLAYING' && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.5, x: "-50%", y: "-50%", top: "50%", left: "50%" }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0, top: "1rem", left: "auto", right: "1rem" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="absolute z-50 font-mono text-yellow-400 text-xl md:text-2xl drop-shadow-[0_2px_0_rgba(0,0,0,1)] tracking-widest border-2 border-yellow-400 px-4 py-2 bg-black/50 rounded-lg select-none pointer-events-none"
                    style={{ position: "absolute" }} // Explicit positioning
                >
                    Player 1 (Ri)
                </motion.div>
            )}

            {/* Claw Machine Game Container */}
            <AnimatePresence>
                {step === 'PLAYING' && (
                    <motion.div
                        key="claw-machine"
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="z-10 relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
                    >
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <ClawMachine onWin={handleWin} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Win State - Big Bear */}
            <AnimatePresence>
                {step === 'WIN' && (
                    <WinSequence onHideNav={onHideNav} onComplete={onComplete} />
                )}
            </AnimatePresence>


            {/* Intro Content */}
            <AnimatePresence mode="wait">
                {step === 'INTRO' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="z-10 flex flex-col items-center gap-12"
                    >
                        <div className="text-center space-y-4">
                            <motion.h1
                                className="text-4xl md:text-6xl font-serif text-amber-100 mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Day 04: Teddy Day
                            </motion.h1>
                            <motion.p
                                className="text-white/60 text-lg md:text-xl font-light tracking-wide"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Something soft, something sweet...
                            </motion.p>
                        </div>

                        {/* Holographic Button */}
                        <motion.button
                            onClick={() => setStep('INVITATION')}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="relative group px-12 py-5 rounded-2xl overflow-hidden font-serif text-xl tracking-widest text-cyan-50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all duration-500 border border-white/10 hover:border-cyan-400/50"
                        >
                            {/* Base Glass Layer */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl group-hover:bg-black/50 transition-colors" />

                            {/* Moving Holographic Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] skew-x-12" />

                            {/* Secondary Purple Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Tech Border Lines (Top/Bottom) */}
                            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-cyan-400 transition-all duration-500" />
                            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent group-hover:via-purple-400 transition-all duration-500" />

                            {/* Content */}
                            <span className="relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:text-white transition-colors">
                                Arcane date it is?
                            </span>

                            {/* Corner Accents */}
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 rounded-tl group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 rounded-br group-hover:border-purple-400 transition-colors" />
                        </motion.button>
                    </motion.div>
                )}

                {step === 'INVITATION' && (
                    <motion.div
                        key="invitation"
                        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        className="z-20 relative"
                    >
                        {/* Hextech Card Container */}
                        <div className="relative w-[350px] md:w-[500px] h-[600px] bg-[#1E1E2E] rounded-xl border border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]">

                            {/* Decorative Lines - Hextech Style */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />

                            {/* Content */}
                            <div className="p-8 h-full flex flex-col items-center justify-between text-center relative z-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-serif text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                        OFFICIAL INVITATION
                                    </h2>
                                    <p className="text-purple-300/80 uppercase tracking-widest text-xs">
                                        To: The Amy to my Jake
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-white/60 text-sm uppercase tracking-wider">Mission</p>
                                        <p className="text-2xl font-medium text-white">Arcade Date</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 w-full">
                                        <div className="space-y-1">
                                            <p className="text-white/60 text-xs uppercase">Time</p>
                                            <p className="text-cyan-100">Midnight</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-white/60 text-xs uppercase">Location</p>
                                            <div className="flex flex-col">
                                                <span className="text-cyan-100 decoration-purple-500/50 decoration-2">My Arms (I wish)</span>
                                                <span className="text-cyan-100 italic text-sm">Your Home (for now)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t border-white/10 pt-4">
                                        <p className="text-white/60 text-sm uppercase tracking-wider">Requirement</p>
                                        <div className="bg-purple-900/40 border border-purple-500/30 p-3 rounded-lg flex items-center justify-center gap-3">
                                            <span className="text-2xl">🧸</span>
                                            <span className="text-purple-200">Hold your teddy!</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <button
                                        onClick={() => setStep('GAME_INTRO')}
                                        className="w-full py-3 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/50 text-cyan-200 uppercase tracking-widest text-sm rounded transition-colors duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                    >
                                        Enter
                                    </button>
                                </div>
                            </div>

                            {/* Background Texture implies machinery/magic */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:4px_4px]" />
                        </div>
                    </motion.div>
                )}

                {step === 'GAME_INTRO' && (
                    <motion.div
                        key="game-welcome"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, filter: "blur(10px)" }} // Fade out welcome text
                        transition={{ delay: 0.5, duration: 1 }}
                        className="z-10 flex flex-col items-center justify-center h-full relative"
                    >
                        {/* Centered Welcome Message */}
                        <div className="space-y-6 text-center">
                            <h1 className="text-5xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-purple-300 to-pink-500 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] tracking-tighter animate-pulse px-4">
                                Welcome Babygirl!
                            </h1>
                            <motion.p
                                layoutId="player-badge" // Linked to the top-right badge
                                className="text-purple-200/80 text-xl tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"
                            >
                                Player 1 Ready (Ri)
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
}

function WinSequence({ onHideNav, onComplete }: { onHideNav?: (hide: boolean) => void; onComplete?: () => void }) {
    const [state, setState] = useState<'INITIAL' | 'FLIPPED' | 'CREAMED'>('INITIAL');
    const [rubCount, setRubCount] = useState(0);
    const [shake, setShake] = useState(0);

    // Show Navbar on mount
    useEffect(() => {
        onHideNav?.(false);
    }, [onHideNav]);

    const handleFlip = () => {
        if (state === 'INITIAL') {
            setState('FLIPPED');
        }
    };

    const handleRub = (e: React.MouseEvent) => {
        if (state !== 'FLIPPED') return;

        // Simple rub logic: movement adds to count
        if (e.buttons === 1) { // Only if mouse is down (holding)
            const newCount = rubCount + 1;
            setRubCount(newCount);
            setShake(Math.random() * 10 - 5); // Random shake

            if (newCount > 100) { // Threshold
                setState('CREAMED');
            }
        }
    };

    const imageClass = "w-64 md:w-96 h-auto object-contain render-pixelated drop-shadow-[0_0_20px_rgba(255,105,180,0.5)]";


    return (
        <motion.div
            key="win-screen"
            className="z-50 relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Top Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-20 md:top-24 text-3xl md:text-5xl font-serif text-pink-200 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] z-40 text-center px-4"
            >
                Happy Teddy Day My Floofy Bun!
            </motion.h1>

            {/* Bear Container - Absolutely centered in the viewport */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative group perspective-1000 pointer-events-auto">
                    {state === 'INITIAL' && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: -100 }}
                            transition={{ delay: 6.5, duration: 1 }}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full flex items-center gap-2 pointer-events-none whitespace-nowrap hidden md:flex"
                        >
                            <span className="text-xl font-handwriting text-yellow-300">Flip me!</span>
                            <ArrowRight className="w-8 h-8 text-yellow-300 animate-pulse" />
                        </motion.div>
                    )}

                    {state === 'FLIPPED' && rubCount < 100 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 100 }}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full flex items-center gap-2 pointer-events-none whitespace-nowrap hidden md:flex"
                        >
                            <ArrowLeft className="w-8 h-8 text-pink-300 animate-pulse" />
                            <div className="flex flex-col">
                                <span className={`text-xl font-handwriting transition-colors duration-300 ${rubCount > 60 ? 'text-red-400 font-bold scale-110' : rubCount > 30 ? 'text-pink-400 font-bold' : 'text-pink-300'}`}>
                                    {rubCount > 60 ? "Almost there... 🥵" : rubCount > 30 ? "Fasterrr Mommy 😩..." : "Rub me..."}
                                </span>
                                <span className="text-xs text-white/50">(Hold & wiggle)</span>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        animate={{
                            scale: state === 'CREAMED' ? 1 : [1, 1.05, 1],
                            filter: state === 'CREAMED' ? "none" : ["drop-shadow(0 0 20px rgba(255,105,180,0.5))", "drop-shadow(0 0 40px rgba(255,105,180,0.8))", "drop-shadow(0 0 20px rgba(255,105,180,0.5))"],
                            rotateY: state === 'FLIPPED' ? 180 : 0,
                            x: state === 'FLIPPED' ? shake : 0,
                            y: state === 'FLIPPED' ? shake : 0,
                        }}
                        transition={{
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            rotateY: { duration: 0.6 },
                            x: { duration: 0.1 },
                            y: { duration: 0.1 }
                        }}
                        onClick={handleFlip}
                        onMouseMove={handleRub}
                        onMouseDown={(e) => e.preventDefault()}
                        className={`cursor-pointer ${state === 'FLIPPED' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                        <img
                            src={
                                state === 'CREAMED' ? "/bear_creamed.png" :
                                    state === 'FLIPPED' ? "/bear_flipped.png" :
                                        "/bear_eyesopened.png"
                            }
                            alt="Teddy"
                            className={imageClass}
                            style={{ imageRendering: "pixelated" }}
                            draggable={false}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Content/Messages Area - Locked to bottom */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none pb-8 md:pb-12">
                <div className="w-full max-w-md text-center px-4 pointer-events-auto">
                    {state !== 'CREAMED' ? (
                        <AnimatePresence>
                            {state === 'INITIAL' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-2 md:gap-4 bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/5"
                                >
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="text-2xl md:text-4xl font-serif text-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                                    >
                                        Congrats on winning!
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.5, duration: 1 }}
                                        className="text-md md:text-xl text-purple-200/80 font-light italic"
                                    >
                                        This looks similar no?
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 5.0, duration: 1 }}
                                        className="text-sm md:text-lg text-romantic-red font-medium tracking-widest uppercase drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]"
                                    >
                                        The game was rigged with love ❤️
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="bg-[#fff9f0] p-6 rounded-xl shadow-[0_0_50px_rgba(225,29,72,0.3)] text-romantic-dark border-2 border-pink-200 transform rotate-1 relative"
                        >
                            <p className="font-handwriting text-lg leading-relaxed text-gray-700">
                                My dearest Riri, just like this teddy, I want to be the one you hold onto when you need comfort. <br />
                                I may not be soft and plushy (okay maybe a little), but my arms are always open for you. <br />
                                <br />
                                <span className="font-bold text-pink-500">Wishing you endless long hugs, spoons and cuddles.</span>
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Next Day Button - Only when CREAMED */}
            {state === 'CREAMED' && (
                <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 group flex items-center gap-3 pl-6 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/90 hover:bg-white/10 hover:border-white/30 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_50px_rgba(225,29,72,0.5)]"
                >
                    <span className="font-serif tracking-[0.2em] uppercase text-sm hidden md:inline">Day 05</span>
                    <div className="w-8 h-8 rounded-full bg-romantic-red flex items-center justify-center group-hover:bg-red-500 transition-colors">
                        <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                </motion.button>
            )}
        </motion.div>
    );
}
