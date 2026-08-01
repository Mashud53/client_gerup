"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "ACTIVE" | "SUSPEND";

interface StatusCellProps {
  id: string;
  status: Status;
  onStatusChange?: (id: string, status: Status) => void;
}

export function StatusCell({
  id,
  status,
  onStatusChange,
}: StatusCellProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<Status>(status);

  const handleOpen = () => {
  setSelectedStatus(status);
  setOpen(true);
};

  const handleSave = () => {
    onStatusChange?.(id, selectedStatus);
    setOpen(false);
  };

  return (
    <>
      <Badge
        className="cursor-pointer"
        variant={
          status === "ACTIVE"
            ? "default"
            : "destructive"
        }
        onClick={handleOpen}
      >
        {status}
      </Badge>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Change Status
            </DialogTitle>
          </DialogHeader>

          <Select
            value={selectedStatus}
            onValueChange={(value) =>
              setSelectedStatus(value as Status)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ACTIVE">
                ACTIVE
              </SelectItem>

              <SelectItem value="SUSPEND">
                SUSPEND
              </SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}