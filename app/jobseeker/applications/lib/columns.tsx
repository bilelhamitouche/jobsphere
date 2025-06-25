"use client";
import { formatDistance } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

export type Job = {
  id: string;
  userId: string;
  position: string;
  location: string | null;
  postedAt: Date;
  status: "pending" | "accepted" | "rejected";
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
      formatDistance(props.row.original.postedAt, new Date(), {
        addSuffix: true,
      }),
    header: "Posted At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
