"use server";

import { Workspace } from "@/models";
import { createClient } from "../supabase/server";

export async function getWorkspaces(): Promise<Workspace[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workspace")
    .select(
      "*, clients(*, team:teams(*, employees:employees(*))), workspaceType:workspaceTypes(*)"
    )
    .order("workspace_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getWorkspaceTypes() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("workspaceTypes").select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
