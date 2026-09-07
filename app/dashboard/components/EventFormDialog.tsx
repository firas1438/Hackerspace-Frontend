"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Event, EventFormData } from "@/lib/schemas/eventSchemas";
import { useCreateEvent, useUpdateEvent } from "../api/useEventMutations";
import { useCities } from "../api/useCities";
import { emptyEventFormValues, eventToFormValues } from "../lib/eventForm";
import { EventForm } from "../forms/EventForm";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
}

export function EventFormDialog({
  open,
  onOpenChange,
  event,
}: EventFormDialogProps) {
  const isEditing = Boolean(event);
  const createEvent = useCreateEvent(() => onOpenChange(false));
  const updateEvent = useUpdateEvent(() => onOpenChange(false));
  const { data: cities = [] } = useCities();

  const handleSubmit = (data: EventFormData) => {
    if (event) {
      updateEvent.mutate({ id: event.id, data });
      return;
    }
    createEvent.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit event" : "New event"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of this event."
              : "Create an event that will appear on the public listing."}
          </DialogDescription>
        </DialogHeader>
        <EventForm
          key={event?.id ?? "new"}
          defaultValues={event ? eventToFormValues(event) : emptyEventFormValues}
          onSubmit={handleSubmit}
          isPending={createEvent.isPending || updateEvent.isPending}
          submitLabel={isEditing ? "Save changes" : "Create event"}
          cities={cities}
        />
      </DialogContent>
    </Dialog>
  );
}

