import { createClient } from "@/lib/supabase/client";
import { Shift } from "@/models/shift";
import { Workspace } from "@/models/workspace";
import { useEffect, useState } from "react";

export const useWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchWorkspaces = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from("workspace").select("*");

    if (error) {
      setError(error.message);
      console.error("Error fetching workspaces", error);
    } else {
      setWorkspaces(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWorkspaces();

    const handleInsert = (payload: any) => {
      setWorkspaces((prev) => [...prev, payload.new]);
    };

    const handleUpdate = (payload: any) => {
      setWorkspaces((prev) =>
        prev.map((workspace) =>
          workspace.id === payload.new.id ? payload.new : workspace
        )
      );
    };

    const handleDelete = (payload: any) => {
      setWorkspaces((prev) =>
        prev.filter((workspace) => workspace.id !== payload.old.id)
      );
    };

    const eventHandlers = {
      INSERT: handleInsert,
      UPDATE: handleUpdate,
      DELETE: handleDelete,
    };

    const subscription = supabase
      .channel("workspaces")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workspaces",
        },
        (payload) => {
          const handler = eventHandlers[payload.eventType];
          if (handler) {
            handler(payload);
          } else {
            console.warn("Unhandled event type", payload.eventType);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return { workspaces, loading, error };
};

export const useShifts = (
  // client_id: Employee["id"],
  startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ),
  endDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  )
) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  const supabase = createClient();

  const fetchShifts = async () => {
    console.log(`fetching shifts for ${startDateStr} - ${endDateStr}`);
    console.log(
      `derived from for ${startDate.toISOString()} - ${endDate.toISOString()}`
    );
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("shifts")
      .select("*")
      .gt("date", startDateStr)
      .lte("date", endDateStr);

    if (error) {
      setError(error.message);
      console.error("Error fetching shifts", error);
    } else {
      setShifts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchShifts();

    const handleInsert = (payload: any) => {
      // if (payload.new.client_id === client_id) {
      setShifts((prev) => [...prev, payload.new]);
      // }
    };

    const handleUpdate = (payload: any) => {
      setShifts((prev) =>
        prev.map((shift) => (shift.id === payload.new.id ? payload.new : shift))
      );
    };

    const handleDelete = (payload: any) => {
      setShifts((prev) => prev.filter((shift) => shift.id !== payload.old.id));
    };

    const eventHandlers = {
      INSERT: handleInsert,
      UPDATE: handleUpdate,
      DELETE: handleDelete,
    };

    const subscription = supabase
      .channel("shifts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shifts",
        },
        (payload) => {
          const handler = eventHandlers[payload.eventType];
          if (handler) {
            handler(payload);
          } else {
            console.warn("Unhandled event type", payload.eventType);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [startDateStr, endDateStr]);

  return { shifts, loading, error };
};
