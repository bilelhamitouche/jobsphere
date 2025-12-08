import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot } from "lucide-react";

export default async function CompanyDetails() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-30" />
            <CardDescription className="flex items-center text-sm font-medium text-gray-700">
              <Skeleton className="w-20 h-6" />
              <Dot size={22} />
              <Skeleton className="w-20 h-6" />
            </CardDescription>
          </div>
          <Skeleton className="size-16" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-6 w-30" />
          <Skeleton className="w-full h-20" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-2 items-start w-full">
          <Skeleton className="h-6 w-30" />
          <div className="flex justify-between items-center w-full">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="h-6 w-30" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-16 h-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <Skeleton className="h-6 w-30" />
          <div className="flex justify-between items-center w-full">
            <Skeleton className="w-16 h-6" />
            <Skeleton className="h-6 w-30" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="h-6 w-30" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
