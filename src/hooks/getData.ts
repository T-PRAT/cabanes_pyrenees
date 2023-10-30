import { supabase } from "../lib/supabaseClient";

export async function getHuts() {
  const { data, error } = await supabase.from("hut").select("*");
  if (error) console.log("error", error);
  else return data;
}

export async function getHut(id: number) {
  const { data, error } = await supabase
    .from("hut")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("error", error);
  else return data;
}
