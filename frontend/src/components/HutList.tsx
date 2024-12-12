import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const HutList = ({ huts }) => {
   return (
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
   )
}
