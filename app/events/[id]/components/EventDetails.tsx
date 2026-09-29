"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Globe,
  MapPin,
  Tag,
} from "lucide-react";
import Wrapper from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  EVENT_FORMAT_LABELS,
  EVENT_TYPE_LABELS,
} from "@/lib/schemas/eventSchemas";
import { useEvent } from "../../api/useEvents";

interface EventDetailsProps {
  id: string;
}

function formatEventDate(startDate: string, endDate?: string | null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (Number.isNaN(start.getTime())) return startDate;

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  const startFormatted = start.toLocaleDateString("en-US", dateOptions);
  const startTimeFormatted = start.toLocaleTimeString("en-US", timeOptions);

  if (!end || Number.isNaN(end.getTime()) || start.toDateString() === end.toDateString()) {
    return `${startFormatted} at ${startTimeFormatted}`;
  }

  const endFormatted = end.toLocaleDateString("en-US", dateOptions);
  const endTimeFormatted = end.toLocaleTimeString("en-US", timeOptions);

  return `${startFormatted} (${startTimeFormatted}) – ${endFormatted} (${endTimeFormatted})`;
}

export function EventDetails({ id }: EventDetailsProps) {
  const router = useRouter();
  const { data: event, isLoading, isError } = useEvent(id);

  const imageUrl = event?.imageUrl || "/fallback.png";
  const isRemoteImage = Boolean(imageUrl.startsWith("http"));
  const isPast = event?.status === "PAST";
  const organizerName = event?.organizerName;
  const organizerLogoUrl = event?.organizerLogoUrl;
  const organizerWebsite = event?.organizerWebsite;
  const organizerBio = event?.organizerBio;

  return (
    <div className="w-full bg-background text-foreground">
      <section className="relative min-h-[52vh] w-full overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern2.png')] bg-cover bg-center bg-no-repeat opacity-20"
        />

        {isLoading ? (
          <Wrapper className="relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-28">
            <div className="flex flex-col gap-6">
              <Skeleton className="h-4 w-28 bg-primary-foreground/20" />
              <div className="max-w-4xl space-y-6">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full bg-primary-foreground/20" />
                  <Skeleton className="h-6 w-20 rounded-full bg-primary-foreground/20" />
                </div>
                <Skeleton className="h-6 w-3/4 bg-primary-foreground/20" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-primary-foreground/20" />
                  <Skeleton className="h-5 w-1/2 bg-primary-foreground/20" />
                </div>
              </div>
            </div>
          </Wrapper>
        ) : isError || !event ? (
          <Wrapper className="relative z-10 flex min-h-screen flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="mx-auto size-20 text-primary-foreground/75" strokeWidth={1.5} />
            <h1 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">Event not found</h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-primary-foreground/75">
              The event you are looking for does not exist or may have been removed.
            </p>
            <Link
              href="/events"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "mt-8 rounded-full px-6 py-6 text-sm font-medium",
              )}
            >
              <ArrowLeft className="mr-2 size-5" />
              Back to events
            </Link>
          </Wrapper>
        ) : (
          <Wrapper className="relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pb-14 lg:pt-24">
            <div className="flex flex-col gap-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="w-fit h-auto p-0 text-sm font-medium text-primary-foreground/80 hover:bg-transparent hover:text-primary-foreground capitalize"
              >
                <ArrowLeft className="mr-1 size-4" />
                Return
              </Button>

              <div className="max-w-4xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-background/90 px-3 py-1 text-xs normal-case tracking-wide text-foreground">
                    {EVENT_TYPE_LABELS[event.type]}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs normal-case tracking-wide text-primary-foreground"
                  >
                    {EVENT_FORMAT_LABELS[event.format]}
                  </Badge>
                </div>

                <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {event.title}{event.status ? ` [${event.status}]` : ""}
                </h1>

                {event.summary ? (
                  <p className="text-lg leading-relaxed text-primary-foreground/85">
                    {event.summary}
                  </p>
                ) : null}
              </div>
            </div>
          </Wrapper>
        )}
      </section>

      {!isLoading && !isError && event ? (
        <Wrapper className="py-10 lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="relative aspect-16/9 overflow-hidden rounded-md bg-muted ring-1 ring-foreground/5">
                <Image
                  src={imageUrl}
                  alt={event.title}
                  fill
                  priority
                  unoptimized={isRemoteImage}
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-medium tracking-tight">About this event</h2>
                <div className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                  {event.description}
                </div>
              </div>
            </div>

            <div className="w-full shrink-0 space-y-6 lg:w-80 xl:w-96">
              <div className="space-y-4 rounded-md bg-muted/40 p-6 ring-1 ring-foreground/5">
                <h3 className="text-lg font-medium tracking-tight">Host information</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border">
                    {organizerLogoUrl ? (
                      <AvatarImage src={organizerLogoUrl} alt={organizerName ?? ""} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                      {(organizerName || "Host").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-foreground">
                      {organizerName || "Event Organizer"}
                    </p>
                    {organizerWebsite ? (
                      <a
                        href={organizerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        <Globe className="size-3.5" />
                        Visit Website
                      </a>
                    ) : null}
                  </div>
                </div>
                {organizerBio ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {organizerBio}
                  </p>
                ) : null}
              </div>

              <div className="space-y-6 rounded-md bg-muted/40 p-6 ring-1 ring-foreground/5">
                <h3 className="text-lg font-medium tracking-tight">Event information</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Date &amp; Time</p>
                      <p className="text-muted-foreground">
                        {formatEventDate(event.startDate, event.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">
                        {event.location}, {event.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {event.tags && event.tags.length > 0 ? (
                <div className="space-y-4 rounded-md bg-muted/40 p-6 ring-1 ring-foreground/5">
                  <h3 className="text-lg font-medium tracking-tight">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full bg-background px-3 py-1 text-xs font-normal"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {event.registrationUrl ? (
                isPast ? (
                  <Button disabled className="w-full rounded-full" size="lg">
                    Registration closed
                  </Button>
                ) : (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full rounded-full py-6 text-sm font-medium shadow-sm",
                    )}
                  >
                    Register for event
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                )
              ) : null}
            </div>
          </div>
        </Wrapper>
      ) : isLoading ? (
        <Wrapper className="py-10 lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="min-w-0 flex-1 space-y-8">
              <Skeleton className="aspect-16/9 w-full rounded-md" />
              <div className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>

            <div className="w-full shrink-0 space-y-6 lg:w-80 xl:w-96">
              <div className="space-y-4 rounded-md bg-muted/40 p-6 ring-1 ring-foreground/5">
                <Skeleton className="h-5 w-36" />
                <div className="flex items-center gap-3">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>

              <div className="space-y-4 rounded-md bg-muted/40 p-6 ring-1 ring-foreground/5">
                <Skeleton className="h-5 w-40" />
                <div className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 size-5 rounded" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Skeleton className="mt-0.5 size-5 rounded" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </Wrapper>
      ) : null}
    </div>
  );
}


