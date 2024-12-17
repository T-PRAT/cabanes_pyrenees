import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from '@/components/NavBar'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@/context/UserContext'

const RootComponent = () => {
   return (
      <>
         <NavBar />
         <Outlet />
         <Toaster />
      </>
   )
}

export const Route = createRootRoute({
   component: () => (
      <UserProvider>
         <RootComponent />
      </UserProvider>
   ),
})
