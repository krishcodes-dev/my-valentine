"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function WeekIntro() {
    const handleScrollToRose = () => {
        document.getElementById("rose-day")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-2xl space-y-8"
            >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-romantic-pink">
                    The 7 Days of Us 🌹
                </h2>

                <div className="text-lg md:text-xl text-white/80 leading-relaxed font-light space-y-6">
                    <p>
                        Valentine’s isn’t just one day.<br />
                        It’s a whole week of <span className="text-romantic-red font-dancing text-2xl">choosing you.</span>
                    </p>
                    <p>
                        For the next seven days, this little corner of the internet will change—<br />
                        unlocking something new, every single day, just for you.
                    </p>
                    <p className="italic text-white/60 text-base">
                        Nothing to rush.<br />
                        Nothing to skip ahead.
                    </p>
                    <p>
                        Come back once a day,<br />
                        and let it unfold the way it’s meant to.
                    </p>
                    <p className="font-medium text-white pt-4">
                        Starting with the first one… 🌹
                    </p>
                </div>

                <motion.button
                    onClick={handleScrollToRose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-3 mx-auto"
                >
                    Hell yeahhh 💖 <ArrowDown className="w-4 h-4" />
                </motion.button>
            </motion.div>
        </section>
    );
}
