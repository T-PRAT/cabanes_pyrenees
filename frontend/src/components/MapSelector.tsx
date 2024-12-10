import { layers } from '../lib/map_layers'

export const MapSelector = ({ onChange, selectedLayer }) => {
   const layerKeys = Object.keys(layers)

   return (
      <div className="absolute right-0 z-50 m-4 flex flex-col rounded border text-center backdrop-blur-sm">
         <label className="p-1 font-bold">Fonds de Carte</label>
         <select className="p-1" value={selectedLayer} onChange={(e) => onChange(e.target.value)}>
            {layerKeys.map((layerKey) => {
               const layer = layers[layerKey]
               return (
                  <option key={layer.name} value={layer.value}>
                     {layer.name}
                  </option>
               )
            })}
         </select>
      </div>
   )
}
