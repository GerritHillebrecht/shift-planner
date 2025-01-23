"use client";

import { usePlanner, useWorkspace } from "@/provider";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Planner } from "../planner/planner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FullscreenToggle } from "../ui/fullscreen-selector";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ui/theme-selector";

export function WorkspaceSidebarInset({ children }: { children: ReactNode }) {
  const { clients, activeClient } = usePlanner();
  const { activeWorkspace } = useWorkspace();

  return (
    <SidebarInset>
      <header className="print:hidden flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-x-2 px-4">
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
                    <DropdownMenuItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/ws/${activeWorkspace?.id}`}>
                          Übersicht
                        </Link>
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                    <Separator />
                    {clients?.map((client) => (
                      <DropdownMenuItem key={client.id}>
                        <BreadcrumbLink asChild>
                          <Link
                            href={`/ws/${activeWorkspace?.id}/${client.id}`}
                          >
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
                <BreadcrumbPage>{activeClient?.firstname}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-x-2">
          <FullscreenToggle />
          <ModeToggle />
        </div>
      </header>
      <main className="w-full px-4">
        <Planner>{children}</Planner>
      </main>
    </SidebarInset>
  );
}
