import { layers } from "../lib/map_layers";
const MapSelector = ({ onChange, selectedLayer }) => {
  const layerKeys = Object.keys(layers);

  return (
    <div className="absolute right-0 z-50 flex flex-col m-4 text-center border border-black rounded-lg bg-white/70">
      <label className="p-1 font-bold">Fonds de Carte</label>
      <select
        className="p-1 rounded-lg bg-white/70"
        value={selectedLayer}
        onChange={(e) => onChange(e.target.value)}
      >
        {layerKeys.map((layerKey) => {
          const layer = layers[layerKey];
          return (
            <option key={layer.name} value={layer.value}>
              {layer.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MapSelector;
