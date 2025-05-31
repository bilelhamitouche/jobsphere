import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function RecruiterJobs() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">All Jobs</h2>
        <Button asChild>
          <Link href="/recruiter/jobs/create">
            <PlusCircle />
            <span>Post New Job</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>All jobs you have posted</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
