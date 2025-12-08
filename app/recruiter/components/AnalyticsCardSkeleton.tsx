import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsCardSkeleton() {
  return (
    <Card className="flex justify-center items-center">
      <Skeleton className="h-8 w-30" />
      <Skeleton className="w-6 h-10" />
    </Card>
  );
}
