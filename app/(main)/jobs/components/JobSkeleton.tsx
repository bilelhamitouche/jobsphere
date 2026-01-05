import { Skeleton } from "@/components/ui/skeleton";

export default function JobSkeleton() {
  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex gap-4 items-center w-full">
          <Skeleton className="size-20" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-1/2 h-6" />
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center text-sm font-medium text-gray-700">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-10" />
      </div>
    </div>
  );
}
