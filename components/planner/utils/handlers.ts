import { AddShift, deleteShift } from "@/lib/data/shifts";
import { Client, Employee, ServiceRequirement, Shift } from "@/models";
import dayjs, { type Dayjs } from "dayjs";
import { toast } from "sonner";

interface HandleDateClickProps {
  isDateInShifts;
  shifts: Shift[];
  employee: Employee;
  currentDate: Dayjs;
  serviceRequirement: ServiceRequirement;
  activeClient: Client | null;
  setLoading: (loading: boolean) => void;
}

export async function handleDateClick(args: HandleDateClickProps) {
  const { isDateInShifts } = args;

  if (isDateInShifts) {
    return handleDeleteShift(args);
  }

  return handleAddShift(args);
}

export async function handleAddShift({
  currentDate,
  employee,
  serviceRequirement,
  activeClient,
  setLoading,
}: HandleDateClickProps) {
  const newShift: Omit<Shift, "id" | "created_at"> = {
    date: currentDate.toISOString(),
    employee_id: employee.id,
    requirement_id: serviceRequirement.id,
    client_id: activeClient!.id,
    start_time: serviceRequirement.start_time,
    end_time: serviceRequirement.end_time,
  };

  setLoading(true);
  await AddShift(newShift);
  setLoading(false);
}

export async function handleDeleteShift(args: HandleDateClickProps) {
  const { shifts, employee, currentDate, serviceRequirement, setLoading } =
    args;

  const shift = shifts.find(({ date, employee_id, requirement_id }) => {
    const dayjsDate = dayjs(date);

    return (
      employee_id === employee.id &&
      requirement_id === serviceRequirement.id &&
      dayjsDate > currentDate.startOf("day") &&
      dayjsDate < currentDate.endOf("day")
    );
  });

  if (!shift) {
    return;
  }

  if (confirm("Are you sure you want to delete this shift?")) {
    setLoading(true);
    await deleteShift(shift.id);
    setLoading(false);

    toast.success(
      `${employee.firstname} wird nicht am ${dayjs(shift.date)
        .locale("de")
        .format("dddd, DD.MM")} im ${serviceRequirement.service_name} arbeiten.`
    );
  }
}
