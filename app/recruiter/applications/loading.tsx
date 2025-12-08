import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="self-start text-3xl font-semibold">All Applications</h2>
      </div>
      <Card className="flex flex-col gap-4 p-4 w-full">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
      </Card>
    </div>
  );
}
