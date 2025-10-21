import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface MeterProps {
  value: number;       // Current temperature
  max: number;         // Maximum value for scale
  color?: string;      // Path color
  label?: string;      // Optional label below the meter
}

export function Meter({ value, max, color = "#f97316", label }: MeterProps) {
  const percentage = Math.min((value / max) * 100, 100); // cap at 100%

  return (
    <div className="w-24 h-24 mx-auto">
      <CircularProgressbar
        value={percentage}
        text={`${value}°C`}
        maxValue={100}
        styles={buildStyles({
          pathColor: color,
          textColor: "#111",
          trailColor: "#ddd",
          textSize: '16px',
        })}
      />
      {label && <p className="text-center text-xs mt-1">{label}</p>}
    </div>
  );
}
