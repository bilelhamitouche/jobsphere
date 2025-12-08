import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <h2 className="text-3xl font-bold">Edit Job</h2>
      <Card className="p-8 w-full">
        <CardHeader className="space-y-2">
          <Skeleton className="h-10 w-30" />
          <Skeleton className="h-6 w-50" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8 w-full">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="col-span-2 w-full h-20" />
        </CardContent>
        <Skeleton className="w-full h-16" />
      </Card>
    </div>
  );
}
