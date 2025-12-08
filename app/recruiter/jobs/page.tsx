import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { columns } from "./lib/columns";
import { getJobListingsById } from "@/lib/queries";
import { getUserInfo } from "@/actions/auth";
import { Card } from "@/components/ui/card";

export default async function RecruiterJobs() {
  const user = await getUserInfo();
  const jobs = await getJobListingsById(user?.id as string);
  if (!jobs) {
    return <div>No jobs posted</div>;
  }
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
      <Card className="p-4">
        <DataTable columns={columns} data={jobs} />
      </Card>
    </div>
  );
}
