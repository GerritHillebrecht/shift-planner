import { PlannerEmployeeView } from "@/components/planner/views/planner-employee-view";
import { getClientByUUID } from "@/lib/data-access/clients";

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { clientId } = await params;
  const { data: client } = await getClientByUUID(clientId);

  return {
    title: `${client.firstname} ${client.lastname} - Dienstplan`,
  };
}

export default async function Page({ params }: PageProps) {
  const { clientId } = await params;

  if (!clientId) {
    return null;
  }

  const { data: activeClient } = await getClientByUUID(clientId);

  return (
    <div className="pb-4">
      <h1 className="text-3xl">{activeClient.firstname}</h1>
      <p className="mb-4">{activeClient.lastname}</p>
      <PlannerEmployeeView />
    </div>
  );
}
