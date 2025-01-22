"use client";

import { ChevronRight, User2 } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useWorkspace } from "../../../../provider/workspace-provider";

export function NavClients() {
  const { clients } = useWorkspace();

  return clients.map((client, index) => (
    <SidebarGroup key={client.id}>
      <SidebarGroupLabel>
        {client.firstname} {client.lastname}
      </SidebarGroupLabel>
      <SidebarMenu>
        {client.team?.map((team) => (
          <Collapsible
            key={team.id}
            asChild
            defaultOpen={index === 0}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={team.team_name}>
                  <User2 />
                  <span>{team.team_name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href={team.id}>
                        <span>Dienstplan</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {team.employees?.map((employee) => (
                    <SidebarMenuSubItem key={employee.id}>
                      <SidebarMenuSubButton asChild>
                        <a href={employee.id}>
                          <span>
                            {employee.firstname} {employee.lastname}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
