"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  EVENT_FORMAT_LABELS,
  EVENT_TYPE_LABELS,
  type Event,
} from "@/lib/schemas/eventSchemas";

interface EventCardProps {
  event: Event;
  actions?: React.ReactNode;
}

function formatEventDate(startDate: string, endDate?: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const startLabel = start.toLocaleDateString("en-US", dateOptions);

  if (!end || Number.isNaN(end.getTime()) || start.toDateString() === end.toDateString()) {
    return startLabel;
  }

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", dateOptions)}`;
  }

  return `${startLabel} – ${end.toLocaleDateString("en-US", dateOptions)}`;
}

export function EventCard({ event, actions }: EventCardProps) {
  const imageUrl = event.imageUrl || "/fallback.png";
  const isRemoteImage = Boolean(imageUrl.startsWith("http"));

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md bg-muted ring-1 ring-foreground/5 transition-shadow hover:shadow-md">
      <Link href={`/events/${event.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-16/10 overflow-hidden bg-primary/15">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            unoptimized={isRemoteImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 z-10">
            <Badge className="rounded-full bg-background/90 px-2.5 py-1 text-[0.625rem] normal-case tracking-wide text-foreground">
              {EVENT_TYPE_LABELS[event.type]}
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full bg-primary/90 px-2.5 py-1 text-[0.625rem] normal-case tracking-wide text-primary-foreground"
            >
              {EVENT_FORMAT_LABELS[event.format]}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
              {event.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {event.summary || event.description}
            </p>
          </div>

          <div className="mt-auto space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0" strokeWidth={1.5} />
              <span>{formatEventDate(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
              <span>
                {event.location}, {event.city}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {actions ? (
        <div className="mx-5 mb-5 sm:mx-6 sm:mb-6 flex items-center justify-between border-t border-foreground/10 pt-4">
          {actions}
        </div>
      ) : null}
    </article>
  );
}
