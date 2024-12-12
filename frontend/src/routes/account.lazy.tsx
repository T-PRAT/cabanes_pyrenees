import { createLazyFileRoute } from '@tanstack/react-router'
import { HutList } from '@/components/HutList'
import { CreateHutDialog } from '@/components/CreateHutDialog'
import { useQuery } from '@tanstack/react-query'
import { getMyHuts } from '@/hooks/request'

export const Route = createLazyFileRoute('/account')({
   component: Account,
})

function Account() {
   const { data: myHuts, status } = useQuery({
      queryKey: ['myHuts'],
      queryFn: () => getMyHuts(),
   })

   return (
      <div className="container mt-24">
         <CreateHutDialog />
         <h1 className="mb-6 text-4xl font-bold">Mes cabanes</h1>
         {status === 'pending' && <p>Chargement...</p>}
         {status === 'error' && <p>Une erreur est survenue</p>}
         {status === 'success' && <HutList huts={myHuts} />}
      </div>
   )
}
