"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import { UploadCloud, Loader2, Trash2, RefreshCw, Camera, Repeat2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  disabled?: boolean;
  aspectRatio?: "video" | "square" | "avatar";
  className?: string;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  aspectRatio = "video",
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      return "Only JPEG, PNG, and WEBP image formats are accepted.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds the 1 MB maximum limit.";
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post<{ url: string }>("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.url) {
        const previousUrl = value;
        onChange(response.data.url);
        toast.success("Image uploaded successfully");

        if (previousUrl && previousUrl !== response.data.url) {
          apiClient.delete("/upload", { params: { url: previousUrl } }).catch(() => {});
        }
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to upload image";
      toast.error(message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleRemove = async () => {
    if (value) {
      try {
        await apiClient.delete("/upload", { params: { url: value } });
        toast.success("Image removed");
      } catch {
        // Proceed to clear value even if server delete fails
      }
    }
    onChange("");
  };

  const isAvatar = aspectRatio === "avatar";

  if (isAvatar) {
    return (
      <div className={`relative shrink-0 ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
        />
        <div className="group relative size-20 overflow-hidden rounded-full border border-border bg-muted ring-2 ring-primary/10">
          {isUploading ? (
            <div className="flex size-full items-center justify-center bg-background/80">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : value ? (
            <>
              <Image src={value} alt="Avatar" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="rounded-full bg-white/20 p-1.5 text-white transition-colors hover:bg-white/40"
                  title="Change photo"
                >
                  <Repeat2 className="size-4" />
                </button>
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="rounded-full bg-red-500/80 p-1.5 text-white transition-colors hover:bg-red-600"
                  title="Remove photo"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                if (!disabled && !isUploading) {
                  fileInputRef.current?.click();
                }
              }}
              className="flex size-full cursor-pointer items-center justify-center bg-primary/10 transition-colors hover:bg-primary/20"
              title="Upload photo"
            >
              <Camera className="size-7 text-primary/70" />
            </div>
          )}
        </div>
      </div>
    );
  }

  const aspectClass = aspectRatio === "square" ? "aspect-square max-w-xs" : "aspect-16/9 w-full";

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value ? (
        <div
          className={`relative overflow-hidden rounded-md border border-border bg-muted ${aspectClass}`}
        >
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={disabled || isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="h-8 gap-1 text-xs"
            >
              <RefreshCw className="size-3.5" />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={disabled || isUploading}
              onClick={handleRemove}
              className="h-8 gap-1 text-xs"
            >
              <Trash2 className="size-3.5" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled && !isUploading) {
              fileInputRef.current?.click();
            }
          }}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 text-center transition-colors ${isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50"
            } ${disabled || isUploading ? "pointer-events-none opacity-60" : ""} ${aspectClass}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-xs font-medium">Uploading Image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="rounded-full bg-background p-3 shadow-xs ring-1 ring-foreground/5 group-hover:text-primary">
                <UploadCloud className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-muted-foreground">
                  JPEG, PNG, or WEBP (Max file size: 1 MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
