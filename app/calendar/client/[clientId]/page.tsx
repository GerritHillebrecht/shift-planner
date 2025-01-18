import { Calendar } from "@/components/calendar/calendar";
import { getClientByUUID } from "@/lib/data/clients";

type Props = {
  params: Promise<{ clientId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { clientId } = await params;
  const { data: client } = await getClientByUUID(clientId);

  return {
    title: `${client.firstname} ${client.lastname} - Dienstplan`,
  };
}

export default async function Page({
  params,
}: {
  params: { clientId?: string };
}) {
  const { clientId } = await params;

  if (!clientId) {
    return null;
  }

  const { data: activeClient } = await getClientByUUID(clientId);

  return (
    <div className="pb-4">
      <h1 className="text-3xl">{activeClient.firstname}</h1>
      <p className="mb-4">{activeClient.lastname}</p>
      <Calendar activeClient={activeClient} />
    </div>
  );
}
