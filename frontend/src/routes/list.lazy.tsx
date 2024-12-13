import { useQuery } from '@tanstack/react-query'
import { getHuts } from '../hooks/request'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { HutList } from '@/components/HutList'
import { Button } from '@/components/ui/button'
import { Map } from 'lucide-react'

export const Route = createLazyFileRoute('/list')({
   component: List,
})

function List() {
   const navigate = useNavigate()
   const { data: huts, status } = useQuery({
      queryKey: ['huts'],
      queryFn: () => getHuts(),
   })

   return (
      <div className="container mt-4 md:mt-24">
         <div className="flex justify-between">
            <h1 className="mb-6 text-2xl font-bold md:text-4xl">Liste des cabanes</h1>
            <Button onClick={() => navigate({ to: '/' })} className="flex items-center">
               <Map size={20} strokeWidth={3} />
               <span className="ml-2">Voir la carte</span>
            </Button>
         </div>
         <h1 className="mb-6 text-4xl font-bold"></h1>
         {status === 'pending' && <p>Chargement...</p>}
         {status === 'error' && <p>Une erreur est survenue</p>}
         {status === 'success' && <HutList huts={huts} />}
      </div>
   )
}
