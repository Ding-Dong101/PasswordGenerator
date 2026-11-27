import React from "react";

const LEVEL_CLASSES = {
  1: "level-1",
  2: "level-2",
  3: "level-3",
  4: "level-4",
};

export default function StrengthTestBox({ score = 0, label = "" }) {
  const levelClass = LEVEL_CLASSES[score] || "";

  return (
    <div className="strengthBox">
      <h4>STRENGTH</h4>
      <div className="colors">
        <h3>{label || "—"}</h3>
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`color ${bar <= score ? levelClass : "empty"}`}
          />
        ))}
      </div>
    </div>
  );
}
