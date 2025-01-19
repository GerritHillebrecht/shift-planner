import { Calendar } from "@/components/calendar/calendar";
import { getClients } from "@/lib/data/clients";

export default async function Page() {
  const clients = await getClients();

  return (
    <div>
      <h1>Calendar</h1>
      {/* <Calendar perspective="client" /> */}
    </div>
  );
}
