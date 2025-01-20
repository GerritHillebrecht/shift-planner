import {
  SidebarProvider
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/workspace-sidebar/workspace-sidebar";
import { WorkspaceSidebarInset } from "@/components/workspace-sidebar/workspace-sidebar-inset";
import { getWorkspaces } from "@/lib/data/workspace";
import { PlannerProvider } from "@/provider";
import { WorkspaceProvider } from "@/provider/workspace-provider";
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

  return (
    <WorkspaceProvider
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
