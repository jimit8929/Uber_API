// HeroMap.jsx
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Button } from "@/components/ui/button";
import { CarFront } from "lucide-react";

const HeroMap = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  // const [selectedType, setSelectedType] = useState("ride");
  const [mapCenter, setMapCenter] = useState([23.1885, 72.6289]); // Delhi
  const mapRef = useRef(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  // set the map ref when created
  const handleMapCreated = (mapInstance) => {
    mapRef.current = mapInstance;
    // ensure correct size after mount
    setTimeout(() => mapInstance.invalidateSize?.(), 150);
  };

  // keep view in sync when mapCenter changes
  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    // Only flyTo if center is different (avoid jitter)
    const current = m.getCenter();
    const lat = Number(current.lat.toFixed(6));
    const lng = Number(current.lng.toFixed(6));
    if (lat !== Number(mapCenter[0].toFixed?.(6) ?? mapCenter[0]) ||
        lng !== Number(mapCenter[1].toFixed?.(6) ?? mapCenter[1])) {
      m.flyTo(mapCenter, m.getZoom());
    }
  }, [mapCenter]);

  // keep leaflet size up-to-date on resize
  useEffect(() => {
    const onResize = () => mapRef.current?.invalidateSize?.();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // demo helper: parse lat,lng typed into pickup
  const centerFromPickup = () => {
    const parts = pickup.split(",").map((p) => parseFloat(p.trim()));
    if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
      setMapCenter([parts[0], parts[1]]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      {/* LEFT */}
      <div className="w-full lg:w-1/2 p-8 overflow-auto max-h-screen">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Go anywhere with <span className="block">Uber</span>
        </h1>

        <div className="mt-6 flex items-center gap-4">
          <Button variant="outline" size="icon"><CarFront /></Button>
          <span>Ride</span>
        </div>

        <div className="mt-6 max-w-xl bg-white p-4 rounded shadow-sm">
          <label className="block text-xs text-gray-600">Pickup</label>
          <div className="relative mb-3">
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="lat,lng or address (demo: 28.67,77.22)"
              className="w-full border rounded px-3 py-2"
            />
            <button
              onClick={() => setPickup("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
            >
              ✕
            </button>
          </div>

          <label className="block text-xs text-gray-600">Dropoff</label>
          <input
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Dropoff"
            className="w-full border rounded px-3 py-2 mb-3"
          />

          <div className="flex gap-3">
            <button onClick={centerFromPickup} className="px-4 py-2 rounded bg-black text-white">See prices</button>
            <button onClick={() => { setPickup(""); setDropoff(""); }} className="px-4 py-2 rounded border">Clear</button>
          </div>
        </div>
      </div>

      {/* RIGHT - map wrapper (sticky/full-height on lg to avoid overflow) */}
     <div className="w-full lg:w-1/2 p-8 max-h-screen z-0">
        <MapContainer
          whenCreated={handleMapCreated}
          center={mapCenter}
          zoom={13}
          style={{ height: "90%", width: "100%" }}
          scrollWheelZoom
          zoomControl={false}
          attributionControl={false}
          className="z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={mapCenter} icon={customIcon}>
            <Popup>Current location</Popup>
          </Marker>
        </MapContainer>


      </div>
    </div>
  );
};

export default HeroMap;
