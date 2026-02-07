"use client";

import { useEffect, useRef } from "react";

export default function CanvasConfetti() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        let w = window.innerWidth;
        let h = window.innerHeight;

        const resizeWindow = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeWindow, false);
        resizeWindow();

        const NUM_CONFETTI = 350;
        const COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
        const PI_2 = 2 * Math.PI;

        let xpos = 0.5;

        const handleMouseMove = (e: MouseEvent) => {
            xpos = e.pageX / w;
        };

        document.addEventListener('mousemove', handleMouseMove);

        const range = (a: number, b: number) => (b - a) * Math.random() + a;

        const drawCircle = (x: number, y: number, r: number, style: string) => {
            context.beginPath();
            context.arc(x, y, r, 0, PI_2, false);
            context.fillStyle = style;
            context.fill();
        };

        class Confetti {
            style: number[];
            rgb: string;
            r: number;
            r2: number;
            opacity: number = 0;
            dop: number = 0;
            x: number = 0;
            y: number = 0;
            xmax: number = 0;
            ymax: number = 0;
            vx: number = 0;
            vy: number = 0;

            constructor() {
                this.style = COLORS[~~range(0, 5)];
                this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
                this.r = ~~range(2, 6);
                this.r2 = 2 * this.r;
                this.replace();
            }

            replace() {
                this.opacity = 0;
                this.dop = 0.03 * range(1, 4);
                this.x = range(-this.r2, w - this.r2);
                this.y = range(-20, h - this.r2);
                this.xmax = w - this.r;
                this.ymax = h - this.r;
                this.vx = range(0, 2) + 8 * xpos - 5;
                this.vy = 0.7 * this.r + range(-1, 1);
            }

            draw() {
                this.x += this.vx;
                this.y += this.vy;
                this.opacity += this.dop;

                if (this.opacity > 1) {
                    this.opacity = 1;
                    this.dop *= -1;
                }

                if (this.opacity < 0 || this.y > this.ymax) {
                    this.replace();
                }

                if (!(this.x > 0 && this.x < this.xmax)) {
                    this.x = (this.x + this.xmax) % this.xmax;
                }

                drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
            }
        }

        const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

        let animationFrameId: number;

        const step = () => {
            animationFrameId = requestAnimationFrame(step);
            context.clearRect(0, 0, w, h);
            confetti.forEach(c => c.draw());
        };

        step();

        return () => {
            window.removeEventListener('resize', resizeWindow);
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 50 }}
        />
    );
}
