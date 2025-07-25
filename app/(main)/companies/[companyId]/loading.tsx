import { Loader } from "lucide-react";
import CompanyDetailsSkeleton from "../components/CompanyDetailsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-8 w-full h-full bg-primary-foreground">
      <Skeleton className="w-40 h-6" />
      <CompanyDetailsSkeleton />
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin" size="40" />
      </div>
    </div>
  );
}
