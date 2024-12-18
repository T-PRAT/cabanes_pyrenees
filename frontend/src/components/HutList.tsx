import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteHut } from '@/hooks/request'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Map } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { addHutImage } from '@/hooks/request'

export const HutList = ({ huts, edit = false }) => {
   const [toDelete, setToDelete] = useState(0)
   const [addImage, setAddImage] = useState(0)
   const [imageFile, setImageFile] = useState(null)
   const queryClient = useQueryClient()
   const navigate = useNavigate()

   const handleHutDelete = async (id: number) => {
      await deleteHut(id)
      queryClient.invalidateQueries({ queryKey: ['myHuts'] })
      setToDelete(0)
   }

   const handleAddImage = async (id: number) => {
      if (imageFile) {
         await addHutImage(id, imageFile)
         queryClient.invalidateQueries({ queryKey: ['myHuts'] })
         setAddImage(0)
         setImageFile(null)
      }
   }

   const handleImageChange = (event) => {
      setImageFile(event.target.files[0])
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
                        <>
                           <TableCell>
                              <Button onClick={() => setAddImage(hut.id)} variant="secondary">
                                 <ImagePlus size={12} strokeWidth={3} />
                              </Button>
                           </TableCell>
                           <TableCell>
                              <Button onClick={() => setToDelete(hut.id)} variant="destructive">
                                 <Trash size={12} strokeWidth={3} />
                              </Button>
                           </TableCell>
                        </>
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

         <Dialog open={!!addImage} onOpenChange={() => setAddImage(0)}>
            <DialogContent>
               <DialogTitle>Ajouter une image</DialogTitle>
               <Input id="picture" type="file" onChange={handleImageChange} />
               <div className="mt-4 flex justify-end space-x-4">
                  <Button variant="secondary" onClick={() => setAddImage(0)}>
                     Annuler
                  </Button>
                  <Button onClick={() => handleAddImage(addImage)}>Ajouter</Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
