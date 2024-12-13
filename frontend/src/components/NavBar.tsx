import { Link, useLocation } from '@tanstack/react-router'
import { AuthDialog } from '@/components/AuthDialog'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const NavBar = () => {
   const location = useLocation()
   const [navBarSize, setNavBarSize] = useState('mini')

   useEffect(() => {
      location.pathname !== '/' ? setNavBarSize('big') : setNavBarSize('mini')
   }, [location.pathname])

   return (
      <div
         className={cn(' z-20 flex items-center justify-between space-x-6 px-4 py-2 text-xl transition duration-300', {
            'bg-background fixed inset-x-4 bottom-2  mx-4  rounded-xl shadow-xl md:inset-x-1/4 md:bottom-auto md:top-6  xl:inset-x-1/3': navBarSize === 'mini',
            'bg-background fixed bottom-0 w-full shadow-[0_3px_10px_rgb(0,0,0,0.3)] md:bottom-auto md:top-0 md:px-32': navBarSize === 'big',
         })}
      >
         <Link to="/" className="flex items-center space-x-2 font-semibold transition duration-300 hover:opacity-80 [&.active]:font-extrabold">
            <img src="/logo.png" alt="logo" className="size-10 -translate-y-1" />
            <span className="line-clamp-none  hidden sm:block">Cabane des Pyrénées</span>
         </Link>{' '}
         <div className="inline-flex items-center space-x-3">
            <Link to="/list" className="hover:text-primary transition duration-300 hover:opacity-80 [&.active]:font-extrabold">
               Liste
            </Link>{' '}
            <Link to="/about" className="hover:text-primary transition duration-300 hover:opacity-80 [&.active]:font-extrabold">
               Infos
            </Link>
            <AuthDialog />
         </div>
      </div>
   )
}
