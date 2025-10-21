import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Meter } from "./Meter";
import { connectMqtt } from "@/lib/mqttClient";
import mqtt, { MqttClient } from "mqtt";
import { statsData as defaultStats } from "@/lib/data";

export function StatsGrid() {
  const [mqttData, setMqttData] = useState({
    temp: 0,
    hum: 0,
    lux: 0,
  });

  useEffect(() => {
    const client: mqtt.MqttClient = connectMqtt((incoming) => {
      setMqttData({
        temp: incoming.temp,
        hum: incoming.hum,
        lux: incoming.lux,
      });
    });

    // TS now knows this returns void
    return () => {
      client.end();
    };
  }, []);

  const dynamicStats = [
    {
      title: "Temperature",
      description: "Live temperature data",
      latestTemp: mqttData.temp,
      color: mqttData.temp >= 30 ? "#ef4444" : "#10b981",
    },
    {
      title: "Humidity",
      description: "Live humidity level",
      latestTemp: mqttData.hum,
      color: "#3b82f6",
    },
    {
      title: "Light Intensity",
      description: "Live light sensor value",
      latestTemp: mqttData.lux,
      color: "#facc15",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3 mb-8">
      {dynamicStats.map((stat, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
          <Card className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 h-full">
            <CardContent className="p-6 flex flex-col h-full">
              {/* Header */}
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">
                  {stat.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {stat.description}
                </p>
              </div>

              {/* Meter */}
              <div className="flex-1 mb-4">
                <Meter
                  value={stat.latestTemp}
                  max={stat.title === "Light Intensity" ? 1000 : 100}
                  color={stat.color}
                  label={stat.title}
                />
              </div>

              {/* Latest Value */}
              <div className="flex items-center text-xs text-stone-500 dark:text-stone-400">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    stat.latestTemp >= 30
                      ? "bg-red-500 dark:bg-red-400"
                      : "bg-green-500 dark:bg-green-400"
                  }`}
                />
                Latest: {stat.latestTemp} | updated live
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
