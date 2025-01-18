import { ServiceRequirement } from "./service-requirements";
import { Shift } from "./shift";
import { Team } from "./team";

export interface Client {
  id: string;
  firstname: string;
  lastname: string;
  team: Team[];
  serviceRequirements: ServiceRequirement[];
  daysWithoutService: number[];
  shifts: Shift[];
  email?: string;
  phone_number?: string;
}
