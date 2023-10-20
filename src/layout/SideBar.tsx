import SideHut from "../components/SideHut";

export default function SideBar() {
  return (
    <div className="z-10 flex flex-col h-screen p-4 bg-zinc-700 text-zinc-100 border-r-zinc-100">
      <h1 className="text-center text">Cabane des Pyrénées</h1>
      <SideHut />
    </div>
  );
}
