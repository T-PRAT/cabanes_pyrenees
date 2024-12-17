import { getUser } from '@/hooks/request'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface UserContextType {
   userId: number | null
   username: string | null
   setUser: (id: number | null, name: string | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
   const [userId, setUserId] = useState<number | null>(null)
   const [username, setUsername] = useState<string | null>(null)

   const setUser = (id: number | null, name: string | null) => {
      setUserId(id)
      setUsername(name)
   }

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const user = await getUser()
            if (user) {
               setUser(user.id, user.username)
            }
         } catch (error) {
            console.error('Failed to fetch user:', error)
         }
      }

      fetchUser()
   }, [])
   return <UserContext.Provider value={{ userId, username, setUser }}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
   const context = useContext(UserContext)
   if (!context) {
      throw new Error('useUser must be used within a UserProvider')
   }
   return context
}
