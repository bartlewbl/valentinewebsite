import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { quiz } from "../data";
import { FloatingHearts } from "../components/FloatingHearts";
import { Confetti } from "../components/Confetti";

const TOTAL = quiz.length;

export function QuizPage() {
  const { n } = useParams();
  const navigate = useNavigate();
  const idx = Number(n) - 1;

  const [picked, setPicked] = useState<number | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [revealedWave, setRevealedWave] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    setPicked(null);
    setSelected(new Set());
    setSubmitted(false);
    setRevealedWave(0);
    setShowTeaser(false);
  }, [idx]);

  if (isNaN(idx) || idx < 0 || idx >= TOTAL) {
    return <Navigate to="/quiz/1" replace />;
  }
  if (sessionStorage.getItem("unlocked") !== "1") {
    return <Navigate to="/" replace />;
  }

  const q = quiz[idx];
  const isLast = idx === TOTAL - 1;
  const isMulti = Array.isArray(q.correctIndexes);
  const hasWaves = isMulti && Array.isArray(q.waves) && q.waves!.length > 0;

  // Indexes currently visible (all of them if no waves, else flattened revealed waves)
  const revealedIndexes: number[] = hasWaves
    ? q.waves!.slice(0, revealedWave + 1).flat()
    : isMulti
    ? q.options.map((_, i) => i)
    : [];

  const currentWaveIndexes: number[] = hasWaves
    ? q.waves![revealedWave]
    : revealedIndexes;

  const allCurrentSelected =
    hasWaves &&
    currentWaveIndexes.every((i) => selected.has(i));

  // Auto-reveal next wave when all currently visible items are selected
  useEffect(() => {
    if (!hasWaves) return;
    if (!allCurrentSelected) return;
    if (revealedWave >= q.waves!.length - 1) return;
    const t = setTimeout(() => {
      setShowTeaser(true);
      setRevealedWave((w) => w + 1);
      setTimeout(() => setShowTeaser(false), 1800);
    }, 550);
    return () => clearTimeout(t);
  }, [selected, revealedWave, hasWaves, allCurrentSelected, q.waves]);

  const singleCorrect = !isMulti && picked !== null && picked === q.correctIndex;
  const multiCorrect = (() => {
    if (!isMulti) return false;
    if (hasWaves) {
      // For waved multi-select, succeed when all options across all waves are selected.
      const need = new Set(q.correctIndexes!);
      if (revealedWave < q.waves!.length - 1) return false;
      for (const i of need) if (!selected.has(i)) return false;
      return true;
    }
    if (!submitted) return false;
    const need = new Set(q.correctIndexes!);
    if (need.size !== selected.size) return false;
    for (const i of need) if (!selected.has(i)) return false;
    return true;
  })();
  const isCorrect = singleCorrect || multiCorrect;

  // Trigger confetti when waved multi becomes fully correct
  useEffect(() => {
    if (multiCorrect && hasWaves) {
      setConfettiKey((k) => k + 1);
    }
  }, [multiCorrect, hasWaves]);

  const handlePickSingle = (i: number) => {
    if (singleCorrect) return;
    setPicked(i);
    if (i === q.correctIndex) setConfettiKey((k) => k + 1);
  };

  const toggleMulti = (i: number) => {
    if (multiCorrect) return;
    if (hasWaves && !revealedIndexes.includes(i)) return;
    setSubmitted(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const submitMulti = () => {
    setSubmitted(true);
    const need = new Set(q.correctIndexes!);
    const ok =
      need.size === selected.size && [...need].every((i) => selected.has(i));
    if (ok) setConfettiKey((k) => k + 1);
  };

  const next = () => {
    if (isLast) navigate("/memory/1");
    else navigate(`/quiz/${idx + 2}`);
  };

  const prev = () => {
    if (idx === 0) navigate("/");
    else navigate(`/quiz/${idx}`);
  };

  const optionClass = (i: number) => {
    if (isMulti) {
      const isSelected = selected.has(i);
      const isAnswer = q.correctIndexes!.includes(i);
      if (multiCorrect) return "quiz-option correct";
      if (!hasWaves && submitted && isSelected && !isAnswer)
        return "quiz-option wrong";
      if (!hasWaves && submitted && !isSelected && isAnswer)
        return "quiz-option missed";
      return "quiz-option" + (isSelected ? " selected" : "");
    }
    const isPicked = picked === i;
    const showAsCorrect = picked !== null && i === q.correctIndex;
    const showAsWrong = isPicked && i !== q.correctIndex;
    return (
      "quiz-option" +
      (showAsCorrect ? " correct" : "") +
      (showAsWrong ? " wrong" : "")
    );
  };

  const feedback = () => {
    if (isMulti) {
      if (hasWaves) {
        if (multiCorrect) return q.reaction;
        if (showTeaser) return q.waveTeaser ?? "...there's more 😘";
        return null;
      }
      if (!submitted) return null;
      return multiCorrect ? q.reaction : q.nudge ?? "Try again 💭";
    }
    if (picked === null) return null;
    return singleCorrect ? q.reaction : q.nudge ?? "Try again 💭";
  };

  const visibleOptions = q.options
    .map((opt, i) => ({ opt, i }))
    .filter(({ i }) => (hasWaves ? revealedIndexes.includes(i) : true));

  return (
    <div className="page">
      <FloatingHearts count={10} />
      <Confetti trigger={confettiKey} count={hasWaves && multiCorrect ? 110 : 60} />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="quiz-card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
        >
          <div className="quiz-meta">
            Question {idx + 1} of {TOTAL}
            {isMulti && " · pick all that apply"}
          </div>

          <motion.div
            className="quiz-emoji"
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
          >
            {q.emoji ?? "💭"}
          </motion.div>

          <h2 className="quiz-prompt">{q.prompt}</h2>

          <div className="quiz-options">
            <AnimatePresence initial={false}>
              {visibleOptions.map(({ opt, i }, displayIdx) => (
                <motion.button
                  key={i}
                  layout
                  className={optionClass(i)}
                  onClick={() =>
                    isMulti ? toggleMulti(i) : handlePickSingle(i)
                  }
                  initial={{ opacity: 0, x: -16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    delay:
                      hasWaves && i >= (q.waves![revealedWave]?.[0] ?? 0)
                        ? 0.05 * displayIdx
                        : 0.05 + displayIdx * 0.04,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isCorrect}
                >
                  <span className="quiz-bullet">
                    {isMulti
                      ? selected.has(i)
                        ? "✓"
                        : ""
                      : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {isMulti && !hasWaves && !multiCorrect && (
            <button
              className="btn-cta"
              onClick={submitMulti}
              disabled={selected.size === 0}
              style={{
                marginBottom: "0.6rem",
                opacity: selected.size === 0 ? 0.5 : 1,
                cursor: selected.size === 0 ? "not-allowed" : "pointer",
              }}
            >
              check my picks ✨
            </button>
          )}

          <AnimatePresence mode="wait">
            {feedback() && (
              <motion.div
                key={
                  multiCorrect
                    ? "ok"
                    : showTeaser
                    ? "teaser-" + revealedWave
                    : "no"
                }
                className={`quiz-feedback ${
                  isCorrect ? "ok" : showTeaser ? "teaser" : "no"
                }`}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {feedback()}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="page-nav">
            <button className="btn-ghost" onClick={prev}>
              ← back
            </button>
            <button
              className="btn-cta"
              onClick={next}
              disabled={!isCorrect}
              style={{
                opacity: isCorrect ? 1 : 0.4,
                cursor: isCorrect ? "pointer" : "not-allowed",
              }}
            >
              {isLast ? "to our memories →" : "next question →"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="progress-dots">
        {quiz.map((_, i) => (
          <div key={i} className={`dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
