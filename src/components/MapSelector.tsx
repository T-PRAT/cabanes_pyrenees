const MapSelector = ({ onChange, selectedLayer }) => {
  const mapLayers = [
    { name: "OpenStreetMap", value: "openstreetmap" },
    { name: "Mapbox Streets", value: "mapbox.streets" },
    // Add more map layers as needed
  ];

  return (
    <div className="absolute right-0 z-50 flex flex-col m-4 text-center border border-black rounded-lg bg-white/70">
      <label className="p-1 font-bold">Fonds de Carte</label>
      <select
        className="p-1 rounded-lg bg-white/70"
        value={selectedLayer}
        onChange={(e) => onChange(e.target.value)}
      >
        {mapLayers.map((layer) => (
          <option key={layer.name} value={layer.value}>
            {layer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapSelector;
