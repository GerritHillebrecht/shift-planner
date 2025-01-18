import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekdayFromDate() {
  const cache: { [key: string]: any } = {};

  return function (currentMonth: Date, day: number) {
    const cacheKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${day}`;

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const weekday = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).getDay();

    cache[cacheKey] = weekday;

    return weekday;
  };
}
