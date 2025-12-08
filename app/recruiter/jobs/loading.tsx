import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Loading() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">All Jobs</h2>
        <Button asChild>
          <Link href="/recruiter/jobs/post">
            <PlusCircle />
            <span>Post New Job</span>
          </Link>
        </Button>
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
