interface PageProps {
  params: Promise<{ employeeId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { employeeId } = await params;

  if (!employeeId) {
    return null;
  }

  return (
    <div>
      <h1>Employee</h1>
      <p>{employeeId}</p>
    </div>
  );
}
