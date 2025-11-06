"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { connectMqtt } from "@/lib/mqttClient";
import { MqttClient } from "mqtt";

export function StatsGrid() {
  const [systemData, setSystemData] = useState({
    totalSites: 2,
    activeSites: 2,
    activeAlerts: 1,
  });

  useEffect(() => {
    const client: MqttClient = connectMqtt("swiftlet/system/summary", (incoming) => {
      setSystemData({
        totalSites: incoming.totalSites ?? 0,
        activeSites: incoming.activeSites ?? 0,
        activeAlerts: incoming.activeAlerts ?? 0,
      });
    });

    return () => {
      client.end();
    };
  }, []);

  const overviewStats = [
    {
      title: "Total Sites",
      description: "Total monitored Swiftlet sites",
      value: systemData.totalSites,
    },
    {
      title: "Active Sites",
      description: "Currently online and reporting",
      value: systemData.activeSites,
    },
    {
      title: "Active Alerts",
      description: "Sites with ongoing alerts",
      value: systemData.activeAlerts,
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3 mb-8">
      {overviewStats.map((stat, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
          <Card className="bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              {/* Title */}
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">
                {stat.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                {stat.description}
              </p>

              {/* Value */}
              <div className="text-3xl font-bold text-stone-900 dark:text-white">
                {stat.value}
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                Updated live
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
