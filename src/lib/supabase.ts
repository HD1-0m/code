import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://etiqnycmxgvdhnydusjs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0aXFueWNteGd2ZGhueWR1c2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzg5ODcsImV4cCI6MjA3Nzc1NDk4N30.IvwK1buoNMvr-FTLEoP1YHpFTarPVOqiyRPZfTDrynI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
