import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SECRET_CODE, CODE_HINT } from "../data";
import { FloatingHearts } from "../components/FloatingHearts";
import { Confetti } from "../components/Confetti";

const LEN = SECRET_CODE.length;

export function CodeEntry() {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleChange = (i: number, value: string) => {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    setError("");
    if (v && i < LEN - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) tryUnlock(next.join(""));
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < LEN - 1) {
      refs.current[i + 1]?.focus();
    } else if (e.key === "Enter") {
      tryUnlock(digits.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
    if (!text) return;
    e.preventDefault();
    const next = Array(LEN).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    const focusIdx = Math.min(text.length, LEN - 1);
    refs.current[focusIdx]?.focus();
    if (text.length === LEN) tryUnlock(text);
  };

  const tryUnlock = (code: string) => {
    if (code === SECRET_CODE) {
      setSuccess(true);
      setConfettiKey((k) => k + 1);
      sessionStorage.setItem("unlocked", "1");
      setTimeout(() => navigate("/memory/1"), 1400);
    } else {
      setError("Not quite — try again 💭");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => {
        setDigits(Array(LEN).fill(""));
        refs.current[0]?.focus();
      }, 600);
    }
  };

  return (
    <div className="page">
      <FloatingHearts />
      <Confetti trigger={confettiKey} count={90} />

      <motion.div
        className="code-card"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <motion.div
          style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}
          animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
        >
          🔐
        </motion.div>

        <h1 className="title-rainbow">A little secret for you</h1>
        <p className="hint">{CODE_HINT}</p>

        <div className={`code-inputs ${shake ? "shake" : ""}`}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              onPaste={handlePaste}
              disabled={success}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ color: "#b3528d", fontWeight: 600, fontSize: "1.2rem" }}
            >
              You got it 💖 opening...
            </motion.div>
          ) : (
            <motion.div
              key="err"
              className="error-msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error || " "}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
