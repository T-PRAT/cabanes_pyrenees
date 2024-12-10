import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from '@/components/NavBar'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
   component: () => (
      <>
         <NavBar />

         <Outlet />
         <Toaster richColors />
      </>
   ),
})
