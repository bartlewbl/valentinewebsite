import { useParams, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { appreciations1, appreciations2 } from "../data";
import { FloatingHearts } from "../components/FloatingHearts";

const PAGES = [appreciations1, appreciations2];

export function AppreciationPage() {
  const { n } = useParams();
  const navigate = useNavigate();
  const idx = Number(n) - 1;

  if (isNaN(idx) || idx < 0 || idx >= PAGES.length) {
    return <Navigate to="/appreciation/1" replace />;
  }
  if (sessionStorage.getItem("unlocked") !== "1") {
    return <Navigate to="/" replace />;
  }

  const list = PAGES[idx];
  const isLast = idx === PAGES.length - 1;
  const next = () =>
    isLast ? navigate("/final") : navigate(`/appreciation/${idx + 2}`);
  const prev = () =>
    idx === 0
      ? navigate("/memory/7")
      : navigate(`/appreciation/${idx}`);

  return (
    <div className="page">
      <FloatingHearts count={10} />
      <div className="appreciation-page">
        <motion.h1
          className="title-rainbow"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {idx === 0 ? "Things I love about you" : "...and even more"}
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          part {idx + 1} of {PAGES.length}
        </motion.p>

        <ul className="appreciation-list">
          {list.map((item, i) => (
            <motion.li
              key={i}
              className="appreciation-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.15 + i * 0.08,
                type: "spring",
                stiffness: 140,
                damping: 16,
              }}
              whileHover={{ scale: 1.03, rotate: -0.5 }}
            >
              <motion.span
                className="emoji"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {item.emoji}
              </motion.span>
              <span>{item.text}</span>
            </motion.li>
          ))}
        </ul>

        <div className="page-nav">
          <button className="btn-ghost" onClick={prev}>
            ← back
          </button>
          <button className="btn-cta" onClick={next}>
            {isLast ? "one last thing →" : "more reasons →"}
          </button>
        </div>
      </div>
    </div>
  );
}
