"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlert } from "@/context/alert-context";
import { useAddLog } from "@/hooks/use-logs";

interface AddLogModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogAdded: () => void;
}

export function AddLogModal({
  isOpen,
  onOpenChange,
  onLogAdded,
}: AddLogModalProps) {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const { addLog, loading } = useAddLog();
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addLog(activity, duration, status);

      onLogAdded();
      onOpenChange(false);
      showAlert("Log added successfully!", "success");
      setActivity("");
      setDuration("");
      setStatus("");
    } catch (error) {
      // Error is logged in the hook
      showAlert("Failed to add log. Please try again.", "destructive");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Daily Log</DialogTitle>
          <DialogDescription>
            Enter the details of your activity here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity" className="text-right">
                Activity
              </Label>
              <Input
                id="activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="col-span-3"
                placeholder="e.g. 1h 30m"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Completed"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
