"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Log } from "@/hooks/use-logs";
import { ChevronDown } from "lucide-react";
import { getStatusColor } from "@/lib/helpers";
import { useEditLogDialog } from "../composables/useEditLogDialog";

interface EditLogDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  log: Log | null;
  onLogUpdated: () => void;
  folders?: string[];
}

export function EditLogDialog({
  isOpen,
  onOpenChange,
  log,
  onLogUpdated,
  folders = [],
}: EditLogDialogProps) {
  const {
    activity,
    setActivity,
    title,
    setTitle,
    hours,
    setHours,
    minutes,
    setMinutes,
    status,
    setStatus,
    folder,
    setFolder,
    loading,
    handleSubmit,
  } = useEditLogDialog({ log, onOpenChange, onLogUpdated });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Log</DialogTitle>
          <DialogDescription>
            Make changes to your log here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-folder" className="text-right">
                Folder
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-between"
                  >
                    {folder || "Select Folder"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="start">
                  {folders.length > 0 ? (
                    folders.map((f) => (
                      <DropdownMenuItem key={f} onSelect={() => setFolder(f)}>
                        {f}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      No folders available
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Short title for this activity"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-activity" className="text-right pt-2">
                Activity
              </Label>
              <textarea
                id="edit-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="col-span-3 min-h-[100px] max-h-[200px] resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-y-auto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Duration</Label>
              <div className="col-span-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={hours}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setHours("");
                        return;
                      }
                      setHours(String(Math.max(0, Math.min(23, Number(val)))));
                    }}
                    className="w-16 rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">h</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setMinutes("");
                        return;
                      }
                      setMinutes(
                        String(Math.max(0, Math.min(59, Number(val)))),
                      );
                    }}
                    className="w-16 rounded-md border border-input bg-background px-2 py-1.5 text-sm text-center shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="text-sm text-muted-foreground">m</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-between"
                  >
                    {status ? (
                      <div className="flex items-center">
                        <span
                          className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(
                            status,
                          )}`}
                        />
                        {status}
                      </div>
                    ) : (
                      "Select Status"
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="start">
                  {["Not Started", "Pending", "In Progress", "Completed"].map(
                    (s) => (
                      <DropdownMenuItem key={s} onSelect={() => setStatus(s)}>
                        <span
                          className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(
                            s,
                          )}`}
                        />
                        {s}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
