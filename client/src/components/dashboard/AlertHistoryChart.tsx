"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import { connectMqtt } from "@/lib/mqttClient";
import { MqttClient } from "mqtt";

export function AlertHistoryChart() {
  const [alertData, setAlertData] = useState([
    { month: "Jan", alerts: 0 },
    { month: "Feb", alerts: 0 },
    { month: "Mar", alerts: 0 },
    { month: "Apr", alerts: 0 },
    { month: "May", alerts: 0 },
    { month: "Jun", alerts: 0 },
    { month: "Jul", alerts: 0 },
    { month: "Aug", alerts: 0 },
    { month: "Sep", alerts: 0 },
    { month: "Oct", alerts: 0 },
    { month: "Nov", alerts: 0 },
    { month: "Dec", alerts: 0 },
  ]);

  useEffect(() => {
    // ✅ Subscribe to MQTT topic for alert history
    const client: MqttClient = connectMqtt("swiftlet/alerts/history", (incoming) => {
      if (incoming.alerts && Array.isArray(incoming.alerts)) {
        setAlertData((prev) =>
          prev.map((item, index) => ({
            ...item,
            alerts: incoming.alerts[index] ?? 0,
          }))
        );
      }
    });

    // 🧪 Mock data for testing UI
    const test = setTimeout(() => {
      setAlertData([
        { month: "Jan", alerts: 2 },
        { month: "Feb", alerts: 5 },
        { month: "Mar", alerts: 3 },
        { month: "Apr", alerts: 8 },
        { month: "May", alerts: 4 },
        { month: "Jun", alerts: 7 },
        { month: "Jul", alerts: 1 },
        { month: "Aug", alerts: 3 },
        { month: "Sep", alerts: 9 },
        { month: "Oct", alerts: 6 },
        { month: "Nov", alerts: 2 },
        { month: "Dec", alerts: 4 },
      ]);
    }, 3000);

    return () => {
      clearTimeout(test);
      client.end();
    };
  }, []);

  const chartConfig = {
    alerts: {
      label: "Alerts",
      color: "#f97316",
    },
  };

  // 🧮 Total yearly alerts
  const totalAlerts = alertData.reduce((sum, m) => sum + m.alerts, 0);

  return (
    <div className="w-full mt-8">
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🚨 Alert History
          </CardTitle>
          <p className="text-sm text-gray-500">
            Monthly summary of alerts recorded from January to December.
          </p>
          <p className="text-sm text-orange-600 font-semibold mt-2">
            Total Alerts This Year: {totalAlerts}
          </p>
        </CardHeader>

        <CardContent>
          {/* ✅ FIXED: Wrap the chart with ChartContainer */}
          <ChartContainer config={chartConfig} className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={alertData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  className="text-xs"
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />

                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f91616ff" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#53533dff" stopOpacity={0.3} />
                  </linearGradient>
                </defs>

                <Bar
                  dataKey="alerts"
                  fill="url(#colorAlerts)"
                  radius={[6, 6, 0, 0]}
                  name="Alerts"
                  label={{
                    position: "top",
                    fill: "#444",
                    fontSize: 10,
                    formatter: (value: number) => (value > 0 ? value : ""),
                  }}
                  isAnimationActive={true}
                  animationDuration={800}
                />

                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}