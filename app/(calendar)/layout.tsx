import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  // const clients = await getClients();

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.getUser();

  if (supabaseError || !user) {
    redirect("/auth/login");
  }

  return (
    // <SidebarProvider defaultOpen={defaultOpen}>
    //   <AppSidebar
    //     user={user}
    //     clients={clients}
    //     activeClientId={clients[0].id}
    //   />
    //   <SidebarInset>
    //     <header className="flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    //       <div className="flex items-center gap-x-2 px-4 print:hidden">
    //         <SidebarTrigger />
    //         <Separator orientation="vertical" className="mr-2 h-4" />
    //         <Breadcrumb>
    //           <BreadcrumbList>
    //             <BreadcrumbItem>
    //               <DropdownMenu>
    //                 <DropdownMenuTrigger className="flex items-center gap-1">
    //                   Klienten
    //                   <ChevronDown size={12} />
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="start">
    //                   {clients.map((client) => (
    //                     <DropdownMenuItem key={client.id}>
    //                       <BreadcrumbLink href={`/client/${client.id}`}>
    //                         {client.firstname} {client.lastname}
    //                       </BreadcrumbLink>
    //                     </DropdownMenuItem>
    //                   ))}
    //                 </DropdownMenuContent>
    //               </DropdownMenu>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator>
    //               <ChevronRight />
    //             </BreadcrumbSeparator>
    //             <BreadcrumbItem>
    //               <BreadcrumbPage>
    //                 {
    //                   clients.find((client) => client.id === clients[0].id)
    //                     ?.firstname
    //                 }
    //               </BreadcrumbPage>
    //             </BreadcrumbItem>
    //           </BreadcrumbList>
    //         </Breadcrumb>
    //       </div>
    //       <ModeToggle />
    //     </header>
    //     <main className="w-full px-6">
    children
    // </main>
    //  </SidebarInset>
    //</SidebarProvider>
  );
}
