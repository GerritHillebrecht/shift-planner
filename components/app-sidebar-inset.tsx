"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useCalendar } from "./calendar/provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./ui/theme-selector";
import { Calendar } from "./calendar/calendar";
import { ReactNode } from "react";
import Link from "next/link";

export function AppSidebarInset({ children }: { children: ReactNode }) {
  const { clients, activeClient } = useCalendar();
  return (
    <SidebarInset>
      <header className="flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                    {clients?.map((client) => (
                      <DropdownMenuItem key={client.id}>
                        <BreadcrumbLink asChild>
                          <Link replace={true} href={`/calendar/client/${client.id}`}>
                            {client.firstname} {client.lastname}
                          </Link>
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
                    activeClient?.firstname
                  }
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ModeToggle />
      </header>
      <main className="w-full px-6">
        <Calendar>{children}</Calendar>
      </main>
    </SidebarInset>
  );
}
