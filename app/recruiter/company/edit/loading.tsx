import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-4 w-full h-full bg-primary-foreground">
      <h2 className="text-3xl font-bold">Edit Company Information</h2>
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-30" />
          <Skeleton className="h-6 w-50" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-20 md:col-span-2" />
          <Skeleton className="w-full h-8 md:col-span-2" />
        </CardContent>
      </Card>
    </div>
  );
}
