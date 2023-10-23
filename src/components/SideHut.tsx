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
  return <div>{hut?.name}</div>;
}
