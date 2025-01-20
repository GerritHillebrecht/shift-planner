import { Planner } from "@/components/planner/planner";
import { ReactNode } from "react";

export default function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Planner>{children}</Planner>;
}
