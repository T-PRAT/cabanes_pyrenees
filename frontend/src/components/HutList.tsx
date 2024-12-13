import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteHut } from '@/hooks/request'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Map } from 'lucide-react'

export const HutList = ({ huts, edit = false }) => {
   const [toDelete, setToDelete] = useState(0)
   const queryClient = useQueryClient()
   const navigate = useNavigate()

   const handleHutDelete = async (id: number) => {
      await deleteHut(id)
      queryClient.invalidateQueries({ queryKey: ['myHuts'] })
      setToDelete(0)
   }

   return (
      <>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Altitude</TableHead>
                  <TableHead>Latitude</TableHead>
                  <TableHead>Longitude</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {huts?.map((hut) => (
                  <TableRow key={hut.id}>
                     <TableCell>
                        <Button variant="secondary" onClick={() => navigate({ to: '/', hash: hut.id.toString() })} className="flex items-center">
                           <Map size={20} strokeWidth={3} />
                        </Button>
                     </TableCell>
                     <TableCell>{hut.name}</TableCell>
                     <TableCell>{hut.altitude}</TableCell>
                     <TableCell>{parseFloat(hut.latitude).toFixed(2)}</TableCell>
                     <TableCell>{parseFloat(hut.longitude).toFixed(2)}</TableCell>
                     {edit && (
                        <TableCell>
                           <Button onClick={() => setToDelete(hut.id)} variant="destructive">
                              <Trash size={12} strokeWidth={3} />
                           </Button>
                        </TableCell>
                     )}
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <Dialog open={!!toDelete} onOpenChange={() => setToDelete(0)}>
            <DialogContent>
               <DialogTitle>Voulez vous vraiment supprimer "{huts.find((hut) => hut.id === toDelete)?.name}" ?</DialogTitle>
               <div className="mt-4 flex justify-end space-x-4">
                  <Button variant="secondary" onClick={() => setToDelete(0)}>
                     Annuler
                  </Button>
                  <Button variant="destructive" onClick={() => handleHutDelete(toDelete)}>
                     Supprimer
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
