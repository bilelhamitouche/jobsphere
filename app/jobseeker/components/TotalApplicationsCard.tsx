import { getUserInfo } from "@/actions/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getJobApplicationsCountByUserId } from "@/lib/queries";

export default async function TotalApplicationsCard() {
  const user = await getUserInfo();
  const jobApplicationsCount = await getJobApplicationsCountByUserId(
    user?.id as string,
  );
  return (
    <Card>
      <CardContent className="space-y-4 text-center">
        <CardTitle className="text-xl font-bold">Job Applications</CardTitle>
        <span className="text-3xl font-bold text-primary">
          {jobApplicationsCount}
        </span>
      </CardContent>
    </Card>
  );
}
