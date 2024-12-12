import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createHut } from '@/hooks/request'
import { hutSchema } from '../../../shared/validationSchema'
import { toast } from 'sonner'
import { Button } from './ui/button'
import FormFieldItem from './ui/FormFieldItem'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

export const CreateHutDialog = () => {
   const [isOpen, setIsOpen] = useState(false)
   const queryClient = useQueryClient()

   const form = useForm<z.infer<typeof hutSchema>>({
      resolver: zodResolver(hutSchema),
      defaultValues: {
         name: '',
         description: '',
         summerCapacity: 1,
         winterCapacity: 1,
         altitude: 2,
         latitude: '',
         longitude: '',
      },
   })

   const onSubmit = async (values: z.infer<typeof hutSchema>) => {
      const res = await createHut(values)
      if (res) {
         queryClient.invalidateQueries({ queryKey: ['myHuts'] })
         setIsOpen(false)
         toast.success('La cabane a bien été créé')
      } else {
         toast.error('Une erreur est survenue')
      }
   }

   return (
      <>
         <Button onClick={() => setIsOpen(true)}>
            <Plus size={20} strokeWidth={4} />
            <span className="ml-2 hidden md:block">Ajouter une cabane</span>
         </Button>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Ajouter une cabane</DialogTitle>
               </DialogHeader>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormFieldItem control={form.control} name="name" label="Nom" type="text" />
                     <FormFieldItem control={form.control} name="description" label="Description" />
                     <div className="flex space-x-6">
                        <FormFieldItem control={form.control} name="summerCapacity" label="Capacité été" type="number" />
                        <FormFieldItem control={form.control} name="winterCapacity" label="Capacité hiver" type="number" />
                     </div>
                     <FormFieldItem control={form.control} name="altitude" label="Altitude" type="number" />
                     <div className="flex space-x-6">
                        <FormFieldItem control={form.control} name="latitude" label="Latitude" />
                        <FormFieldItem control={form.control} name="longitude" label="Longitude" />
                     </div>
                     <Button type="submit">Créer</Button>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   )
}
