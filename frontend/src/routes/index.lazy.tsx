import { SideHut } from '@/components/SideHut'
import { Map } from '@/components/Map'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
   component: Index,
})

function Index() {
   return (
      <div className=" overflow-hidden">
         <SideHut />
         <Map />
      </div>
   )
}
