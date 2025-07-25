import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CompanyDetailsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="w-20 h-20" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-30" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
          <div className="flex gap-20 items-center">
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-6 w-30" />
            <Skeleton className="h-6 w-30" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-30" />
          <div className="flex flex-col gap-2 items-center">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="h-6 w-30" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 w-full">
        <Skeleton className="w-40 h-6" />
        <Skeleton className="w-full h-40" />
      </CardContent>
    </Card>
  );
}
