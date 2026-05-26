import { useMemo } from "react";
import { motion } from "framer-motion";

type Props = {
  count?: number;
  emojis?: string[];
};

const DEFAULTS = ["💖", "💗", "💕", "🌸", "✨", "🎀", "💫"];

export function FloatingHearts({ count = 14, emojis = DEFAULTS }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        size: 1 + Math.random() * 1.4,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count, emojis]
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
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 15, -10, 0],
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
