import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailsSidebarSkeleton() {
  return (
    <Card className="sticky max-h-[400px] min-w-1/3">
      <CardHeader className="space-y-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <Skeleton className="h-6 w-30" />
        <div className="flex gap-4 items-center">
          <Skeleton className="h-20 w-30" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
        <Skeleton className="h-3 w-30" />
      </CardContent>
    </Card>
  );
}
