import { useQuery } from '@tanstack/react-query'
import { getHuts } from '../hooks/request'
import { createLazyFileRoute } from '@tanstack/react-router'
import { HutList } from '@/components/HutList'

export const Route = createLazyFileRoute('/list')({
   component: List,
})

function List() {
   const { data: huts, status } = useQuery({
      queryKey: ['huts'],
      queryFn: () => getHuts(),
   })

   return (
      <div className="container mt-24">
         <h1 className="mb-6 text-4xl font-bold">Liste des cabanes</h1>
         {status === 'pending' && <p>Chargement...</p>}
         {status === 'error' && <p>Une erreur est survenue</p>}
         {status === 'success' && <HutList huts={huts} />}
      </div>
   )
}
