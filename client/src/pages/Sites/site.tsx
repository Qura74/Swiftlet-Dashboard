import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AllSites() {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "Sabah Swiftlet Farm",
      location: "Putatan",
      temperature: 28.6,
      humidity: 87,
      light: 120,
      birdCount: 54,
      status: "Online",
    },
    {
      id: 2,
      name: "Borneo Nest House",
      location: "Sandakan",
      temperature: 29.1,
      humidity: 89,
      light: 200,
      birdCount: 72,
      status: "Online",
    },
    {
      id: 3,
      name: "Rural Swiftlet Hub",
      location: "Beaufort",
      temperature: 30.3,
      humidity: 82,
      light: 95,
      birdCount: 43,
      status: "Offline",
    },
  ]);

  return (
    <div className="h-full overflow-y-auto p-6 custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <Card className="border-stone-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-stone-900">
              Swiftlet Farm Sites Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Farm Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Temp (°C)</TableHead>
                  <TableHead className="text-center">Humidity (%)</TableHead>
                  <TableHead className="text-center">Light (Lux)</TableHead>
                  <TableHead className="text-center">Bird Count</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-medium">{site.name}</TableCell>
                    <TableCell>{site.location}</TableCell>
                    <TableCell className="text-center">{site.temperature.toFixed(1)}</TableCell>
                    <TableCell className="text-center">{site.humidity}%</TableCell>
                    <TableCell className="text-center">{site.light}</TableCell>
                    <TableCell className="text-center">{site.birdCount}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={site.status === "Online" ? "success" : "destructive"}
                      >
                        {site.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
