"use server";

import { Shift } from "@/models/shift";
import { createClient } from "../supabase/server";

export async function AddShift(shift: Omit<Shift, "id">) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shifts")
    .insert(shift)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteShift(shiftId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shifts")
    .delete()
    .eq("id", shiftId)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  console.log("Schicht erfolgreich gelöscht:", data);
}

export async function getShifts(startDate: Date, endDate: Date) {
  const supabase = await createClient();

  return await supabase
    .from("shifts")
    .select("*")
    .gt("date", startDate.toISOString())
    .lte("date", endDate.toISOString());
}
