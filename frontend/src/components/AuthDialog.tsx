import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getUser } from "@/hooks/request";
import { User } from "lucide-react";
import { signup, logout, login } from "@/hooks/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema, signupSchema } from "../../../shared/validationSchema";
import { toast } from "sonner";

export const AuthDialog = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getUser().then((data) => {
      setUsername(data.username);
    });
  }, []);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(values.username, values.password);
      if (res && res.success) {
        setUsername(values.username);
        setIsLoginOpen(false);
        toast.success("Vous êtes connecté");
      } else {
        loginForm.setError("username", { type: "manual", message: "Identifiant ou mot de passe inconnu" });
        loginForm.setError("password", { type: "manual", message: "Identifiant ou mot de passe inconnu" });
      }
    } catch (error) {
      loginForm.setError("username", { type: "manual", message: "Une erreur est survenu" });
    }
  };

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      const res = await signup(values.username, values.email, values.password);
      if (res && res.success) {
        setUsername(values.username);
        setIsSignupOpen(false);
        toast.success("Votre compte a bien été créé");
      }
    } catch (error) {
      signupForm.setError("username", { type: "manual", message: "An unexpected error occurred" });
      signupForm.setError("email", { type: "manual", message: "An unexpected error occurred" });
    }
  };

  const logOut = async () => {
    await logout();
    setUsername(null);
    toast.success("Vous êtes déconnecté");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {username ? (
              <div className="size-8 text-xl font-mono rounded-lg font-bold bg-muted flex items-center justify-center text-background uppercase">
                {username.charAt(0)}
              </div>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {username ? (
            <>
              <DropdownMenuItem>Mon compte</DropdownMenuItem>
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
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="jeandu31" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="Mot de passe" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Créer mon compte</DialogTitle>
          </DialogHeader>
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4 flex-col">
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="jeandu31" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jean@mail.fr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="Mot de passe" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Confirmer le mot de passe" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">S'inscrire</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
