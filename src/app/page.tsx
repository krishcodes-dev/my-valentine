"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/sections/PasswordGate";
import Landing from "@/components/sections/Landing";
import WeekIntro from "@/components/sections/WeekIntro";
import RoseDay from "@/components/sections/RoseDay";
import NextDayLock from "@/components/sections/NextDayLock";
import IntroSequence from "@/components/sections/IntroSequence";
import ProposeDay from "@/components/sections/ProposeDay";
import MusicPlayer from "@/components/ui/MusicPlayer";
import DaysNav from "@/components/ui/DaysNav";
import ChocolateDay from "@/components/sections/ChocolateDay";
import { motion } from "framer-motion"; // Added for motion.div
import { ArrowRight } from "lucide-react";
import TeddyDay from "@/components/sections/TeddyDay";

export default function Home() {
  // States: 'LOCKED' | 'INTRO' | 'MAIN' | 'DAY2' | 'DAY2_COMPLETE' | 'DAY3' | 'DAY4' | 'DAY5'
  const [viewState, setViewState] = useState<'LOCKED' | 'INTRO' | 'MAIN' | 'DAY2' | 'DAY2_COMPLETE' | 'DAY3' | 'DAY4' | 'DAY5'>('DAY3');
  // State to hide nav during arcade game
  const [hideNav, setHideNav] = useState(false);

  // Removed localStorage check effectively forcing password on every reload
  useEffect(() => {
    // If we wanted to check, it would go here. 
    // By doing nothing, we default to LOCKED state on every mount.
  }, []);

  const handleUnlock = () => {
    setViewState('INTRO');
  };

  const handleIntroComplete = () => {
    setViewState('MAIN');
  };

  const handleNav = (day: number) => {
    if (day === 1) setViewState('MAIN');
    if (day === 2) setViewState('DAY2');
    if (day === 3) setViewState('DAY3');
    if (day === 4) setViewState('DAY4');
    if (day === 5) setViewState('DAY5');
  };

  const getCurrentDay = () => {
    if (viewState === 'MAIN') return 1;
    if (viewState === 'DAY2' || viewState === 'DAY2_COMPLETE') return 2;
    if (viewState === 'DAY3') return 3;
    if (viewState === 'DAY4') return 4;
    if (viewState === 'DAY5') return 5;
    return 1;
  };

  return (
    <main className="relative min-h-screen bg-romantic-dark text-romantic-light selection:bg-romantic-red/30">
      {/* Music Player - Only for Day 1 */}
      {(viewState === 'LOCKED' || viewState === 'INTRO' || viewState === 'MAIN') && (
        <MusicPlayer />
      )}

      {/* Show Nav only when unlocked and not explicitly hidden */}
      {(viewState === 'MAIN' || viewState === 'DAY2' || viewState === 'DAY2_COMPLETE' || viewState === 'DAY3' || viewState === 'DAY4' || viewState === 'DAY5') && !hideNav && (
        <DaysNav currentDay={getCurrentDay()} onNavigate={handleNav} />
      )}

      {viewState === 'LOCKED' && (
        <PasswordGate onUnlock={handleUnlock} />
      )}

      {viewState === 'INTRO' && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}

      {viewState === 'MAIN' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Landing />

          <div id="valentine-week">
            <WeekIntro />
          </div>

          <div id="rose-day" className="min-h-screen relative">
            <RoseDay />
            {/* Day 2 Trigger - Visible at mid-right of the final screen */}
            <div className="absolute bottom-[20vh] md:bottom-[50vh] right-4 md:right-10 z-[60] translate-y-1/2">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ margin: "-100px", once: true }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                onClick={() => setViewState('DAY2')}
                className="group flex items-center gap-3 pl-6 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/90 hover:bg-white/10 hover:border-white/30 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_50px_rgba(225,29,72,0.5)]"
              >
                <span className="font-serif tracking-[0.2em] uppercase text-sm">Day 02</span>
                <div className="w-8 h-8 rounded-full bg-romantic-red flex items-center justify-center group-hover:bg-red-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {viewState === 'DAY2' && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute inset-0 z-50 bg-romantic-dark"
        >
          <ProposeDay onComplete={() => setViewState('DAY3')} />
        </motion.div>
      )}

      {viewState === 'DAY2_COMPLETE' && (
        // Deprecated state, flow moves to DAY3 now
        <></>
      )}

      {viewState === 'DAY3' && (
        <motion.div
          key="day3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-romantic-dark"
        >
          <ChocolateDay onComplete={() => setViewState('DAY4')} />
        </motion.div>
      )}

      {viewState === 'DAY4' && (
        <motion.div
          key="day4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-romantic-dark"
        >
          <TeddyDay onHideNav={setHideNav} onComplete={() => setViewState('DAY5')} />
        </motion.div>
      )}

      {viewState === 'DAY5' && (
        <motion.div
          key="day5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-romantic-dark"
        >
          <NextDayLock unlockDate="2026-02-11T00:00:00+05:30" />
        </motion.div>
      )}
    </main>
  );
}
