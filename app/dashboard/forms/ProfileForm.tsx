"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  profileSchema,
  type Profile,
  type ProfileFormData,
} from "@/lib/schemas/profileSchemas";
import { useUpdateProfile } from "../api/useProfile";

interface ProfileFormProps {
  profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: profile.email,
      organizationName: profile.organizationName ?? "",
      bio: profile.bio ?? "",
      logoUrl: profile.logoUrl ?? "",
      website: profile.website ?? "",
    },
  });

  const logoUrl = watch("logoUrl");
  const organizationName = watch("organizationName");

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-5 border-b pb-6">
        <Avatar className="size-20 border ring-2 ring-primary/10">
          {logoUrl ? <AvatarImage src={logoUrl} alt="" className="object-cover" /> : null}
          <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
            {(organizationName || profile.email).slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            {organizationName || "Organization Profile"}
          </h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="organizationName">Organization name</Label>
          <Input
            id="organizationName"
            placeholder="1337 Club"
            {...register("organizationName")}
          />
          {errors.organizationName && (
            <p className="text-xs text-destructive">
              {errors.organizationName.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" disabled {...register("email")} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          rows={4}
          placeholder="Tell people who you are and what you organize."
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-xs text-destructive">{errors.bio.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input
          id="logoUrl"
          placeholder="https://..."
          {...register("logoUrl")}
        />
        {errors.logoUrl && (
          <p className="text-xs text-destructive">{errors.logoUrl.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          placeholder="https://your-club.com"
          {...register("website")}
        />
        {errors.website && (
          <p className="text-xs text-destructive">{errors.website.message}</p>
        )}
      </div>

      <div className="flex justify-start pt-2">
        <Button type="submit" disabled={updateProfile.isPending} className="rounded-full px-6">
          {updateProfile.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save profile"
          )}
        </Button>
      </div>
    </form>
  );
}
