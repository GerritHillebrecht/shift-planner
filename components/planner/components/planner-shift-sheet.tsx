import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shift } from "@/models";

export function PlannerShiftSheet({ shift }: { shift: Shift }) {
  return (
    <div className="py-4 grid gap-y-4">
      <div>
        <Label htmlFor="start_time">Start time</Label>
        <Input
          id="start_time"
          defaultValue={shift.start_time ?? "07:00"}
          type="time"
        />
      </div>
      <div>
        <Label htmlFor="end_time">End time</Label>
        <Input
          id="end_time"
          defaultValue={shift.end_time ?? "19:00"}
          type="time"
        />
      </div>
      {/* {shift.date} */}
    </div>
  );
}
