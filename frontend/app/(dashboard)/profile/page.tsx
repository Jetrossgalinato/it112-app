"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAlert } from "@/context/alert-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { HidePassword } from "@/components/hide-password";
import { TypographyH3, TypographyMuted } from "@/components/typography";

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const { showAlert } = useAlert();
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => {
        // Only update if values are different to avoid unnecessary renders/loops
        if (
          prev.name === (user.name || "") &&
          prev.email === (user.email || "") &&
          prev.avatar === (user.avatar || "")
        ) {
          return prev;
        }
        return {
          ...prev,
          name: user.name || "",
          email: user.email || "",
          avatar: user.avatar || "",
        };
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/upload-avatar`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, avatar: data.url }));
    } catch (error) {
      console.error(error);
      // Ideally show an error toast here
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      showAlert("New passwords do not match", "destructive");
      return;
    }

    if (formData.password && !formData.oldPassword) {
      showAlert("Old password is required to set a new password", "destructive");
      return;
    }

    await updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      old_password: formData.oldPassword || undefined,
      password: formData.password || undefined,
    });
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    })); // Clear passwords after save
  };

  if (!user) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="p-4">
      <TypographyH3>Profile</TypographyH3>
      <TypographyMuted>Update your profile information here.</TypographyMuted>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Your Avatar</CardTitle>
            <CardDescription>
              This is your public display image.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 flex-1">
            <Avatar className="h-32 w-32">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback className="text-4xl">
                {formData.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="avatar">Avatar Image</Label>
              <Input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {uploading ? (
                <p className="text-xs text-muted-foreground animate-pulse">
                  Uploading...
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Upload a picture for your profile.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type={showPassword.old ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <HidePassword
                    showPassword={showPassword.old}
                    toggleShowPassword={() => togglePasswordVisibility("old")}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Leave blank to keep current password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <HidePassword
                    showPassword={showPassword.new}
                    toggleShowPassword={() => togglePasswordVisibility("new")}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <HidePassword
                    showPassword={showPassword.confirm}
                    toggleShowPassword={() => togglePasswordVisibility("confirm")}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
