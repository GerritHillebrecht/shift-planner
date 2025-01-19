import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarInset } from "@/components/app-sidebar-inset";
import { Calendar } from "@/components/calendar/calendar";
import { CalendarProvider } from "@/components/calendar/provider";
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
import { ModeToggle } from "@/components/ui/theme-selector";
import { getClients } from "@/lib/data/clients";
import { createClient } from "@/lib/supabase/server";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error: supabaseError,
  } = await supabase.auth.getUser();

  if (supabaseError || !user) {
    return redirect("/auth/login");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <CalendarProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <AppSidebarInset>{children}</AppSidebarInset>
      </SidebarProvider>
    </CalendarProvider>
  );
}
