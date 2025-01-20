"use client";

import { Client, Workspace } from "@/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createContext, ReactNode, useContext, useState } from "react";
dayjs.extend(utc);

type WorkspaceContextType = {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
};

// Using type instead of interface for better inference in Next.js
type WorkspaceProviderProps = {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  children: ReactNode;
};

// Providing a default context value to avoid undefined checks
const defaultContextValue: WorkspaceContextType = {
  workspaces: [],
  activeWorkspace: null,
  setActiveWorkspace: (workspace: Workspace) => {},
  setWorkspaces: () => {},
  clients: [],
  setClients: () => {},
};

const WorkspaceContext =
  createContext<WorkspaceContextType>(defaultContextValue);

export function WorkspaceProvider({
  children,
  workspaces: initialWorkspaces,
  activeWorkspace: initialActiveWorkspace,
}: WorkspaceProviderProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(
    initialActiveWorkspace
  );
  const [clients, setClients] = useState<Client[]>(
    activeWorkspace?.clients || []
  );

  const value: WorkspaceContextType = {
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    setWorkspaces,
    clients,
    setClients,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// Custom hook with better error message for Next.js debugging
export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (context === defaultContextValue) {
    throw new Error(
      "useWorkspace must be used within a WorkspaceProvider. " +
        "Make sure to wrap your component tree with WorkspaceProvider."
    );
  }

  return context;
}
