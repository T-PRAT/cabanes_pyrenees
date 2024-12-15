import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { getComments } from '../hooks/request'
import { Button } from './ui/button'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Input } from './ui/input'

export const Comments = ({ hutId }) => {
   const { data: comments, status } = useQuery({
      queryKey: ['comments', hutId],
      queryFn: () => getComments(hutId),
   })
   const [showInput, setShowInput] = useState(false)
   const [inputValue, setInputValue] = useState('')

   const onSubmit = async (values) => {
      event.preventDefault()

      console.log(values)
   }

   const getAvatarBgClass = (index) => {
      return index % 2 === 0 ? 'bg-primary-foreground' : 'bg-muted-foreground'
   }

   return (
      <div className="mt-4">
         <div className="my-2 flex items-center justify-between">
            <h2 className="text-lg font-bold ">Commentaires</h2>
            <Button size="sm" onClick={() => setShowInput(!showInput)}>
               <MessageCircle />
            </Button>
         </div>
         {showInput && (
            <form onSubmit={onSubmit}>
               <Input name="content" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
               <Button type="submit">Envoyer</Button>
            </form>
         )}
         {status === 'pending' && <p>Loading...</p>}
         {status === 'error' && <p>Aucun commentaires </p>}
         {comments?.map((comment, index) => (
            <ScrollArea className="rounded p-2 shadow-inner shadow-black/20">
               <div className=" bg-accent rounded-lg p-2" key={index}>
                  <div className="flex items-center space-x-2">
                     <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${getAvatarBgClass(index)}`}>{comment.username.charAt(0).toUpperCase()}</div>
                     <h3 className="font-bold">{comment.username}</h3>
                     <span className=" text-accent-foreground/60 text-sm">le {new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="ml-10 ">{comment.content}</p>
               </div>
            </ScrollArea>
         ))}
      </div>
   )
}
