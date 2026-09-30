"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
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
    control,
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

  const organizationName = watch("organizationName");

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-b pb-6">
        <Controller
          control={control}
          name="logoUrl"
          render={({ field }) => (
            <ImageUpload
              value={field.value ?? ""}
              onChange={(url) => field.onChange(url)}
              disabled={updateProfile.isPending}
              aspectRatio="avatar"
            />
          )}
        />
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
