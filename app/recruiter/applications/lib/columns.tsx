"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CloudDownload, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteJobListingApplicationAction } from "@/actions/jobs";

export type JobApplication = {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  resume: string;
  position: string;
  location: string | null;
  status: "pending" | "accepted" | "rejected";
  appliedAt: Date;
};

export const columns: ColumnDef<JobApplication>[] = [
  {
    id: "userImage",
    header: "Name",
    cell: ({ row }) => {
      const jobApplication = row.original;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={jobApplication.userImage}
              alt={`${jobApplication.username} image`}
            />
            <AvatarFallback>
              {jobApplication.username.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
          <span>{jobApplication.username}</span>
        </div>
      );
    },
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
    accessorKey: "status",
    header: "Status",
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
                try {
                  const result = await deleteJobListingApplicationAction(
                    jobApplication.userId,
                    jobApplication.id,
                  );
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
              <Link href={`/recruiter/resumes/${jobApplication.id}`}>
                <CloudDownload />
                <span>View Resume</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
