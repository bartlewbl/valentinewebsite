import { useParams, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { memories, quiz } from "../data";
import { PageFx } from "../components/PageFx";

const TOTAL = memories.length;

export function MemoryPage() {
  const { n } = useParams();
  const navigate = useNavigate();
  const idx = Number(n) - 1;

  if (isNaN(idx) || idx < 0 || idx >= TOTAL) {
    return <Navigate to="/memory/1" replace />;
  }

  if (sessionStorage.getItem("unlocked") !== "1") {
    return <Navigate to="/" replace />;
  }

  const mem = memories[idx];
  const isLast = idx === TOTAL - 1;
  const next = () =>
    isLast ? navigate("/appreciation/1") : navigate(`/memory/${idx + 2}`);
  const prev = () =>
    idx === 0 ? navigate(`/quiz/${quiz.length}`) : navigate(`/memory/${idx}`);

  return (
    <div className="page">
      <PageFx flavor={mem.flavor} />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="memory-card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
        >
          <motion.div
            className="memory-photo"
            initial={{ rotate: -2 }}
            animate={{ rotate: [-2, 2, -1, 1, 0] }}
            transition={{ duration: 1.4 }}
          >
            {mem.photo ? (
              <img src={mem.photo} alt={mem.title} />
            ) : (
              <span>📸 drop a photo at /public{`/photos/${idx + 1}.jpg`}</span>
            )}
          </motion.div>

          <motion.div
            className="memory-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Memory #{idx + 1} · {mem.date}
          </motion.div>

          <motion.h2
            className="memory-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {mem.title}
          </motion.h2>

          <motion.p
            className="memory-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {mem.caption}
          </motion.p>

          <div className="page-nav">
            <button className="btn-ghost" onClick={prev}>
              ← back
            </button>
            <button className="btn-cta" onClick={next}>
              {isLast ? "what I love about you →" : "next memory →"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="progress-dots">
        {memories.map((_, i) => (
          <div key={i} className={`dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
