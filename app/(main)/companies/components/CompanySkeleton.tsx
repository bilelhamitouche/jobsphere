import { Skeleton } from "@/components/ui/skeleton";

export default function CompanySkeleton() {
  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Skeleton className="size-20" />
          <Skeleton className="w-40 h-8" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="h-8 w-30" />
      </div>
    </div>
  );
}
