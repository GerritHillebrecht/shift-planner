"use client";

import Link from "next/link";
import { PlannerClientBlock } from "../components/block/planner-client-block";
import { usePlanner } from "@/provider";
import { useWorkspace } from "@/provider/workspace-provider";

export function PlannerClientView() {
  const { clients } = usePlanner();
  const { activeWorkspace } = useWorkspace();

  return (
    <div className="grid gap-4">
      {clients?.map((client) => (
        <Link replace={false} href={`/ws/${activeWorkspace!.id}/${client.id}`} key={client.id}>
          <PlannerClientBlock client={client} />
        </Link>
      ))}
    </div>
  );
}
