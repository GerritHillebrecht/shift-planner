import { Shift } from "./shift";
import { Tables } from "./supabase.types";

export interface ServiceRequirement extends Tables<"serviceRequirements"> {
  shifts?: Shift[];
}
