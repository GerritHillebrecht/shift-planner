import { getClientByUUID } from "@/lib/data-access/clients";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ clientId: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { clientId } = await params;

  if (!getClientByUUID(clientId)) {
    redirect("/calendar");
  }

  return children;
}
