import { getUserInfo } from "@/actions/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getJobListingCountByRecruiterId } from "@/lib/queries";

export async function TotalJobsCard() {
  const user = await getUserInfo();
  const jobsCount = await getJobListingCountByRecruiterId(user?.id as string);
  return (
    <Card className="text-center">
      <CardContent className="space-y-4 text-3xl font-bold">
        <CardTitle className="text-xl font-bold">Jobs Posted</CardTitle>
        <span className="text-primary">{jobsCount}</span>
      </CardContent>
    </Card>
  );
}
