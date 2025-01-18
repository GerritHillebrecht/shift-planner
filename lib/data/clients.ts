import { Client } from "@/models/clients";
import { createClient } from "../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

type ClientByUUID = Promise<{
  data: Client;
  error: PostgrestError | null;
}>;

export async function getClientByUUID(clientId: string): ClientByUUID {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "*, team:teams(*, employees(*)), shifts(*), serviceRequirements(*, shifts(*, employees(*)))"
    )
    .eq("id", clientId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*, team:teams(*, employees(*))");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
