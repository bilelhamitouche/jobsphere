import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

export default async function JobDetailsCardSkeleton() {
  return (
    <Card className="space-y-4 w-full">
      <CardHeader className="flex flex-col gap-4 w-full">
        <CardTitle className="flex gap-4 items-center">
          <Skeleton className="h-20 w-30" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center font-medium">
              <Skeleton className="w-20 h-6" />
              <Dot size="28" className="text-gray-700" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
        </CardTitle>
        <div className="flex gap-8 items-center w-full">
          <div className="flex gap-2 items-center text-gray-700">
            <Skeleton className="h-6 w-30" />
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Skeleton className="h-6 w-30" />
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Skeleton className="h-6 w-30" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-full h-30" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="w-40 h-6" />
          <ul className="flex flex-col gap-2 pl-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-6" />
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="w-40 h-6" />
          <ul className="flex flex-col gap-2 pl-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-6" />
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
