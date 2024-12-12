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

export const CreateHutDialog = () => {
   const [isOpen, setIsOpen] = useState(false)

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
      console.log('ONSUBMIT', values)
      try {
         const res = await createHut(values)
         if (res) {
            setIsOpen(false)
            toast.success('Le refuge a bien été créé')
         }
      } catch (error) {
         toast.error('Une erreur est survenue')
      }
   }

   return (
      <>
         <Button onClick={() => setIsOpen(true)}>Ajouter une cabane</Button>
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Ajouter une cabane</DialogTitle>
               </DialogHeader>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormFieldItem control={form.control} name="name" label="Nom" />
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
