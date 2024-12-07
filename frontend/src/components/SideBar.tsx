import { Button } from "@/components/ui/button";
import SideHuts from "../components/SideHut";

export default function SideBar() {
  return (
    <div className="z-10 w-[400px] h-screen p-4 ring-2 ring-primary/50">
      <h1 className="text-3xl mb-8 p-4 font-extrabold">Cabane des Pyrénées</h1>
      <SideHuts />
      <div className="fixed bottom-4">
        <Button>Ajouter</Button>
      </div>
    </div>
  );
}
