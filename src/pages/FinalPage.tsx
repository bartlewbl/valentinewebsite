import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FloatingHearts } from "../components/FloatingHearts";
import { Confetti } from "../components/Confetti";
import { YOUR_NAME } from "../data";

export function FinalPage() {
  const [burst, setBurst] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setBurst(1);
    const t = setInterval(() => setBurst((b) => b + 1), 4500);
    return () => clearInterval(t);
  }, []);

  if (sessionStorage.getItem("unlocked") !== "1") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page">
      <FloatingHearts count={18} />
      <Confetti trigger={burst} count={70} />

      <div className="final-page">
        <motion.div
          className="big-heart"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ display: "inline-block" }}
          >
            💖
          </motion.span>
        </motion.div>

        <motion.h1
          className="title-rainbow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          I love you. So much.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          More than yesterday.
          <br />
          Less than tomorrow.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Thank you for being you,
          <br />
          and for letting me be a part of your life.
        </motion.p>

        <motion.div
          className="signature"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          — {YOUR_NAME}
        </motion.div>

        <motion.div
          className="page-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button
            className="btn-ghost"
            onClick={() => navigate("/appreciation/2")}
          >
            ← back
          </button>
          <button
            className="btn-cta"
            onClick={() => {
              sessionStorage.removeItem("unlocked");
              navigate("/");
            }}
          >
            start over 💌
          </button>
        </motion.div>
      </div>
    </div>
  );
}
