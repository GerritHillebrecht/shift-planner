import { getClients } from "@/lib/data/clients";
import { getEmployees } from "@/lib/data/employees";
import Link from "next/link";

export default async function Page() {
  const clients = await getClients();
  const employees = await getEmployees();

  return (
    <div className="grid grid-cols-3">
      {clients.map((client) => (
        <Link
          href={`/client/${client.id}`}
          key={client.id}
          className="p-4 border"
        >
          <h2>
            {client.firstname} {client.lastname}
          </h2>
          <p>{client.email}</p>
          <p>{client.phone_number}</p>
        </Link>
      ))}
      {employees.map((employee) => (
        <Link
          href={`/employee/${employee.id}`}
          key={employee.id}
          className="p-4 border"
        >
          <h2>
            {employee.firstname} {employee.lastname}
          </h2>
          <p>{employee.email}</p>
          <p>{employee.phone_number}</p>
        </Link>
      ))}
    </div>
  );
}
