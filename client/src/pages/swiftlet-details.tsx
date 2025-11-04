"use client";
import TemperatureBar from "@/components/dashboard/TemperatureBar";
import HumidityGauge from "@/components/dashboard/HumidityGauge";
import LuxGauge from "@/components/dashboard/LuxGauge";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { connectMqtt } from "@/lib/mqttClient";
import { useLocation } from "react-router-dom";
import { MqttClient } from "mqtt";

export default function SwiftletDetails() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const site = params.get("name") || "Sabah Swiftlet Farm";

  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lux, setLux] = useState<number | null>(null);
  const [birdCount, setBirdCount] = useState<number | null>(null);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    //  Explicit topic mapping for each known site
    const topicMap: Record<string, string> = {
      Rogon: "swiftlet/q",        // Bird counter or Rogon site
      Petagas: "swiftlet/env",    // Environment node
      "Le Meridien": "swiftlet/q" // Adjust if Le Meridien uses env instead
    };

    //  Determine topic based on site name
    const topic = topicMap[site] || "swiftlet/env";

    // 🖥️ Log info to console for clarity
    console.log("======================================");
    console.log(` Site Selected: ${site}`);
    console.log(` Subscribing to MQTT Topic: ${topic}`);
    console.log("======================================");

    //  Connect to MQTT broker and handle incoming data
    const mqttClient = connectMqtt(topic, (payload) => {
      console.log(` [${site}] New data from ${topic}:`, payload);

      if (payload.temp !== undefined) setTemperature(payload.temp);
      if (payload.hum !== undefined) setHumidity(payload.hum);
      if (payload.lux !== undefined) setLux(payload.lux);
      if (payload.birdCount !== undefined) setBirdCount(payload.birdCount);
    });

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      setConnected(true);
      console.log(` [${site}] Connected to broker`);
    });

    mqttClient.on("close", () => {
      setConnected(false);
      console.warn(` [${site}] Disconnected from broker`);
    });

    return () => {
      console.log(` [${site}] Closing MQTT connection`);
      mqttClient.end();
    };
  }, [site]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🐦 {site}</h1>
      <p className="text-stone-500 mb-4">
        Live monitoring data from your Swiftlet environment.
      </p>

      {/* Live Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <h2 className="font-semibold text-stone-700"> Temperature</h2>
          <p className="text-2xl mt-1">
            {temperature !== null ? `${temperature.toFixed(1)}°C` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700"> Humidity</h2>
          <p className="text-2xl mt-1">
            {humidity !== null ? `${humidity.toFixed(1)}%` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700"> Light (Lux)</h2>
          <p className="text-2xl mt-1">
            {lux !== null ? `${lux.toFixed(0)} lx` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700"> Bird Count</h2>
          <p className="text-2xl mt-1">
            {birdCount !== null ? `${birdCount}` : "—"}
          </p>
        </Card>
      </div>

      {/* Relay Controls */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Relay Controls</h2>
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => client?.publish("swiftlet/relay/cmd", "ON")}
            className="bg-green-600 hover:bg-green-700"
          >
            Fan ON
          </Button>
          <Button
            onClick={() => client?.publish("swiftlet/relay/cmd", "OFF")}
            className="bg-red-600 hover:bg-red-700"
          >
            Fan OFF
          </Button>
          <Button
            onClick={() => client?.publish("swiftlet/relay/cmd", "ON")}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Light ON
          </Button>
          <Button
            onClick={() => client?.publish("swiftlet/relay/cmd", "OFF")}
            className="bg-gray-600 hover:bg-gray-700"
          >
            Light OFF
          </Button>
        </div>
      </div>

      {/* MQTT Status */}
      <div className="pt-4 text-sm text-stone-500">
        MQTT Connection:{" "}
        <span className={connected ? "text-green-600" : "text-red-600"}>
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>
    </div>
  );
}