"use client";

import { useRef, useEffect } from "react";

export default function RetroGridRun() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const c = canvas.getContext('2d');
        if (!c) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Grid Objects
        const HorizontalArray: any[] = [];
        const VerticalArray: any[] = [];

        // Horizon line
        const horizonY = canvas.height / 2;

        // Gradient for Vertical lines
        let grad: CanvasGradient;

        function updateGradient() {
            // Re-create gradient on resize or init
            grad = c!.createLinearGradient(0, canvas.height, 0, horizonY);
            // Purple-magenta at bottom, fading to transparent at horizon
            grad.addColorStop(0, "rgba(236, 72, 153, 0.8)"); // Pink/Magenta
            grad.addColorStop(0.5, "rgba(168, 85, 247, 0.4)"); // Purple
            grad.addColorStop(1, "rgba(0, 0, 0, 0)"); // Transparent
        }
        updateGradient();

        class Horizontal {
            y: number;
            dy: number;
            opacity: number;

            constructor(y: number) {
                this.y = y;
                this.dy = 0.5; // Start slow
                this.opacity = 0;
            }

            draw() {
                if (!c) return;
                c.beginPath();
                c.lineWidth = 2;
                // Fade in as it gets closer
                c.strokeStyle = `rgba(236, 72, 153, ${this.opacity})`;
                c.moveTo(0, this.y);
                c.lineTo(canvas!.width, this.y);
                c.stroke();
            }

            update() {
                if (!c) return;
                // Accelerate as it moves down (perspective effect)
                this.dy += 0.05;
                this.y += this.dy;

                // Increase opacity as it approaches bottom, up to a limit
                if (this.opacity < 0.8) {
                    this.opacity += 0.02;
                }

                this.draw();
            }
        }

        class Vertical {
            x: number;
            constructor(x: number) {
                this.x = x;
            }

            draw() {
                if (!c) return;
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = grad;
                // All vertical lines converge to center of horizon
                c.moveTo(canvas!.width / 2, horizonY);
                // And spread out downwards
                // We use a simple perspectivefanning out
                // Actually, the provided snippet logic was slightly simpler:
                // c.moveTo(canvas.width / 2, 200); -> converging point
                // c.lineTo(this.x, canvas.height); -> bottom point

                c.moveTo(canvas!.width / 2, horizonY);
                c.lineTo(this.x, canvas!.height);
                c.stroke();
            }

            update() {
                this.draw();
            }
        }

        // Initialize Vertical Lines
        // Create lines spanning wider than screen to cover perspective
        const initVerticals = () => {
            VerticalArray.length = 0;
            const interval = canvas.width / 15;
            let cross = -canvas.width; // Start far left
            const limit = canvas.width * 2; // End far right

            while (cross < limit) {
                VerticalArray.push(new Vertical(cross));
                cross += interval;
            }
        };
        initVerticals();

        // Spawn Horizontal lines loop
        const spawnInterval = setInterval(() => {
            HorizontalArray.push(new Horizontal(horizonY));
        }, 200);

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Clear with slight trail or just clear
            c.clearRect(0, 0, canvas.width, canvas.height);

            // Update Grid
            // We need to re-create gradient to match canvas size if updated? 
            // Actually strictly speaking yes, but for now single init is ok unless resized.

            for (let i = 0; i < VerticalArray.length; i++) {
                VerticalArray[i].update();
            }

            for (let i = 0; i < HorizontalArray.length; i++) {
                HorizontalArray[i].update();
                // Remove if off screen
                if (HorizontalArray[i].y >= canvas.height) {
                    HorizontalArray.splice(i, 1);
                    i--;
                }
            }

            // Optional: Horizon Glow
            c.shadowBlur = 20;
            c.shadowColor = "#d946ef";
            c.fillStyle = "rgba(0,0,0,1)";
            // Mask top half (sky)
            c.fillRect(0, 0, canvas.width, horizonY);
            c.shadowBlur = 0;
        }

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            clearInterval(spawnInterval);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block bg-black"
        />
    );
}
