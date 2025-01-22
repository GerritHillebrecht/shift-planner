import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarInset } from "@/components/app-sidebar-inset";
import { PlannerProvider } from "@/provider";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
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
    <PlannerProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <AppSidebarInset>{children}</AppSidebarInset>
      </SidebarProvider>
    </PlannerProvider>
  );
}
