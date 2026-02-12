"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
import { TypographyH3, TypographyMuted } from "@/components/typography";

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      password: formData.password || undefined,
    });
    setFormData((prev) => ({ ...prev, password: "" })); // Clear password after save
  };

  if (!user) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="p-4">
      <TypographyH3>Profile</TypographyH3>
      <TypographyMuted>Update your profile information here.</TypographyMuted>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Your Avatar</CardTitle>
            <CardDescription>
              This is your public display image.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback className="text-4xl">
                {formData.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                type="text"
                id="avatar"
                name="avatar"
                placeholder="https://example.com/avatar.png"
                value={formData.avatar}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL for your profile picture.
              </p>
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
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={formData.password}
                  onChange={handleChange}
                />
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
