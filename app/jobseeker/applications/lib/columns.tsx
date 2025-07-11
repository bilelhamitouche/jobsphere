"use client";
import { formatDistance } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

export type Job = {
  id: string;
  userId: string;
  position: string | null;
  location: string | null;
  postedAt: Date | null;
  status: "pending" | "accepted" | "rejected" | null;
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
    cell: (props) =>
      formatDistance(props.row.original.postedAt as Date, new Date(), {
        addSuffix: true,
      }),
    header: "Posted At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
