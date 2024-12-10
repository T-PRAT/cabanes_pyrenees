import { useQuery } from '@tanstack/react-query'
import { getHuts } from '../hooks/request'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const HutList = () => {
   const { data: huts, status } = useQuery({
      queryKey: ['huts'],
      queryFn: () => getHuts(),
   })

   return (
      <>
         {status === 'pending' ? (
            <p>Loading...</p>
         ) : status === 'error' ? (
            <p>Error :(</p>
         ) : (
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Nom</TableHead>
                     <TableHead>Altitude</TableHead>
                     <TableHead>Latitude</TableHead>
                     <TableHead>Longitude</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {huts?.map((hut) => (
                     <TableRow key={hut.id}>
                        <TableCell>{hut.name}</TableCell>
                        <TableCell>{hut.altitude}</TableCell>
                        <TableCell>{hut.latitude}</TableCell>
                        <TableCell>{hut.longitude}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         )}
      </>
   )
}
