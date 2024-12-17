import { useQuery } from '@tanstack/react-query'
import { createComment, getComments, deleteComment } from '../hooks/request'
import { Button } from './ui/button'
import { MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Input } from './ui/input'
import { useQueryClient } from '@tanstack/react-query'

export const Comments = ({ hutId }) => {
   const { data: comments, status } = useQuery({
      queryKey: ['comments', hutId],
      queryFn: () => getComments(hutId),
   })
   const queryClient = useQueryClient()
   const [showInput, setShowInput] = useState(false)
   const [inputValue, setInputValue] = useState('')

   const handlePostComment = async () => {
      const res = await createComment(hutId, inputValue)
      if (res) {
         setInputValue('')
         setShowInput(false)
         queryClient.invalidateQueries({ queryKey: ['comments'] })
      }
   }

   const handleDeleteComment = (id: number) => {
      const res = deleteComment(id)
      if (res) {
         queryClient.invalidateQueries({ queryKey: ['comments'] })
         setInputValue('')
         setShowInput(false)
      }
   }

   const getAvatarBgClass = (index: number) => {
      return index % 2 === 0 ? 'bg-primary-foreground' : 'bg-muted-foreground'
   }

   return (
      <div className="mt-4">
         <div className="my-2 flex items-center justify-between">
            <h2 className="text-lg font-bold ">Commentaires</h2>
            <Button size="sm" onClick={() => (showInput ? handlePostComment() : setShowInput(!showInput))}>
               {showInput ? <Send /> : <MessageCircle />}
            </Button>
         </div>
         {showInput && <Input name="content" value={inputValue} className="my-2" onChange={(e) => setInputValue(e.target.value)} />}
         <div className="flex max-h-40 flex-col space-y-1 overflow-auto rounded p-2 shadow-inner shadow-black/20">
            {status === 'pending' && <p className=" animate-pulse ">Chargement des commentaires...</p>}
            {(status === 'error' || comments?.length < 1) && <p className=" text-accent-foreground/60">Aucun commentaires</p>}
            {comments?.map((comment, index) => (
               <div className=" bg-accent rounded-lg p-2" key={index}>
                  <div className="flex items-center space-x-2">
                     <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${getAvatarBgClass(index)}`}>{comment.username.charAt(0).toUpperCase()}</div>
                     <h3 className="font-bold">{comment.username}</h3>
                     <span className=" text-accent-foreground/60 text-sm">le {new Date(comment.createdAt).toLocaleDateString()}</span>

                     <span
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-accent-foreground/60 hover:text-destructive text-right text-sm transition duration-300 hover:cursor-pointer"
                     >
                        Supprimer
                     </span>
                  </div>
                  <p className="ml-10 ">{comment.content}</p>
               </div>
            ))}
         </div>
      </div>
   )
}
