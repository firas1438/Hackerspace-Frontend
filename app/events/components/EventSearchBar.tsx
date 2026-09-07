"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EventSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function EventSearchBar({ value, onChange }: EventSearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/60" />
      <Input
        type="search"
        placeholder="Search events by name, location, or keyword..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 border-0 border-b border-primary-foreground/30 bg-transparent pl-7 text-base text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-primary-foreground md:text-base"
      />
    </div>
  );
}
