"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/sections/PasswordGate";
import Landing from "@/components/sections/Landing";
import WeekIntro from "@/components/sections/WeekIntro";
import RoseDay from "@/components/sections/RoseDay";
import NextDayLock from "@/components/sections/NextDayLock";
import IntroSequence from "@/components/sections/IntroSequence";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { motion } from "framer-motion"; // Added for motion.div

export default function Home() {
  // States: 'LOCKED' | 'INTRO' | 'MAIN'
  const [viewState, setViewState] = useState<'LOCKED' | 'INTRO' | 'MAIN'>('LOCKED');

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

  return (
    <main className="relative min-h-screen bg-romantic-dark text-romantic-light selection:bg-romantic-red/30">
      <MusicPlayer />

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

          <div id="rose-day" className="min-h-screen">
            <RoseDay />
          </div>

          <NextDayLock />
        </motion.div>
      )}
    </main>
  );
}
