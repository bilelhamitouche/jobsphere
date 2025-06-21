"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

export type JobApplication = {
  id: string;
  username: string;
  position: string;
  location: string | null;
  appliedAt: Date;
};

export const columns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorFn: (props) => format(props.appliedAt, "MMMM dd yyyy"),
    header: "Applied At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const jobApplication = row.original;
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
                // try {
                //   const result = await deleteJobListingAction(
                //     jobApplication.id,
                //   );
                //   if (!result?.message) {
                //     toast.success("Job deleted successfully");
                //   }
                // } catch (err) {
                //   toast.error(err as string);
                // }
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
