import { Tables } from "./supabase.types";

export interface Shift extends Tables<"shifts"> {
  employee?: Tables<"employees">;
  client?: Tables<"clients">;
}
