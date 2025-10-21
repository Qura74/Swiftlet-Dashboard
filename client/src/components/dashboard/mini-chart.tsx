import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Dot } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  labels: string[];
  activeColor?: string;
  type?: "line" | "bar";   // optional
  lineColor?: string;
  pointColor?: string;
  showPoints?: boolean;
  yLabel?: string;
}

export function MiniChart({
  data,
  labels,
  activeColor = "#f97316",
  lineColor,
  pointColor,
  showPoints = true,
  yLabel
}: MiniChartProps) {
  const maxValue = Math.max(...data);
  const chartData = data.map((value, index) => ({
    label: labels[index],
    value,
    isMax: value === maxValue,
  }));

  return (
    <div className="mt-4">
      <div className="h-24 mb-2">
        {/* Chart rendering */}
      </div>
    </div>
  );
}
