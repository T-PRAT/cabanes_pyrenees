import { Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { cabIcon } from '../lib/icons'
import { useQuery } from '@tanstack/react-query'
import { getHuts } from '../hooks/request'
import { useNavigate } from '@tanstack/react-router'

export const Markers = () => {
   const navigate = useNavigate()

   const { data: huts, status } = useQuery({
      queryKey: ['huts'],
      queryFn: () => getHuts(),
   })

   if (status === 'pending') return <p>Loading...</p>
   if (status === 'error') return <p>Error :(</p>
   else
      return (
         <MarkerClusterGroup chunkedLoading>
            {huts?.map((hut) => (
               <Marker
                  key={hut.id}
                  position={[Number(hut.latitude), Number(hut.longitude)]}
                  icon={cabIcon}
                  eventHandlers={{ click: () => navigate({ hash: hut.id.toString(), replace: true }) }}
               >
                  <Popup>
                     <h3>{hut.name}</h3>
                  </Popup>
               </Marker>
            ))}
         </MarkerClusterGroup>
      )
}
