import { Employee } from "./employees";
import { Tables } from "./supabase.types";

export interface Team extends Tables<"teams"> {
  employees?: Employee[];
}
