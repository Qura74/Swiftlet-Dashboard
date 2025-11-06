"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export default function SwiftletDetails() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const site = params.get("name") || "Sabah Swiftlet Farm";

  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lux, setLux] = useState<number | null>(null);
  const [birdCount, setBirdCount] = useState<number | null>(null);
  const [relayState, setRelayState] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // 🌐 Base API URL — adjust if backend hosted elsewhere
  const API_BASE = "http://localhost:5000/api";

  // Fetch environment + bird + relay data
  const fetchData = async () => {
    try {
      setLoading(true);

      const [envRes, birdRes, relayRes] = await Promise.all([
        fetch(`${API_BASE}/env`).then((r) => r.json()),
        fetch(`${API_BASE}/birds`).then((r) => r.json()),
        fetch(`${API_BASE}/relay`).then((r) => r.json()),
      ]);

      const env = envRes[0];
      const birds = birdRes[0];
      const relay = relayRes[0];

      if (env) {
        setTemperature(env.temperature);
        setHumidity(env.humidity);
        setLux(env.lux);
      }
      if (birds) setBirdCount(birds.total);
      if (relay) setRelayState(relay.relay_state);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh every 5 s
    return () => clearInterval(interval);
  }, [site]);

  // 🔘 Publish relay commands to backend
  const handleRelay = async (state: boolean) => {
    try {
      await fetch(`${API_BASE}/relay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, relay_state: state }),
      });
      setRelayState(state);
    } catch (err) {
      console.error("❌ Relay update failed:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🐦 {site}</h1>
      <p className="text-stone-500 mb-4">
        Live monitoring data from your Swiftlet environment (from PostgreSQL)
      </p>

      {/* 🧭 Live Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <h2 className="font-semibold text-stone-700">Temperature</h2>
          <p className="text-2xl mt-1">
            {temperature !== null ? `${temperature.toFixed(1)}°C` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700">Humidity</h2>
          <p className="text-2xl mt-1">
            {humidity !== null ? `${humidity.toFixed(1)}%` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700">Light (Lux)</h2>
          <p className="text-2xl mt-1">
            {lux !== null ? `${lux.toFixed(0)} lx` : "—"}
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-stone-700">Bird Count</h2>
          <p className="text-2xl mt-1">
            {birdCount !== null ? birdCount : "—"}
          </p>
        </Card>
      </div>

      {/* ⚙️ Relay Controls */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Relay Controls</h2>
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => handleRelay(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Fan ON
          </Button>
          <Button
            onClick={() => handleRelay(false)}
            className="bg-red-600 hover:bg-red-700"
          >
            Fan OFF
          </Button>
        </div>
        <p className="mt-2 text-sm text-stone-500">
          Current relay:{" "}
          <span
            className={relayState ? "text-green-600" : "text-red-600"}
          >
            {relayState ? "ON" : "OFF"}
          </span>
        </p>
      </div>

      {loading && (
        <p className="text-center text-stone-400 italic">Updating...</p>
      )}
    </div>
  );
}
