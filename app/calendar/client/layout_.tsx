import { Calendar } from "@/components/calendar/calendar";
import { ReactNode } from "react";

export default function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Calendar>{children}</Calendar>;
}
