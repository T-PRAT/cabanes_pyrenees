import { SideHut } from '@/components/SideHut'
import { Map } from '@/components/Map'
import { createLazyFileRoute } from '@tanstack/react-router'
import { SearchBar } from '@/components/SearchBar'

export const Route = createLazyFileRoute('/')({
   component: Index,
})

function Index() {
   return (
      <div className="">
         <SearchBar />
         <SideHut />
         <Map />
      </div>
   )
}
