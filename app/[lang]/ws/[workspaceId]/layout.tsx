import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/workspace-sidebar/workspace-sidebar";
import { WorkspaceSidebarInset } from "@/components/workspace-sidebar/workspace-sidebar-inset";
import { getWorkspaces } from "@/lib/data-access/workspace";
import { createClient } from "@/lib/supabase/server";
import { PlannerProvider, WorkspaceProvider } from "@/provider";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaces = await getWorkspaces();
  const { workspaceId } = await params;

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === workspaceId
  );

  if (!activeWorkspace) {
    return redirect("/ws");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user", error);
  }

  return (
    <WorkspaceProvider
      user={data.user!}
      workspaces={workspaces}
      activeWorkspace={activeWorkspace}
    >
      <PlannerProvider>
        <SidebarProvider>
          <AdminSidebar />
          <WorkspaceSidebarInset>{children}</WorkspaceSidebarInset>
        </SidebarProvider>
      </PlannerProvider>
    </WorkspaceProvider>
  );
}
