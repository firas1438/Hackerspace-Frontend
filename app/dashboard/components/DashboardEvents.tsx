"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarOff, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type Event } from "@/lib/schemas/eventSchemas";
import { EventCard } from "@/app/events/components/EventCard";
import { EventsPagination } from "@/app/events/components/EventsPagination";
import { useDeleteEvent } from "../api/useEventMutations";
import { useMyEvents } from "../api/useMyEvents";
import { EventFormDialog } from "./EventFormDialog";

function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md ring-1 ring-foreground/5">
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-4 h-4 w-1/2" />
      </div>
    </div>
  );
}

export function DashboardEvents() {
  const [page, setPage] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const { data, isLoading, isError } = useMyEvents(page);
  const deleteEvent = useDeleteEvent(() => setDeletingEvent(null));

  const events = data?.content ?? [];

  const openCreate = () => {
    setEditingEvent(null);
    setFormOpen(true);
  };

  const openEdit = (event: Event) => {
    if (event.status === "PAST") {
      return;
    }
    setEditingEvent(event);
    setFormOpen(true);
  };

  const renderActions = (event: Event) => {
    const isPast = event.status === "PAST";

    return (
      <div className="flex w-full items-center justify-between gap-2">
        <Link href={`/events/${event.id}`}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-full px-3 text-xs"
          >
            <Eye className="size-3.5" />
            View
          </Button>
        </Link>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isPast}
            title={
              isPast
                ? "Past events cannot be modified"
                : "Edit event"
            }
            onClick={() => openEdit(event)}
            className="h-8 gap-1.5 rounded-full px-3 text-xs"
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            title="Delete event"
            onClick={() => setDeletingEvent(event)}
            className="h-8 gap-1.5 rounded-full px-3 text-xs"
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Your events
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Create and manage the events that appear on the public listing.
          </p>
        </div>
        <Button onClick={openCreate} className="rounded-full">
          <Plus />
          New event
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">Could not load your events.</p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center rounded-md bg-background px-6 py-16 text-center ring-1 ring-foreground/5">
          <h3 className="text-xl font-medium tracking-tight">No events yet</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Create your first event to show it on the public listing.
          </p>
          <CalendarOff
            className="mt-6 size-10 text-muted-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                actions={renderActions(event)}
              />
            ))}
          </div>
          <EventsPagination
            page={page}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
          />
        </>
      )}

      <EventFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setEditingEvent(null);
          }
        }}
        event={editingEvent}
      />

      <AlertDialog
        open={Boolean(deletingEvent)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingEvent(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              {deletingEvent
                ? `"${deletingEvent.title}" will be removed from the public listing.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteEvent.isPending}
              onClick={() => {
                if (deletingEvent) {
                  deleteEvent.mutate(deletingEvent.id);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
