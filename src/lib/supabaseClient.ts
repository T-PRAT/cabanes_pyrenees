import { Database } from "./database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.APP_SUPABASE_URL;
const supabaseKey = import.meta.env.APP_SUPABASE_KEY;

export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseKey as string
);
