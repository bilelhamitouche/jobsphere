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
import { formatJobType } from "@/lib/utils";
import { jobExperienceLevel, jobType } from "@/lib/zod";
import { z } from "zod";

export type Job = {
  id: string;
  description: string;
  position: string;
  type: z.infer<typeof jobType>;
  location: string | null;
  experienceLevel: z.infer<typeof jobExperienceLevel>;
  postedAt: Date;
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
    cell: ({ row }) => {
      const type = row.getValue("type") as z.infer<typeof jobType>;

      return <span className="capitalize">{formatJobType(type)}</span>;
    },
  },
  {
    accessorKey: "experienceLevel",
    header: "Experience Level",
    cell: ({ row }) => {
      const level = row.getValue("experienceLevel") as string | null;

      return <span className="capitalize">{level ?? "-"}</span>;
    },
  },
  {
    accessorFn: (props) => format(props.postedAt, "MMM dd yyyy"),
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
