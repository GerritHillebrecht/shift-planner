"use client";

import { ReactNode, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { PlannerContainer } from "./components/planner-container";
import { PlannerToolbar } from "./components/planner-toolbar";
import { usePlanner } from "@/provider";
import { useParams } from "next/navigation";

interface PlannerProps {
  className?: string;
  children?: ReactNode;
  view?: "month" | "week";
  perspective?: "employee" | "client";
}

export function Planner({ className, children }: PlannerProps) {
  const { loading, activeClient, setActiveClient, clients } = usePlanner();
  const params = useParams();

  useEffect(() => {
    if (params.clientId) {
      const client = clients.find((client) => client.id === params.clientId);

      if (client) {
        setActiveClient(client);
      }
    }
  }, [params.clientId]);

  useEffect(() => {
    if (clients.length > 0 && params.clientId) {
      const client = clients.find((client) => client.id === params.clientId);

      if (client) {
        setActiveClient(client);
      }
    }
  }, [clients]);

  return (
    <>
      {loading && (
        <Skeleton className="absolute top-0 inset-x-0 h-1 bg-primary/60 z-50"></Skeleton>
      )}
      <PlannerContainer className={className}>
        {activeClient && (
          <div className="mt-4">
            <h1 className="block text-base leading-none tracking-[-0.5px] font-light uppercase opacity-50">
              {activeClient.firstname} {activeClient.lastname}
            </h1>
          </div>
        )}
        <PlannerToolbar className="my-6" />
        {children}
      </PlannerContainer>
    </>
  );
}
