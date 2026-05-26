import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Memory } from "../data";

const PRESETS: Record<Memory["flavor"], { emojis: string[]; count: number }> = {
  confetti: { emojis: ["🎉", "🎊", "✨", "💖"], count: 18 },
  hearts: { emojis: ["💖", "💗", "💕", "💘", "💝"], count: 18 },
  bubbles: { emojis: ["🫧", "💧", "💙", "🪩"], count: 14 },
  stars: { emojis: ["⭐", "✨", "🌟", "💫"], count: 18 },
  sparkles: { emojis: ["✨", "🌟", "💫", "⚡"], count: 22 },
  balloons: { emojis: ["🎈", "🎀", "🌈"], count: 12 },
  rainbow: { emojis: ["🌈", "🦄", "✨", "💖", "🎀"], count: 22 },
};

export function PageFx({ flavor }: { flavor: Memory["flavor"] }) {
  const preset = PRESETS[flavor];
  const items = useMemo(
    () =>
      Array.from({ length: preset.count }, (_, i) => ({
        id: i,
        emoji: preset.emojis[i % preset.emojis.length],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 7 + Math.random() * 8,
        size: 1.2 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 120,
      })),
    [flavor]
  );

  return (
    <div className="floating-hearts" aria-hidden>
      {items.map((it) => (
        <motion.span
          key={it.id}
          className="heart"
          style={{
            left: `${it.left}%`,
            bottom: "-40px",
            fontSize: `${it.size}rem`,
          }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: -1.2 * (typeof window !== "undefined" ? window.innerHeight : 800),
            x: it.drift,
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 20, -15, 0],
          }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {it.emoji}
        </motion.span>
      ))}
    </div>
  );
}
