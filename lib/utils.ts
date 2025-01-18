import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekdayFromDate() {
  const cache: { [key: string]: Date | string | number } = {};

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
