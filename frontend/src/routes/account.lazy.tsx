import { createLazyFileRoute } from '@tanstack/react-router'
import { HutList } from '@/components/HutList'

export const Route = createLazyFileRoute('/account')({
   component: Account,
})

function Account() {
   return (
      <div className="container mt-24">
         <h1 className="text-4xl font-bold">Mes cabanes</h1>
         <HutList />
      </div>
   )
}
