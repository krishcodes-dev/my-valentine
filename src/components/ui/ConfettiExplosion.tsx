"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ConfettiExplosion() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // Container loaded
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: 100 // Ensure it's on top 
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 0 // Start with 0, emitter will spawn them
                    },
                    color: {
                        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
                    },
                    shape: {
                        type: ["circle", "square", "polygon"],
                        options: {
                            polygon: {
                                sides: 6
                            }
                        }
                    },
                    opacity: {
                        value: { min: 0, max: 1 },
                        animation: {
                            enable: true,
                            speed: 1,
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    size: {
                        value: { min: 3, max: 7 }
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 7
                        },
                        count: 1
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: true
                        },
                        drift: {
                            min: -2,
                            max: 2
                        },
                        speed: { min: 10, max: 30 },
                        decay: 0.1,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "destroy",
                            top: "none"
                        }
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360
                        },
                        direction: "random",
                        move: true,
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        move: true,
                        value: {
                            min: 0,
                            max: 360
                        },
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    roll: {
                        darken: {
                            enable: true,
                            value: 25
                        },
                        enable: true,
                        speed: {
                            min: 15,
                            max: 25
                        }
                    },
                    wobble: {
                        distance: 30,
                        enable: true,
                        move: true,
                        speed: {
                            min: -15,
                            max: 15
                        }
                    }
                },
                detectRetina: true,
                emitters: {
                    direction: "none",
                    spawnColor: {
                        value: "#ff0000",
                        animation: {
                            h: {
                                enable: true,
                                offset: {
                                    min: -1.4,
                                    max: 1.4
                                },
                                speed: 0.1,
                                sync: false
                            },
                            l: {
                                enable: true,
                                offset: {
                                    min: 20,
                                    max: 80
                                },
                                speed: 0,
                                sync: false
                            }
                        }
                    },
                    life: {
                        count: 0, // Infinite bursts
                        duration: 0.1,
                        delay: 0.1
                    },
                    rate: {
                        delay: 0.1,
                        quantity: 50 // Continuous stream
                    },
                    size: {
                        width: 0,
                        height: 0
                    },
                    position: {
                        x: 50, // Center X
                        y: 50  // Center Y
                    }
                }
            }}
        />
    );
}
