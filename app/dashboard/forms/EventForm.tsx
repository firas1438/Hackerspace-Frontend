"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  EVENT_FORMAT_LABELS,
  EVENT_TYPE_LABELS,
  eventFormSchema,
  type EventFormData,
  type EventFormat,
  type EventType,
} from "@/lib/schemas/eventSchemas";

interface EventFormProps {
  defaultValues: EventFormData;
  onSubmit: (data: EventFormData) => void;
  isPending: boolean;
  submitLabel: string;
  cities: string[];
}

export function EventForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
  cities,
}: EventFormProps) {
  const SUMMARY_MAX = 150;

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const summaryValue = watch("summary") ?? "";

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Global AI Hackathon"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="summary">Summary</Label>
          <span
            className={`text-xs tabular-nums ${
              summaryValue.length >= 130
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {summaryValue.length}/{SUMMARY_MAX}
          </span>
        </div>
        <Textarea
          id="summary"
          rows={2}
          placeholder="Short overview on the event..."
          maxLength={SUMMARY_MAX}
          {...register("summary")}
        />
        {errors.summary ? (
          <p className="text-xs text-destructive">{errors.summary.message}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Appears on the event card and hero. Keep it concise.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Full details, rules, prizes, judges, agenda, etc."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                  }
                }}
                items={EVENT_TYPE_LABELS}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: EventType | null) =>
                      value ? EVENT_TYPE_LABELS[value] : "Select type"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map(
                    (type) => (
                      <SelectItem key={type} value={type}>
                        {EVENT_TYPE_LABELS[type]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label>Format</Label>
          <Controller
            control={control}
            name="format"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                  }
                }}
                items={EVENT_FORMAT_LABELS}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: EventFormat | null) =>
                      value ? EVENT_FORMAT_LABELS[value] : "Select format"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EVENT_FORMAT_LABELS) as EventFormat[]).map(
                    (format) => (
                      <SelectItem key={format} value={format}>
                        {EVENT_FORMAT_LABELS[format]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Choose a location"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-xs text-destructive">
              {errors.location.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>City</Label>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? "")}
                items={cities.map((city) => ({
                  label: city,
                  value: city,
                }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id="startDate"
            type="datetime-local"
            {...register("startDate")}
          />
          {errors.startDate && (
            <p className="text-xs text-destructive">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">End date</Label>
          <Input id="endDate" type="datetime-local" {...register("endDate")} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Cover Image</Label>
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <ImageUpload
              value={field.value ?? ""}
              onChange={(url) => field.onChange(url)}
              disabled={isPending}
            />
          )}
        />
        {errors.imageUrl && (
          <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="registrationUrl">Registration Form URL</Label>
        <Input
          id="registrationUrl"
          placeholder="https://forms.google.com/..."
          {...register("registrationUrl")}
        />
        {errors.registrationUrl && (
          <p className="text-xs text-destructive">
            {errors.registrationUrl.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          External form link (Google Forms, Microsoft Forms, Tally, etc.)
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="ML, Machine Learning, AI"
          {...register("tags")}
        />
        <p className="text-xs text-muted-foreground">
          Separate tags with commas.
        </p>
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
