import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ff6bcb", "#ffa07a", "#ffd166", "#6bcf7f", "#6bb6ff", "#b66bff"];

type Props = {
  trigger?: number; // change value to re-fire
  count?: number;
};

export function Confetti({ trigger = 0, count = 60 }: Props) {
  const [key, setKey] = useState(trigger);
  useEffect(() => setKey(trigger), [trigger]);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 10,
        delay: Math.random() * 0.3,
        spin: (Math.random() - 0.5) * 720,
        dx: (Math.random() - 0.5) * 300,
      })),
    [count, key]
  );

  if (!trigger) return null;

  return (
    <div
      key={key}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            background: p.color,
            borderRadius: "2px",
          }}
          initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
            x: p.dx,
            rotate: p.spin,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.2 + Math.random() * 1,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
