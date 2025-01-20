import { ServiceRequirement } from "./service-requirements";
import { Shift } from "./shift";
import { Tables } from "./supabase.types";
import { Team } from "./team";

export interface Client extends Tables<"clients"> {
  team?: Team[];
  shifts?: Shift[];
  serviceRequirements?: ServiceRequirement[];
}
