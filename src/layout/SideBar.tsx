import { Button } from "@/components/ui/button";
import SideHut from "../components/SideHut";

export default function SideBar() {
  return (
    <div className="z-10 w-[400px] h-screen p-4 ring-2 ring-primary/50">
      <h1 className="bg-gradient text-3xl p-4 !bg-clip-text text-transparent !bg-cover !bg-center leading-none uppercase tracking-tighter font-black">
        Cabane des Pyrénées
      </h1>
      <SideHut />
      <div className="fixed bottom-4">
        <Button>Ajouter</Button>
      </div>
    </div>
  );
}
