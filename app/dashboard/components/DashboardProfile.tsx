"use client";

import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "../api/useProfile";
import { ProfileForm } from "../forms/ProfileForm";

export function DashboardProfile() {
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Your profile
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Organization details for the events you publish.
        </p>
      </div>

      {isError && (
        <p className="text-sm text-destructive">Could not load your profile.</p>
      )}

      {isLoading || !profile ? (
        <Skeleton className="h-80 w-full max-w-7xl" />
      ) : (
        <div className="max-w-7xl rounded-md bg-background ring-1 ring-foreground/5">
          <CardContent className="p-6 sm:p-8">
            <ProfileForm key={profile.id} profile={profile} />
          </CardContent>
        </div>
      )}
    </div>
  );
}
