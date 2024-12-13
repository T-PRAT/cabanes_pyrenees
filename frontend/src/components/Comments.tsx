import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export const Comments = () => {
   return (
      <div className="mt-4">
         <h2 className="text-lg font-bold">Commentaires</h2>
         <Separator />
         <ScrollArea>
            <div className="p-4">
               <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits" alt="avatar" className="h-12 w-12 rounded-full" />
                  <div className="ml-4">
                     <h3 className="font-bold">Jean Dupont</h3>
                     <p className="text-sm">Le 12/12/2021</p>
                  </div>
               </div>
               <p className="mt-4">Super cabane, très bien équipée !</p>
            </div>
            <div className="p-4">
               <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits" alt="avatar" className="h-12 w-12 rounded-full" />
                  <div className="ml-4">
                     <h3 className="font-bold">Jean Dupont</h3>
                     <p className="text-sm">Le 12/12/2021</p>
                  </div>
               </div>
               <p className="mt-4">Super cabane, très bien équipée !</p>
            </div>
         </ScrollArea>
      </div>
   )
}
