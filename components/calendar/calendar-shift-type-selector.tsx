"use client";

import { CalendarContext } from "@/context/calendar-context";
import { ServiceRequirement } from "@/models/service-requirements";
import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CalendarShiftTypeSelectorProps {
  serviceRequirements: ServiceRequirement[];
}

export function CalendarShiftTypeSelector({
  serviceRequirements,
}: CalendarShiftTypeSelectorProps) {
  const [serviceRequirement, setServiceRequirement] =
    useState<ServiceRequirement | null>(null);
    
  const context = useContext(CalendarContext);

  if (!context) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <div className="h-6 border-l border-t flex items-center justify-center">
          {/* {serviceRequirement?.service_name ===
            serviceRequirements?.[0]?.service_name && <Sun className="size-3" />}
          {serviceRequirement?.service_name ===
            serviceRequirements?.[1]?.service_name && <Moon className="size-3" />} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Dienst
        </DropdownMenuLabel>
        {serviceRequirements.map((serviceRequirement, index) => (
          <DropdownMenuItem
            key={serviceRequirement.service_name}
            onClick={() => setServiceRequirement(serviceRequirement)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              {serviceRequirement.service_name ===
                serviceRequirements?.[0]?.service_name && (
                <Sun className="size-4 shrink-0" />
              )}
              {serviceRequirement.service_name ===
                serviceRequirements?.[1]?.service_name && (
                <Moon className="size-4 shrink-0" />
              )}
            </div>
            {serviceRequirement.service_name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
