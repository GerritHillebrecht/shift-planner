"use client";

import { Client } from "@/models/clients";
import { Moon, Sun } from "lucide-react";
import { createContext, useState } from "react";

const defaultClients: Client[] = [
  {
    id: "1",
    firstname: "Lucie",
    lastname: "Müller",
    daysWithoutService: [5, 6],
    serviceRequirements: [
      {
        service_name: "Tagdienst",
        description: "Tagdienst",
        color: "blue",
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg==",
        start_time: "08:00",
        end_time: "16:00",
        days_of_week: "0,1,2,3,4",
        shifts: [],
      },
      {
        service_name: "Nachtdienst",
        description: "Nachtdienst",
        color: "yellow",
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg==",
        start_time: "20:00",
        end_time: "06:00",
        days_of_week: "0,1,2,3,4",
        shifts: [],
      },
    ],
    shifts: [],
    team: [
      {
        team_name: "Team 1",
        employees: [
          {
            id: "1",
            firstname: "Tung",
            lastname: "Nguyen",
          },
          {
            id: "2",
            firstname: "Arzo",
            lastname: "Kabiri",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    firstname: "Hannah",
    lastname: "Schmidt",
    daysWithoutService: [],
    serviceRequirements: [],
    shifts: [],
    team: [
      {
        team_name: "Team 1",
        employees: [
          {
            id: "1",
            firstname: "Tung",
            lastname: "Nguyen",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    firstname: "Dennis",
    lastname: "Wagner",
    daysWithoutService: [],
    serviceRequirements: [],
    shifts: [],
    team: [
      {
        team_name: "Team 1",
        employees: [
          {
            id: "1",
            firstname: "Arzo",
            lastname: "Kabiri",
          },
        ],
      },
    ],
  },
];

export type CalendarContextType = {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  activeClient: Client;
  setActiveClient: (client: Client) => void;
};

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [activeClient, setActiveClient] = useState<Client>(clients[0]);

  return (
    <CalendarContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        clients,
        setClients,
        activeClient,
        setActiveClient,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
