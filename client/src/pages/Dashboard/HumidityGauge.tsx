"use client";

import React from "react";

interface HumidityGaugeProps {
  value: number | null;
}

export default function HumidityGauge({ value }: HumidityGaugeProps) {
  const humidity = value ?? 0;
  const fill = Math.min(Math.max(humidity, 0), 100);

  // Determine color based on humidity
  let color = "#3b82f6"; // blue (normal)
  if (humidity > 80) color = "#2563eb"; // darker blue (very humid)
  else if (humidity < 40) color = "#60a5fa"; // lighter blue (dry)

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Droplet shape */}
      <svg viewBox="0 0 64 64" width="80" height="80" className="drop-shadow-md">
        <defs>
          <clipPath id="droplet-clip">
            <path d="M32 2 C45 20, 58 35, 32 62 C6 35, 19 20, 32 2 Z" />
          </clipPath>
        </defs>

        {/* Outline */}
        <path
          d="M32 2 C45 20, 58 35, 32 62 C6 35, 19 20, 32 2 Z"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Fill */}
        <rect
            x="0"
            y={64 - (fill / 100) * 64}
            width="64"
            height={(fill / 100) * 64}
            fill={color}
            clipPath="url(#droplet-clip)"
            style={{
              transition: "all 1s ease-in-out",
            }}
          />

      </svg>

      {/* Value */}
      <p
  className="text-2xl font-semibold mt-2 transition-all duration-700"
  style={{ color }}
>
  {value !== null ? `${value.toFixed(1)}%` : "—"}
</p>

      <p className="text-sm text-stone-500">Humidity</p>
    </div>
  );
}
