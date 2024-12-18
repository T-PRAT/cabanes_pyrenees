// filepath: /home/tprat/cabane_pyrenees/frontend/src/components/AuthDialog.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signup, logout, login } from '@/hooks/request'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema, signupSchema } from '../../../shared/validationSchema'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import FormFieldItem from './ui/FormFieldItem'
import { User } from 'lucide-react'
import { useUser } from '@/context/UserContext'

export const AuthDialog = () => {
   const navigate = useNavigate()
   const { toast } = useToast()
   const { username, setUser } = useUser()
   const [isLoginOpen, setIsLoginOpen] = useState(false)
   const [isSignupOpen, setIsSignupOpen] = useState(false)

   const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         username: '',
         password: '',
      },
   })

   const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
      try {
         const res = await login(values.username, values.password)
         if (res && res.success) {
            setUser(res.userId, values.username)
            setIsLoginOpen(false)
            toast({ title: 'Vous êtes connecté' })
         } else {
            loginForm.setError('username', { type: 'manual', message: 'Identifiant ou mot de passe inconnu' })
            loginForm.setError('password', { type: 'manual', message: 'Identifiant ou mot de passe inconnu' })
         }
      } catch (error) {
         loginForm.setError('username', { type: 'manual', message: 'Une erreur est survenu' })
      }
   }

   const signupForm = useForm({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         username: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   })

   const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
      try {
         const res = await signup(values.username, values.email, values.password)
         if (res && res.success) {
            setUser(Number(res.userId), values.username)
            setIsSignupOpen(false)
            toast({ title: 'Votre compte a bien été créé' })
         }
      } catch (error) {
         signupForm.setError('username', { type: 'manual', message: 'An unexpected error occurred' })
         signupForm.setError('email', { type: 'manual', message: 'An unexpected error occurred' })
      }
   }

   const logOut = async () => {
      await logout()
      setUser(null, null)
      toast({ title: 'Vous êtes déconnecté' })
   }

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon">
                  {username ? (
                     <div className=" bg-accent-foreground text-accent flex size-8 items-center justify-center rounded-lg font-mono text-xl font-bold uppercase">
                        {username.charAt(0)}
                     </div>
                  ) : (
                     <User size={24} />
                  )}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {username ? (
                  <>
                     <DropdownMenuItem onSelect={() => navigate({ to: '/account' })}>Mon compte</DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => logOut()}>Déconnexion</DropdownMenuItem>
                  </>
               ) : (
                  <>
                     <DropdownMenuItem onSelect={() => setIsSignupOpen(true)}>S'inscrire</DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => setIsLoginOpen(true)}>Se connecter</DropdownMenuItem>
                  </>
               )}
            </DropdownMenuContent>
         </DropdownMenu>

         <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Connexion</DialogTitle>
               </DialogHeader>
               <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="flex-col space-y-4">
                     <FormFieldItem control={loginForm.control} name="username" label="Identifiant" type="name" />
                     <FormFieldItem control={loginForm.control} name="password" label="Mot de passe" type="password" />
                     <Button type="submit">Connexion</Button>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>

         <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Créer mon compte</DialogTitle>
               </DialogHeader>
               <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="flex-col space-y-4">
                     <FormFieldItem control={signupForm.control} name="username" label="Nom d'utilisateur" type="text" />
                     <FormFieldItem control={signupForm.control} name="email" label="Email" type="email" />
                     <FormFieldItem control={signupForm.control} name="password" label="Mot de passe" type="password" />
                     <FormFieldItem control={signupForm.control} name="confirmPassword" label="Confirmer le mot de passe" type="password" />
                     <Button type="submit">S'inscrire</Button>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   )
}

export default AuthDialog
