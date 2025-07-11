import { DataTable } from "@/components/ui/data-table";
import Navbar from "../components/navbar";
import { columns } from "./lib/columns";
import { getJobApplicationsByUserId } from "@/lib/queries";
import { getUserInfo } from "@/actions/auth";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function Applications() {
  const user = await getUserInfo();
  const jobApplications = await getJobApplicationsByUserId(user?.id as string);
  if (!jobApplications) notFound();
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold">Job Applications</h2>
        <Card>
          <CardContent>
            <DataTable columns={columns} data={jobApplications} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
