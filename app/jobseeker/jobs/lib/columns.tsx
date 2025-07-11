"use client";

import { deleteSavedJobListing } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jobExperienceLevel, jobType } from "@/lib/zod";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export type Job = {
  id: string;
  userId: string;
  position: string | null;
  location: string | null;
  type: z.infer<typeof jobType> | null;
  experienceLevel: z.infer<typeof jobExperienceLevel> | null;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "experienceLevel",
    header: "Experience Level",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const jobSaved = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const result = await deleteSavedJobListing(
                    jobSaved.userId,
                    jobSaved.id,
                  );
                  if (!result?.message) {
                    toast.success("Job Unsaved successfully");
                  }
                } catch (err) {
                  toast.error(err as string);
                }
              }}
            >
              <Trash className="text-red-500" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
