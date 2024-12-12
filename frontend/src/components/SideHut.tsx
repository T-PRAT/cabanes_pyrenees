import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHut } from '../hooks/request'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { useLocation } from '@tanstack/react-router'

export const SideHut = () => {
   const location = useLocation()
   const [currentHut, setCurrentHut] = useState(null)

   useEffect(() => {
      const hutId = location.hash
      hutId && setCurrentHut(Number(hutId))
   }, [location.hash, setCurrentHut])

   const { data: hut, status } = useQuery({
      queryKey: ['hut', currentHut],
      queryFn: () => getHut(currentHut),
   })

   return (
      <div className={`absolute left-0 top-28 z-10 p-2 ${!currentHut ? 'hidden' : ''}`}>
         <Card className="max-w-full">
            {status === 'pending' ? (
               <p>Loading...</p>
            ) : status === 'error' ? (
               <p>Error :(</p>
            ) : (
               <>
                  <CardHeader>
                     <CardTitle>{hut?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-md py-3">{hut?.description}</p>
                     <Table>
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
                     <table className="border- table-auto border text-center">
                        <thead>
                           <TableRow>
                              <TableHead>Altitude</TableHead>
                              <TableHead>Latitude</TableHead>
                              <TableHead>Longitude</TableHead>
                           </TableRow>
                        </thead>
                        <tbody>
                           <TableRow>
                              <TableCell>{hut?.altitude}</TableCell>
                              <TableCell>{hut?.latitude}</TableCell>
                              <TableCell>{hut?.longitude}</TableCell>
                           </TableRow>
                        </tbody>
                     </table>
                  </CardContent>
               </>
            )}
         </Card>
      </div>
   )
}
