import { getClientByUUID, getClients } from "@/lib/data/clients";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
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

  return (
    // <SidebarProvider defaultOpen={defaultOpen}>
    //   <AppSidebar user={user} clients={clients} activeClientId={clientId} />
    //   <SidebarInset>
    //     <header className="print:hidden flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    //       <div className="flex items-center gap-x-2 px-4">
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
    //                   clients.find((client) => client.id === clientId)
    //                     ?.firstname
    //                 }
    //               </BreadcrumbPage>
    //             </BreadcrumbItem>
    //           </BreadcrumbList>
    //         </Breadcrumb>
    //       </div>
    //       <ModeToggle />
    //     </header>
    //     <main className="w-full px-6">{
    children
    //     }</main>
    //   </SidebarInset>
    // </SidebarProvider>
  );
}
