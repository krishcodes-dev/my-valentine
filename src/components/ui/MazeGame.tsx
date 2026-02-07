"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flag } from "lucide-react";

interface MazeGameProps {
    difficulty: "easy" | "hard";
    onComplete: () => void;
}

// Simple recursive backtracking maze generator
const generateMaze = (width: number, height: number) => {
    const maze = Array(height).fill(null).map(() => Array(width).fill(1)); // 1 = wall, 0 = path
    const directions = [
        [0, -2], [0, 2], [-2, 0], [2, 0]
    ];

    // Choose random odd start point
    const startX = 1;
    const startY = 1;
    maze[startY][startX] = 0;

    const stack = [[startX, startY]];

    while (stack.length > 0) {
        const [cx, cy] = stack[stack.length - 1];

        // Find neighbors
        const neighbors = [];
        for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && maze[ny][nx] === 1) {
                neighbors.push([nx, ny, dx / 2, dy / 2]);
            }
        }

        if (neighbors.length > 0) {
            const [nx, ny, wx, wy] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[cy + wy][cx + wx] = 0; // Remove wall
            maze[ny][nx] = 0; // Mark neighbor
            stack.push([nx, ny]);
        } else {
            stack.pop();
        }
    }

    // Ensure end point is accessible and clear
    maze[height - 2][width - 2] = 0;

    return maze;
};

export default function MazeGame({ difficulty, onComplete }: MazeGameProps) {
    const [maze, setMaze] = useState<number[][]>([]);
    const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const size = difficulty === "easy" ? 15 : 25; // Must be odd numbers
    const width = size;
    const height = size;

    useEffect(() => {
        setMaze(generateMaze(width, height));
        setPlayerPos({ x: 1, y: 1 });
    }, [difficulty, width, height]);

    // Sound Cleanup Function
    const stopSound = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (maze.length === 0) return;

        let { x, y } = playerPos;
        if (e.key === "ArrowUp") y--;
        if (e.key === "ArrowDown") y++;
        if (e.key === "ArrowLeft") x--;
        if (e.key === "ArrowRight") x++;

        // Check collision
        if (maze[y] && maze[y][x] === 0) {
            setPlayerPos({ x, y });
            // Check win condition
            if (x === width - 2 && y === height - 2) {
                stopSound(); // Stop sound immediately
                onComplete();
            }
        }
    }, [maze, playerPos, width, height, onComplete, stopSound]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Calculate intensity based on distance to goal
    const intensity = useMemo(() => {
        const maxDist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        const currentDist = Math.sqrt(Math.pow((width - 2) - playerPos.x, 2) + Math.pow((height - 2) - playerPos.y, 2));
        // 0 (far) to 1 (close)
        return 1 - (currentDist / maxDist);
    }, [playerPos, width, height]);

    // Sound Effect - Ticking Clock
    useEffect(() => {
        // Create audio instance
        const audio = new Audio("/ticking.mp3");
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        const handleCanPlay = () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Audio playback interrupted/failed:", error);
                });
            }
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', (e) => console.error("Audio error:", e));

        // Backup try to play if already ready
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Ignore initial fail if waiting for canplaythrough
            });
        }

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlay);
            audio.pause();
            audio.currentTime = 0;
            audio.remove(); // Clean up
        };
    }, []);

    if (maze.length === 0) return <div>Generating maze...</div>;

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-white/60 text-sm flex items-center gap-2">
                Use Arrow Keys to move the <Heart className="w-3 h-3 text-romantic-red fill-romantic-red inline" />
            </p>

            {/* Glow pulsing based on proximity */}
            <motion.div
                className="relative bg-black/80 rounded-lg p-2 shadow-2xl"
                animate={{
                    boxShadow: `0 0 ${20 + intensity * 50}px ${5 + intensity * 10}px rgba(225, 29, 72, ${0.3 + intensity * 0.5})`,
                    borderColor: `rgba(225, 29, 72, ${0.5 + intensity * 0.5})`
                }}
                transition={{ duration: 0.5 }}
                style={{
                    width: "min(90vw, 500px)",
                    height: "min(90vw, 500px)",
                    display: "grid",
                    gridTemplateColumns: `repeat(${width}, 1fr)`,
                    gridTemplateRows: `repeat(${height}, 1fr)`,
                    borderWidth: "4px",
                    borderStyle: "solid"
                }}
            >
                {maze.map((row, y) =>
                    row.map((cell, x) => {
                        const isPlayer = playerPos.x === x && playerPos.y === y;
                        const isEnd = x === width - 2 && y === height - 2;
                        return (
                            <div
                                key={`${x}-${y}`}
                                className={`
                                w-full h-full
                                ${cell === 1 ? 'bg-zinc-900 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]' : 'bg-transparent'}
                                flex items-center justify-center relative rounded-sm
                            `}
                            >
                                {isPlayer && (
                                    <motion.div
                                        layoutId="playerRequest"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="z-10"
                                    >
                                        <Heart
                                            className="w-4 h-4 md:w-5 md:h-5 text-romantic-red fill-romantic-red drop-shadow-[0_0_8px_rgba(225,29,72,1)]"
                                        />
                                    </motion.div>
                                )}
                                {isEnd && (
                                    <Flag className="w-4 h-4 md:w-5 md:h-5 text-red-500 animate-bounce drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                                )}
                            </div>
                        );
                    })
                )}
            </motion.div>

            <p className="text-white/40 text-xs animate-pulse">
                {intensity > 0.85 ? "You're so close... ❤️" : "Keep going..."}
            </p>


        </div>
    );
}
