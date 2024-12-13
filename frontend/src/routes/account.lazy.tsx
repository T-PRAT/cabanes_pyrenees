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
      <div className="container mt-4 md:mt-24">
         <div className="flex justify-between">
            <h1 className="mb-6 text-2xl font-bold md:text-4xl">Mes cabanes</h1>
            <CreateHutDialog />
         </div>
         {status === 'pending' && <p>Chargement...</p>}
         {status === 'error' && <p>Une erreur est survenue</p>}
         {status === 'success' && <HutList huts={myHuts} edit={true} />}
      </div>
   )
}
