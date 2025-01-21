import { PlannerEmployeeView } from "@/components/planner/views/planner-employee-view";
import { getClientByUUID } from "@/lib/data/clients";

interface PageProps {
  params: Promise<{ clientId: string; lang: string }>;
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

  return (
    <div className="pb-4">
      <PlannerEmployeeView />
    </div>
  );
}
