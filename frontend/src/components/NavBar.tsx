import { Link, useLocation } from '@tanstack/react-router'
import { AuthDialog } from '@/components/AuthDialog'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const NavBar = () => {
   const location = useLocation()
   const [navBarSize, setNavBarSize] = useState('mini')

   useEffect(() => {
      if (location.pathname === '/about' || location.pathname === '/list') {
         setNavBarSize('big')
      } else {
         setNavBarSize('mini')
      }
   }, [location.pathname])

   return (
      <div
         className={cn('z-20 flex items-center justify-between space-x-6 px-4 py-2 text-xl shadow-lg transition duration-300', {
            'bg-background absolute left-1/3 top-6 rounded-xl': navBarSize === 'mini',
            'md:px-24': navBarSize === 'big',
         })}
      >
         <Link to="/" className="hover:text-accent font-semibold transition duration-300 [&.active]:font-extrabold">
            Cabane des Pyrénées
         </Link>{' '}
         <div className="inline-flex items-center space-x-3">
            <Link to="/list" className="hover:text-accent font-semibold transition duration-300 [&.active]:font-extrabold">
               List
            </Link>{' '}
            <Link to="/about" className="hover:text-accent font-semibold transition duration-300 [&.active]:font-extrabold">
               About
            </Link>
            <AuthDialog />
         </div>
      </div>
   )
}
