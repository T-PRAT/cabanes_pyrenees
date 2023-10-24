import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Hut } from "./Markers";
import { useContext } from "react";
import { CurrentHutContext } from "../context/currentHutContext";

export default function SideHut() {
  const { currentHut } = useContext(CurrentHutContext);
  const [hut, setHut] = useState<Hut>(null);

  useEffect(() => {
    getHut();
  });

  async function getHut() {
    const { data, error } = await supabase
      .from("hut")
      .select("*")
      .eq("id", currentHut);
    if (error) console.log("error", error);
    if (data) {
      setHut(data[0]);
    }
  }
  return (
    <div className="p-2 my-4 border border-zinc-400">
      <h2 className="text-xl font-semibold text-center">{hut?.name}</h2>
      <p className="py-3 text-md">{hut?.description}</p>
      <table className="my-2 text-left border table-auto border-zinc-500">
        <tbody>
          <tr>
            <th className="p-2 border border-zinc-500">Capacité été:</th>
            <td className="p-2 border border-zinc-500">
              {hut?.summer_capacity}
            </td>
          </tr>
          <tr>
            <th className="p-2 border border-zinc-500">Capacité hiver:</th>
            <td className="p-2 border border-zinc-500">
              {hut?.winter_capacity}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="text-center border table-auto border-zinc-500">
        <thead>
          <tr>
            <th className="p-2 border border-zinc-500">Altitude</th>
            <th className="p-2 border border-zinc-500">Latitude</th>
            <th className="p-2 border border-zinc-500">Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-zinc-500">{hut?.altitude}</td>
            <td className="p-2 border border-zinc-500">{hut?.latitude}</td>
            <td className="p-2 border border-zinc-500">{hut?.longitude}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
