"use client";

import { ChevronRight, Plus, User as UserIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Client } from "@/models/clients";
import { useState } from "react";
import { ClientSwitcher } from "./app-sidebar-client-switcher";
import { AppSidebarFooter } from "./app-siderbar-footer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { UserResponse } from "@supabase/supabase-js";

interface AppSidebarProps {
  clients: Client[];
  activeClientId: string;
  user: UserResponse["data"]["user"];
}

export function AppSidebar({ clients, activeClientId, user }: AppSidebarProps) {
  const [activeClient, setActiveClient] = useState<Client>(
    clients.find((client) => client.id === activeClientId)!
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ClientSwitcher
          clients={clients}
          activeClient={activeClient}
          setActiveClient={setActiveClient}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mitarbeiter</SidebarGroupLabel>
          <SidebarGroupAction title="Mitarbeiter hinzufügen">
            <Plus /> <span className="sr-only">Mitarbeiter hinzufügen</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeClient.team?.map((team, index) => (
                <Collapsible
                  defaultOpen={true}
                  asChild
                  className="group/collapsible"
                  key={index}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={team.team_name}>
                        <UserIcon />
                        <span>{team.team_name}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {team.employees?.map((teamMember) => (
                          <SidebarMenuSubItem key={teamMember.id}>
                            <SidebarMenuSubButton asChild>
                              <a href={teamMember.id}>
                                <span>
                                  {teamMember.firstname} {teamMember.lastname}
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
