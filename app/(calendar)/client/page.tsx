import { Card } from "@/components/ui/card";
import { getClients } from "@/lib/data/clients";
import Link from "next/link";

export default async function Page() {
  const clients = await getClients();

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {clients.map((client) => (
          <Link href={`/client/${client.id}`} key={client.id}>
            <Card className="p-6">
              <h2>
                {client.firstname} {client.lastname}
              </h2>
              <p>{client.email}</p>
              <p>{client.phone_number}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
