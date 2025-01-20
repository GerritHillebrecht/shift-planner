"use client";

import Link from "next/link";
import { CalendarClientBlock } from "../components/block/client-block";
import { useCalendar } from "../provider";

export function CalendarClientView() {
  const { clients } = useCalendar();

  return (
    <div className="grid gap-4">
      {clients?.map((client) => (
        <Link
          replace={false}
          href={`/calendar/client/${client.id}`}
          key={client.id}
        >
          <CalendarClientBlock client={client} />
        </Link>
      ))}
    </div>
  );
}
