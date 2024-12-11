import { useMap } from 'react-leaflet'
import { Button } from './ui/button'
import { Plus, Minus, Locate, ScanSearch } from 'lucide-react'

export const MapControls = () => {
   const map = useMap()

   const zoomIn = () => {
      map.setZoom(map.getZoom() + 1)
   }

   const zoomOut = () => {
      map.setZoom(map.getZoom() - 1)
   }

   const locate = () => {
      map.locate()
   }

   const resetZoom = () => {
      map.setView([42.631, 0.657], 8)
   }

   return (
      <div className="fixed right-5 top-20 flex flex-col space-y-1" style={{ zIndex: 1000 }}>
         <Button variant="secondary" onClick={zoomIn} className="p-2">
            <Plus size={20} strokeWidth={4} />
         </Button>
         <Button variant="secondary" onClick={zoomOut} className="p-2">
            <Minus size={20} strokeWidth={4} />
         </Button>
         <Button variant="secondary" onClick={resetZoom} className="p-2">
            <ScanSearch size={20} strokeWidth={3} />
         </Button>
         <Button variant="secondary" onClick={locate} className="p-2">
            <Locate size={20} strokeWidth={4} />
         </Button>
      </div>
   )
}
