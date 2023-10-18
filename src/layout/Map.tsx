import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "../components/Markers";
import { useState } from "react";
import MapSelector from "../components/MapSelector";

export default function Map() {
  const [selectedLayer, setSelectedLayer] = useState("openstreetmap");

  const handleMapLayerChange = (newLayer) => {
    setSelectedLayer(newLayer);
  };
  return (
    <>
      <MapSelector
        onChange={handleMapLayerChange}
        selectedLayer={selectedLayer}
      />
      <MapContainer
        center={[42.631, 0.657]}
        zoom={8}
        scrollWheelZoom={true}
        className="z-0 h-screen grow"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Markers />
      </MapContainer>
    </>
  );
}
