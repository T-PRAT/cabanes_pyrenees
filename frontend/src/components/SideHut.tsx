import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHut } from '../hooks/request'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { Comments } from './Comments'

export const SideHut = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const [currentHut, setCurrentHut] = useState(null)

   useEffect(() => {
      const hutId = location.hash
      hutId && setCurrentHut(Number(hutId))
   }, [location.hash, setCurrentHut])

   const { data: hut, status } = useQuery({
      queryKey: ['hut', currentHut],
      queryFn: () => getHut(currentHut),
   })

   const closeHut = () => {
      setCurrentHut(null)
      navigate({ hash: '', replace: true })
   }

   return (
      <div className={`absolute inset-x-2 top-6 z-30 p-4 md:inset-auto md:top-28 ${!currentHut ? 'hidden' : 'block'}`}>
         <Card className="max-w-full md:max-w-md">
            {status === 'pending' ? (
               <p>Loading...</p>
            ) : status === 'error' ? (
               <p>Error :(</p>
            ) : (
               <>
                  <button
                     onClick={() => closeHut()}
                     className=" bg-muted absolute bottom-1 right-1 rounded-full p-1 transition duration-300 hover:scale-105 md:bottom-auto md:top-1"
                  >
                     <X size={24} strokeWidth={3} />
                  </button>
                  <CardHeader>
                     <CardTitle>{hut?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-md py-3">{hut?.description}</p>
                     <Table className="bg-secondary my-4">
                        <TableBody>
                           <TableRow>
                              <TableHead>Capacité été:</TableHead>
                              <TableCell>{hut?.summerCapacity}</TableCell>
                           </TableRow>
                           <TableRow>
                              <TableHead>Capacité hiver:</TableHead>
                              <TableCell>{hut?.winterCapacity}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>

                     <Table className="bg-card">
                        <TableHeader>
                           <TableRow>
                              <TableHead>Altitude</TableHead>
                              <TableHead>Latitude</TableHead>
                              <TableHead>Longitude</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           <TableCell>{hut?.altitude}</TableCell>
                           <TableCell>{hut?.latitude}</TableCell>
                           <TableCell>{hut?.longitude}</TableCell>
                        </TableBody>
                     </Table>
                     <Comments />
                  </CardContent>
               </>
            )}
         </Card>
      </div>
   )
}
