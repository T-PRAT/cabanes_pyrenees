import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { layers } from '../lib/map_layers'
import { MapSelector } from './MapSelector'
import { Markers } from './Markers'
import { MapControls } from './MapControls'

export const Map = () => {
   const [selectedLayer, setSelectedLayer] = useState('OpenTopoMap')

   const handleMapLayerChange = (newLayer: string) => {
      setSelectedLayer(newLayer)
   }
   return (
      <>
         <MapSelector onChange={handleMapLayerChange} selectedLayer={selectedLayer} />
         <MapContainer center={[42.631, 0.657]} zoom={8} scrollWheelZoom={true} className="z-0 h-screen grow">
            <TileLayer url={layers[selectedLayer].url} attribution={layers[selectedLayer].attribution} />
            <Markers />
            <MapControls />
         </MapContainer>
      </>
   )
}
