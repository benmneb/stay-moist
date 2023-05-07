import { config } from "dotenv/mod.ts";
import { createClient } from "supabase";

config({ safe: true, export: true });

const SUPABASE_URL = String(Deno.env.get("SUPABASE_URL"));
const SUPABASE_KEY = String(Deno.env.get("SUPABASE_KEY"));

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
