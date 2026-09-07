"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  EVENT_FORMAT_LABELS,
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
  defaultEventFilters,
  type EventFilters,
  type EventFormat,
  type EventStatus,
  type EventType,
} from "@/lib/schemas/eventSchemas";

interface FilterGroupProps<T extends string> {
  title: string;
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: FilterGroupProps<T>) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((option) => {
          const id = `${title}-${option.value}`;
          const isChecked = selected.includes(option.value);

          return (
            <div key={option.value} className="flex items-center gap-3">
              <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={() => onToggle(option.value)}
              />
              <Label htmlFor={id} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EventFiltersSidebarProps {
  filters: EventFilters;
  cities: string[];
  onFiltersChange: (filters: EventFilters) => void;
}

export function EventFiltersSidebar({
  filters,
  cities,
  onFiltersChange,
}: EventFiltersSidebarProps) {
  const toggleFilter = <T extends EventType | EventFormat | EventStatus | string>(
    key: keyof EventFilters,
    value: T,
  ) => {
    const current = filters[key] as T[];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    onFiltersChange({ ...filters, [key]: next });
  };

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.formats.length > 0 ||
    filters.cities.length > 0 ||
    filters.statuses.length > 0 ||
    filters.tags.length > 0;

  const typeOptions = (Object.keys(EVENT_TYPE_LABELS) as EventType[]).map(
    (type) => ({
      value: type,
      label: EVENT_TYPE_LABELS[type],
    }),
  );

  const formatOptions = (Object.keys(EVENT_FORMAT_LABELS) as EventFormat[]).map(
    (format) => ({
      value: format,
      label: EVENT_FORMAT_LABELS[format],
    }),
  );

  const statusOptions = (Object.keys(EVENT_STATUS_LABELS) as EventStatus[]).map(
    (status) => ({
      value: status,
      label: EVENT_STATUS_LABELS[status],
    }),
  );

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  return (
    <aside className="rounded-md bg-muted/50 p-5 ring-1 ring-foreground/5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium tracking-tight">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-xs normal-case tracking-normal"
            onClick={() => onFiltersChange(defaultEventFilters)}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <FilterGroup
          title="Event type"
          options={typeOptions}
          selected={filters.types}
          onToggle={(value) => toggleFilter("types", value)}
        />

        <Separator />

        <FilterGroup
          title="Format"
          options={formatOptions}
          selected={filters.formats}
          onToggle={(value) => toggleFilter("formats", value)}
        />

        <Separator />

        <FilterGroup
          title="Status"
          options={statusOptions}
          selected={filters.statuses}
          onToggle={(value) => toggleFilter("statuses", value)}
        />

        {cityOptions.length > 0 && (
          <>
            <Separator />
            <FilterGroup
              title="City"
              options={cityOptions}
              selected={filters.cities}
              onToggle={(value) => toggleFilter("cities", value)}
            />
          </>
        )}
      </div>
    </aside>
  );
}
