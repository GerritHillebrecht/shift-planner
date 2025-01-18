import { UserResponse } from "@supabase/supabase-js";
import { ChevronUp, LogOut, User2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export function AppSidebarFooter({
  user,
}: {
  user: UserResponse["data"]["user"];
}) {
  const supabase = createClient();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton tooltip={user?.email}>
              <User2 /> {user?.email}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {/* <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Button onClick={() => supabase.auth.signOut().then(() => redirect("/"))} variant={"link"}>
                <LogOut className="" />
                Sign out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
