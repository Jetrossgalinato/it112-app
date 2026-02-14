"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AvatarUploadCardProps {
  avatar: string;
  name: string;
  uploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AvatarUploadCard({
  avatar,
  name,
  uploading,
  onFileChange,
}: AvatarUploadCardProps) {
  return (
    <Card className="col-span-4 lg:col-span-3 flex flex-col">
      <CardHeader>
        <CardTitle>Your Avatar</CardTitle>
        <CardDescription>This is your public display image.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 flex-1">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-4xl">
            {name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="avatar">Avatar Image</Label>
          <Input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={onFileChange}
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
  );
}
