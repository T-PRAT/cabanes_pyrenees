import { Icon } from 'leaflet'
import cabaneIcon from '../assets/cabane.svg'
import refugeIcon from '../assets/refuge.svg'

export const cabIcon = new Icon({
   iconUrl: cabaneIcon,
   iconSize: [25, 25],
})

export const refIcon = new Icon({
   iconUrl: refugeIcon,
   iconSize: [25, 25],
   iconAnchor: [0, 0],
})
