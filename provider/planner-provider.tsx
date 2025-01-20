"use client";

import { getAllClients } from "@/lib/data/clients";
import { getShifts } from "@/lib/data/shifts";
import { createClient } from "@/lib/supabase/client";
import { Client, Shift } from "@/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type PlannerContextType = {
  shifts: Shift[];
  clients: Client[];
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
  loading: boolean;
  error: string | null;
  selectedPerspective: string;
  setSelectedPerspective: (perspective: string) => void;
  selectedView: string;
  setSelectedView: (view: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  daysInView: number;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

// Using type instead of interface for better inference in Next.js
type PlannerProviderProps = {
  children: ReactNode;
  initialPerspective?: string;
  initialView?: string;
};

// Providing a default context value to avoid undefined checks
const defaultContextValue: PlannerContextType = {
  shifts: [],
  clients: [],
  activeClient: null,
  setActiveClient: () => {},
  loading: false,
  error: null,
  selectedPerspective: "week",
  setSelectedPerspective: () => {},
  selectedView: "week",
  setSelectedView: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  daysInView: 7,
  currentDate: new Date(),
  setCurrentDate: () => {},
};

const PlannerContext = createContext<PlannerContextType>(defaultContextValue);
const supabase = createClient();

export function PlannerProvider({
  children,
  initialPerspective = "week",
  initialView = "month",
}: PlannerProviderProps) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clients, setClients] = useState<Client[]>([]);

  const [activeClient, setActiveClient] = useState<Client | null>(
    defaultContextValue.activeClient
  );

  const [selectedPerspective, setSelectedPerspective] =
    useState(initialPerspective);
  const [selectedView, setSelectedView] = useState(initialView);

  const [startDate, setStartDate] = useState<Date>(() =>
    selectedView === "month"
      ? dayjs().startOf("month").toDate()
      : dayjs().startOf("week").toDate()
  );

  const [endDate, setEndDate] = useState<Date>(() =>
    selectedView === "month"
      ? dayjs().endOf("month").toDate()
      : dayjs().endOf("week").toDate()
  );

  const [daysInView, setDaysInView] = useState<number>(
    () => dayjs(endDate).diff(dayjs(startDate), "day") + 1
  );

  const [currentDate, setCurrentDate] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  useEffect(() => {
    setDaysInView(dayjs(endDate).diff(dayjs(startDate), "day") + 1);
  }, [startDate, endDate]);

  useEffect(() => {
    setEndDate(
      selectedView === "month"
        ? dayjs(startDate).endOf("month").toDate()
        : dayjs(startDate).endOf("week").toDate()
    );
  }, [selectedView, startDate]);

  const fetchShifts = async () => {
    setShifts([]);
    setLoading(true);
    setError(null);

    const { data: shifts, error } = await getShifts(startDate, endDate);

    if (error) {
      console.error("Error fetching shifts", error);
      setError(error.message);
    } else {
      console.log("Fetched shifts", shifts);
      setShifts(shifts);
    }

    setLoading(false);
  };

  const fetchClients = async () => {
    const { data: clients, error } = await getAllClients();

    if (error) {
      console.error("Error fetching clients", error);
      setError(error.message);
    } else {
      setClients(
        clients.sort((a, b) => {
          if (a.firstname < b.firstname) {
            return -1;
          }
          if (a.firstname > b.firstname) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle Shifts & subscription
  useEffect(() => {
    fetchShifts();

    const handleInsert = async (payload) => {
      const { data: shiftsJoined } = await supabase
        .from("shifts")
        .select(
          "*, employee:employees(*), client:clients(*), serviceRequirement:serviceRequirements(*)"
        )
        .eq("id", payload.new.id)
        .single();

      if (!shiftsJoined) {
        return;
      }

      setShifts((prev) => [...prev, shiftsJoined]);

      const name = `${shiftsJoined.employee.firstname} ${shiftsJoined.employee.lastname}`;
      const date = dayjs(shiftsJoined.date).locale("de").format("dddd, DD.MM");
      const service = shiftsJoined.serviceRequirement.service_name;
      const client = shiftsJoined.client.firstname;

      toast.success(`${name} arbeitet am ${date} bei ${client} im ${service}`);
    };

    const handleUpdate = (payload) => {
      setShifts((prev) =>
        prev.map((shift) => (shift.id === payload.new.id ? payload.new : shift))
      );
    };

    const handleDelete = (payload) => {
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
  }, [startDate, endDate]);

  const value: PlannerContextType = {
    shifts,
    clients,
    activeClient,
    setActiveClient,
    loading,
    error,
    selectedPerspective,
    setSelectedPerspective,
    selectedView,
    setSelectedView,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    daysInView,
    currentDate,
    setCurrentDate,
  };

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

// Custom hook with better error message for Next.js debugging
export function usePlanner() {
  const context = useContext(PlannerContext);

  if (context === defaultContextValue) {
    throw new Error(
      "usePlanner must be used within a PlannerProvider. " +
        "Make sure to wrap your component tree with PlannerProvider."
    );
  }

  return context;
}
