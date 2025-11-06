"use client";

import React from "react";

interface TemperatureBarProps {
  value: number | null;
}

export default function TemperatureBar({ value }: TemperatureBarProps) {
  const temp = value ?? 0;

  // Clamp between -10°C and 40°C
  const clamped = Math.min(Math.max(temp, -10), 40);
  const percent = ((clamped + 10) / 50) * 100; // -10 → 0%, 40 → 100%

  // Color logic
  let mercuryColor = "#3b82f6"; // blue (cold)
  if (temp >= 30) mercuryColor = "#ef4444"; // red (hot)
  else if (temp > 20) mercuryColor = "#16f980ff"; 

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Top temperature text */}
      <p
        className="text-3xl font-bold mb-2 transition-all duration-500"
        style={{ color: mercuryColor }}
      >
        {value !== null ? `${value.toFixed(1)}°C` : "—"}
      </p>

      {/* Thermometer */}
      <svg
        viewBox="0 0 100 250"
        width="100"
        height="200"
        className="transition-all duration-700 ease-in-out"
      >
        {/* Outline */}
        <path
          d="M50 20 
             a15 15 0 0 1 15 15 
             v130 
             a35 35 0 1 1 -70 0 
             v-130 
             a15 15 0 0 1 15 -15
             z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="6"
        />

        {/* Mercury fill */}
        <path
          d="M50 20 
             a15 15 0 0 1 15 15 
             v130 
             a35 35 0 1 1 -70 0 
             v-130 
             a15 15 0 0 1 15 -15
             z"
          fill={mercuryColor}
          style={{
            clipPath: `inset(${100 - percent}% 0 0 0)`,
            transition: "clip-path 1s ease-in-out, fill 0.5s ease-in-out",
          }}
        />

        {/* Glass reflection (shine) */}
        <path
          d="M45 25 
             a10 10 0 0 1 10 -10 
             v140 
             a25 25 0 1 1 -20 0 
             v-140 
             a10 10 0 0 1 10 -10
             z"
          fill="rgba(255,255,255,0.25)"
        />

        {/* Right-side tick marks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="70"
            y={40 + i * 25}
            width={i % 2 === 0 ? 10 : 6}
            height="3"
            fill="#0f172a"
            rx="1"
          />
        ))}
      </svg>

      {/* Status label */}
      <p className="mt-2 text-sm text-stone-500">
        {temp >= 30
          ? "🔥 High Temperature"
          : temp <= 20
          ? "❄️ Low Temperature"
          : "🌤️ Normal"}
      </p>
    </div>
  );
}
