import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import HeartCursorTrail from "@/components/ui/HeartCursorTrail";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Valentine",
  description: "A surprise for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          playfair.variable,
          inter.variable,
          "antialiased bg-romantic-dark text-romantic-light font-sans"
        )}
      >
        <HeartCursorTrail />
        {/* Desktop View - Hidden on mobile */}
        <div className="hidden md:block min-h-screen">
          {children}
        </div>

        {/* Mobile View - Visible only on mobile */}
        <div className="md:hidden fixed inset-0 z-[9999] bg-romantic-dark flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <span className="text-2xl">💻</span>
          </div>
          <h1 className="text-3xl font-serif text-romantic-red font-bold">Hold on lazy bear...</h1>
          <p className="text-white/80 text-lg leading-relaxed font-light">
            This surprise is designed specially for a larger screen.
          </p>
          <p className="text-xl text-white font-medium animate-pulse pt-4">
            Please open this on your Laptop!
          </p>
          <div className="text-xs text-white/30 mt-12">
            (Trust me, you need the full screen for the magic ✨)
          </div>
        </div>
      </body>
    </html>
  );
}
