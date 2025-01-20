import { Client } from "./clients";
import { Tables } from "./supabase.types";

export interface Workspace extends Tables<"workspace"> {
  workspaceType?: Tables<"workspaceTypes">;
  clients?: Client[];
}
