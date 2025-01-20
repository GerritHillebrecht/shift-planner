import { Client } from "./clients";
import { Employee } from "./employees";

export interface Shift {
  id: string;
  start_time: string;
  end_time: string;
  date: string;
  requirement_id: string;
  employee_id: string;
  employee?: Employee;
  client_id: string;
  client?: Client;
}
