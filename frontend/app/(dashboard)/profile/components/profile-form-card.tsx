"use client";

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
import { Loader2 } from "lucide-react";
import { HidePassword } from "@/components/hide-password";

interface ProfileFormCardProps {
  formData: {
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  showPassword: {
    old: boolean;
    new: boolean;
    confirm: boolean;
  };
  togglePasswordVisibility: (field: "old" | "new" | "confirm") => void;
}

export function ProfileFormCard({
  formData,
  handleChange,
  handleSubmit,
  loading,
  showPassword,
  togglePasswordVisibility,
}: ProfileFormCardProps) {
  return (
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
  );
}
