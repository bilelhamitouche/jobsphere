import { getUserInfo } from "@/actions/auth";
import PostJobForm from "./components/PostJobForm";

export default async function PostJob() {
  const user = await getUserInfo();
  return (
    <div className="p-8 space-y-4 w-full h-full">
      <h2 className="text-3xl font-semibold">Post Job</h2>
      <PostJobForm recruiterId={user?.id as string} />
    </div>
  );
}
