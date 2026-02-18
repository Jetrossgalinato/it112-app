"use client";

import { TypographyH3, TypographyMuted } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarUploadCard } from "./components/avatar-upload-card";
import { ProfileFormCard } from "./components/profile-form-card";
import { useProfilePage } from "./composables/useProfilePage";

export default function ProfilePage() {
  const {
    user,
    loading,
    initializing,
    uploading,
    showPassword,
    formData,
    togglePasswordVisibility,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useProfilePage();

  if (initializing || (user && !formData.email)) {
    return (
      <div className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 lg:col-span-3 h-[300px] rounded-lg border p-6">
            <div className="flex flex-col items-center justify-center gap-4 h-full">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-2 w-full max-w-sm">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
          <div className="col-span-4 rounded-lg border p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex justify-end pt-4">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="p-4">
      <TypographyH3>Profile</TypographyH3>
      <TypographyMuted>Update your profile information here.</TypographyMuted>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <AvatarUploadCard
          avatar={formData.avatar}
          name={formData.name}
          uploading={uploading}
          onFileChange={handleFileChange}
        />
        <ProfileFormCard
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
    </div>
  );
}
