import { getUserInfo } from "@/actions/auth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getJobApplicationsCountByRecruiterId } from "@/lib/queries";

export async function TotalApplicationsCard() {
  const user = await getUserInfo();
  const jobApplicationCount = await getJobApplicationsCountByRecruiterId(
    user?.id as string,
  );
  return (
    <Card className="text-center">
      <CardContent className="space-y-4 text-3xl font-bold">
        <CardTitle className="text-xl font-bold">Job Applications</CardTitle>
        <span className="text-primary">{jobApplicationCount}</span>
      </CardContent>
    </Card>
  );
}
