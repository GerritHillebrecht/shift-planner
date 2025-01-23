import { Shift } from "@/models";

export function PlannerShiftSheet({ shift }: { shift: Shift }) {
  return <div className="py-4">{shift.date}</div>;
}
