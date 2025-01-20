import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/workspace-sidebar/workspace-sidebar";
import { getWorkspaces } from "@/lib/data/workspace";
import { WorkspaceProvider } from "@/provider/workspace-provider";
import { redirect } from "next/navigation";
import { Planner } from "@/components/planner/planner";
import { PlannerProvider } from "@/provider";
import { WorkspaceSidebarInset } from "@/components/workspace-sidebar/workspace-sidebar-inset";

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
