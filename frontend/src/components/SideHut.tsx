import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHut } from '../hooks/request'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { Comments } from './Comments'
import { ImageCarousel } from './ImageCarousel'

export const SideHut = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const [currentHut, setCurrentHut] = useState(null)

   useEffect(() => {
      const hutId = location.hash
      hutId && setCurrentHut(Number(hutId))
   }, [location.hash, setCurrentHut])

   const { data: hut, status } = useQuery<Hut>({
      queryKey: ['hut', currentHut],
      queryFn: () => getHut(currentHut),
   })

   const closeHut = () => {
      setCurrentHut(null)
      navigate({ hash: '', replace: true })
   }

   return (
      <div className={`absolute inset-x-0 top-6 z-30 p-2 md:inset-auto md:top-16 ${!currentHut ? 'hidden' : 'block'}`}>
         <Card className=" max-h-[92vh]  max-w-full overflow-y-auto overflow-x-hidden md:max-w-md">
            {status === 'pending' ? (
               <p>Loading...</p>
            ) : status === 'error' ? (
               <p>Error :(</p>
            ) : (
               <>
                  <button
                     onClick={() => closeHut()}
                     className=" bg-muted hover:bg-primary absolute bottom-1 right-1 rounded-full p-1 transition duration-300 md:bottom-auto md:top-1"
                  >
                     <X size={24} strokeWidth={3} />
                  </button>
                  <CardHeader>
                     <CardTitle>{hut?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-md py-3">{hut?.description}</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary flex space-x-3 rounded p-3">
                           <p>Capacité été:</p>
                           <p className="font-bold">{hut?.summerCapacity}</p>
                        </div>
                        <div className="bg-secondary flex space-x-3 rounded p-3">
                           <p>Capacité hiver:</p>
                           <p className="font-bold">{hut?.winterCapacity}</p>
                        </div>
                     </div>

                     <Table className="bg-card mt-4 rounded">
                        <TableHeader>
                           <TableRow>
                              <TableHead>Altitude</TableHead>
                              <TableHead>Latitude</TableHead>
                              <TableHead>Longitude</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           <TableRow>
                              <TableCell>{hut?.altitude}</TableCell>
                              <TableCell>{parseFloat(hut.latitude).toFixed(2)}</TableCell>
                              <TableCell>{parseFloat(hut.longitude).toFixed(2)}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                     <Comments hutId={hut.id} />
                     <div className="text-center">
                        <ImageCarousel images={hut.images} />
                     </div>
                  </CardContent>
               </>
            )}
         </Card>
      </div>
   )
}
