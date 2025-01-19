import { Employee } from "./employees";

export interface Team {
  id: string;
  team_name: string;
  employees: Employee[];
}
