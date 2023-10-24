import SideHut from "../components/SideHut";

export default function SideBar() {
  return (
    <div className="z-10 flex flex-col w-[400px] h-screen p-4 bg-zinc-200 text-zinc-900 border-r-zinc-600 ring-2 ring-zinc-900/40">
      <h1 className="py-3 my-3 text-3xl font-bold text-center border-b border-zinc-500">
        Cabane des Pyrénées
      </h1>
      <SideHut />
    </div>
  );
}
