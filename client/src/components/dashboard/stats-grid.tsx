import { Card, CardContent } from "@/components/ui/card";
import { MiniChart } from "./mini-chart";
import { statsData, ordersOverview } from "@/lib/data";
import { Bell, ShoppingCart, CreditCard, Plus, Package } from "lucide-react";
import { Meter } from "./Meter";

const iconMap = {
  bell: Bell,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
  plus: Plus,
  package: Package,
};

export function StatsGrid() {
  return (
    <div className="flex flex-wrap -mx-3 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6">
          <Card className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 h-full">
            <CardContent className="p-6 flex flex-col h-full">

              {/* Header */}
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">
                  {stat.title || "Temperature Monitor"}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {stat.description || "Shows temperature over time"}
                </p>
              </div>

              {/* Meter */}
              <div className="flex-1 mb-4">
                <Meter
                  value={stat.latestTemp}
                  max={50}
                  color={stat.latestTemp >= 30 ? "#ef4444" : "#10b981"}
                  label="Temperature"
                />
              </div>

              {/* Latest Temperature */}
              <div className="flex items-center text-xs text-stone-500 dark:text-stone-400">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${stat.latestTemp >= 30 ? "bg-red-500 dark:bg-red-400" : "bg-green-500 dark:bg-green-400"
                    }`}
                />
                Latest: {stat.latestTemp}°C | {stat.lastUpdate}
              </div>

            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

