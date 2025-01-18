import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { getClients } from "@/lib/data/clients";
import { createClient } from "@/lib/supabase/server";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ clientId: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const supabase = await createClient();

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.getUser();

  if (supabaseError || !user) {
    redirect("/login");
  }

  const { clientId } = await params;

  const clients = await getClients();

  if (!clients.map((client) => client.id).includes(clientId)) {
    redirect("/");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} clients={clients} activeClientId={clientId} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-x-2 px-4 print:hidden">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      Klienten
                      <ChevronDown size={12} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {clients.map((client) => (
                        <DropdownMenuItem key={client.id}>
                          <BreadcrumbLink
                            href={`/calendar/client/${client.id}`}
                          >
                            {client.firstname} {client.lastname}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {
                      clients.find((client) => client.id === clientId)
                        ?.firstname
                    }
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="w-full px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
