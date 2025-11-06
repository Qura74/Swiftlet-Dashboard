"use client";

import React from "react";

interface LuxGaugeProps {
  value: number | null;
}

export default function LuxGauge({ value }: LuxGaugeProps) {
  const lux = value ?? 0;
  const brightness = Math.min(Math.max(lux / 1000, 0), 1); // normalize 0–1000 lx

  const color = `rgba(255, 223, 0, ${brightness})`; // glowing yellow based on brightness

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Light bulb */}
      <svg
  viewBox="0 0 64 64"
  width="80"
  height="80"
  className="drop-shadow-lg transition-all duration-1000 ease-in-out"
>
  {/* Bulb outline */}
  <path
    d="M32 2 C50 2, 58 18, 46 32 C42 37, 42 44, 42 50 L22 50 C22 44, 22 37, 18 32 C6 18, 14 2, 32 2 Z"
    fill={color}
    stroke="#a16207"
    strokeWidth="2"
    style={{
      transition: "fill 1s ease-in-out",
    }}
  />
  {/* Bulb base */}
  <rect x="24" y="50" width="16" height="8" fill="#78716c" rx="2" />
  <rect x="24" y="58" width="16" height="4" fill="#44403c" rx="2" />
</svg>


      {/* Value */}
      <p className="text-2xl font-semibold mt-2" style={{ color: "#a16207" }}>
        {value !== null ? `${value.toFixed(0)} lx` : "—"}
      </p>
      <p className="text-sm text-stone-500">Light (Lux)</p>
    </div>
  );
}
