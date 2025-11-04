"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function SwiftletMap() {
  const [LeafletMap, setLeafletMap] = useState<JSX.Element | null>(null);

  useEffect(() => {
    import("react-leaflet").then(async (leaflet) => {
      const L = (await import("leaflet")).default;

      // ✅ Fix default marker icons
      const markerIcon2x = await import("leaflet/dist/images/marker-icon-2x.png");
      const markerIcon = await import("leaflet/dist/images/marker-icon.png");
      const markerShadow = await import("leaflet/dist/images/marker-shadow.png");

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.default,
        iconUrl: markerIcon.default,
        shadowUrl: markerShadow.default,
      });

      const { MapContainer, TileLayer, Marker, Popup } = leaflet;

      // ✅ List of all swiftlet locations
      const swiftletLocations: {
        name: string;
        position: [number, number];
        address: string;
      }[] = [
        {
          name: "Sabah Swiftlet Farm",
          position: [5.8943, 116.0406], 
          address: "Petagas, Sabah, Malaysia",
        },
        {
          name: "Le Meridien",
          position: [5.98036, 116.07169],
          address:
            "Le Meridien Kota Kinabalu, Jalan Tun Fuad Stephens, 88000 Kota Kinabalu, Sabah, Malaysia",
        },
      ];

      setLeafletMap(
        <div
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={swiftletLocations[0].position}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {/* ✅ Render all markers dynamically */}
            {swiftletLocations.map((farm, i) => (
              <Marker key={i} position={farm.position}>
                <Popup>
                  🐦 <b>{farm.name}</b>
                  <br />
                  {farm.address}
                  <br />
                  <a
                    href={`#/swiftlet-details?name=${encodeURIComponent(farm.name)}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details →
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      );
    });
  }, []);

  return (
    LeafletMap || (
      <div className="flex items-center justify-center h-[400px] text-stone-500">
        Loading map...
      </div>
    )
  );
}
