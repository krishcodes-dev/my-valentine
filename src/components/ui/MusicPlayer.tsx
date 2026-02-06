"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
            <audio
                ref={audioRef}
                src="/music.mp3"
                loop
            />

            {/* "Play Me" Arrows - Only show when NOT playing */}
            {!isPlaying && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1"
                >
                    <span className="text-white/60 text-xs font-light mr-2 hidden md:block">Play me</span>
                    {/* Arrows pointing right towards the button */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ x: [0, 5, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        >
                            <span className="text-romantic-pink text-lg">›</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-romantic-pink hover:bg-white/20 transition-colors shadow-lg"
            >
                {isPlaying ? (
                    <Volume2 className="w-6 h-6 animate-pulse" />
                ) : (
                    <Music className="w-6 h-6" />
                )}
            </motion.button>
        </div>
    );
}
