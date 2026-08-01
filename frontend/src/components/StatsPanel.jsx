import React, { useEffect, useState } from "react";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StatsPanel({ total, completed, remaining }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPercent(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  const offset = CIRCUMFERENCE - (animatedPercent / 100) * CIRCUMFERENCE;

  return (
    <section className="stats" aria-label="Task statistics">
      <div className="stats__ring" role="img" aria-label={`${percent} percent complete`}>
        <svg viewBox="0 0 96 96" width="96" height="96">
          <circle cx="48" cy="48" r={RADIUS} className="stats__ring-track" />
          <circle
            cx="48"
            cy="48"
            r={RADIUS}
            className="stats__ring-progress"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="stats__ring-label">
          <span className="stats__ring-value">{percent}%</span>
          <span className="stats__ring-caption">graded</span>
        </div>
      </div>

      <div className="stats__figures">
        <Figure label="Total" value={total} />
        <Figure label="Completed" value={completed} accent="mint" />
        <Figure label="Remaining" value={remaining} accent="coral" />
      </div>
    </section>
  );
}

function Figure({ label, value, accent }) {
  return (
    <div className={`stats__figure${accent ? ` stats__figure--${accent}` : ""}`}>
      <span className="stats__figure-value">{value}</span>
      <span className="stats__figure-label">{label}</span>
    </div>
  );
}
