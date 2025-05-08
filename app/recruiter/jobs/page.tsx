import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RecruiterJobs() {
  return (
    <div className="p-4 space-y-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Jobs</h2>
        <Button asChild>
          <Link href="/recruiter/jobs/create">Post New Job</Link>
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
