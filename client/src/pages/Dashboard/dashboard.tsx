import { StatsGrid } from "@/pages/Dashboard/stats-grid";
import { AlertHistoryChart } from "@/pages/Dashboard/AlertHistoryChart";
import { Card } from "@/components/ui/card";
import SwiftletMap from "@/pages/Dashboard/Map";
import rogonNetwork from "/images/rogon_network.webp"; // Right logo

export default function Dashboard() {
  return (
    <div className="h-full overflow-y-auto p-6 custom-scrollbar bg-gray-50">
      {/* 🏛️ Official Style Header */}
      <Card className="relative mb-8 border-2 border-stone-200 bg-white py-10 text-center">
        {/* Logos Section */}
        <div className="flex justify-center items-center gap-16 mb-4">
        
          <img
            src={rogonNetwork}
            alt="Rogon Network Logo"
            className="h-40 w-auto"
          />
        </div>

        {/* Center Title */}
        <div>
          <h1 className="text-4xl font-extrabold text-stone-800 tracking-wide uppercase">
            Swiftlet Monitoring System
          </h1>
      
        </div>
      </Card>

      {/* 📊 Global Stats Section */}
      <StatsGrid />

      {/* 🗺️ Swiftlet Map Section */}
      <Card className="mb-8 border-2 border-stone-200 bg-white overflow-hidden p-4">
        <h3 className="text-lg font-semibold mb-2">Swiftlet Site Locations</h3>
        <SwiftletMap />
      </Card>

      {/*Alert History Chart */}
      <AlertHistoryChart />
    </div>
  );
}
