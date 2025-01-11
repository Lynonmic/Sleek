"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  Circle,
  HelpCircle,
  LucideIcon,
  ChevronsUpDown,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const statuses: Status[] = [
  {
    value: "khachhang",
    label: "Customer",
    icon: HelpCircle,
  },
  {
    value: "quanly",
    label: "Manager",
    icon: Circle,
  },
  {
    value: "admin",
    label: "Admin",
    icon: ArrowUpCircle,
  },
];

interface ComboboxPopoverProps {
  onChange: (value: string) => void;
  value: string;
}

export function ComboboxPopover({
  onChange,
  value,
  options,
}: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses.find((status) => status.value === value) || null
  );

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set status</>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value: string) => {
                      const selected =
                        statuses.find((s) => s.value === value) || null;
                      setSelectedStatus(selected);
                      onChange(value);
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
