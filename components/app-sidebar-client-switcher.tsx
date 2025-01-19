import { Client } from "@/models/clients";
import gtibLogo from "@/public/images/gtib_logo.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

interface ClientSwitcherProps {
  clients?: Client[];
  activeClient: Client | null;
  setActiveClient: (client: Client) => void;
}

export function ClientSwitcher({
  clients,
  activeClient,
  setActiveClient,
}: ClientSwitcherProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="gap-4">
              <Image src={gtibLogo} alt="GTIB Logo" width={24} height={24} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeClient?.firstname || "Klienten"}
                </span>
                <span className="truncate text-xs">
                  {activeClient?.lastname}
                </span>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-popper-anchor-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Klienten
            </DropdownMenuLabel>
            {clients
              ?.toSorted((a, b) => {
                if (a.firstname < b.firstname) {
                  return -1;
                }
                if (a.firstname > b.firstname) {
                  return 1;
                }
                return 0;
              })
              .map((client, index) => (
                // <Link key={index} href={`/calendar/client/${client.id}`}>
                <DropdownMenuItem
                  key={client.id}
                  onClick={() => {
                    setActiveClient(client)
                    window.history.pushState({}, '', `/calendar/client/${client.id}`)
                  }}
                  className="gap-2 p-2"
                >
                  {client.firstname} {client.lastname}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
                // </Link>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
