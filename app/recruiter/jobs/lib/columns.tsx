"use client";

import { deleteJobListingAction } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

export type Job = {
  id: string;
  description: string | null;
  position: string;
  type: "full" | "part" | "internship" | "remote";
  location: string | null;
  experienceLevel: "none" | "entry" | "mid" | "senior";
  postedAt: Date;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "position",
    header: "Position",
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
    accessorFn: (props) => format(props.postedAt, "MMMM dd yyyy"),
    header: "Posted At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
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
                  const result = await deleteJobListingAction(job.id);
                  if (!result?.message) {
                    toast.success("Job deleted successfully");
                  }
                } catch (err) {
                  toast.error(err as string);
                }
              }}
            >
              <Trash className="text-red-500" />
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/recruiter/jobs/${job.id}/edit`}>
                <Edit />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
