import { layers } from '../lib/map_layers'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Check, Layers } from 'lucide-react'

export const MapSelector = ({ onChange, selectedLayer = 'OpenTopoMap' }) => {
   const layerKeys = Object.keys(layers)

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="outline" className="fixed right-5 top-9 z-20 p-2">
               <Layers size={20} strokeWidth={3} />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-38 p-0">
            <div className="grid grid-cols-1">
               {layerKeys.map((layerKey) => {
                  const option = layers[layerKey]
                  return (
                     <Button key={layerKey} variant="ghost" className={`justify-start font-bold ${selectedLayer === layerKey && 'bg-accent'}`} onClick={() => onChange(layerKey)}>
                        {option.name}
                        {selectedLayer === layerKey && <Check className="ml-auto h-4 w-4" />}
                     </Button>
                  )
               })}
            </div>
         </PopoverContent>
      </Popover>
   )
}
