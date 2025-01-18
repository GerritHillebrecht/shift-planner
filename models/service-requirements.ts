import { Sun } from "lucide-react";
import { Shift } from "./shift";

export interface ServiceRequirement {
  id: string;
  service_name: string;
  description: string;
  color: string;
  icon: string;
  start_time: string;
  end_time: string;
  daysWithoutService?: number[];
  days_of_week: string;
  shifts: Shift[];
}
