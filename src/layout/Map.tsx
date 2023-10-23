import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "../components/Markers";
import { useState } from "react";
import MapSelector from "../components/MapSelector";
import { layers } from "../lib/map_layers";

export default function Map() {
  const [selectedLayer, setSelectedLayer] = useState("OpenTopoMap");

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
        <TileLayer
          url={layers[selectedLayer].url}
          attribution={layers[selectedLayer].attribution}
        />
        <Markers />
      </MapContainer>
    </>
  );
}
