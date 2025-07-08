import { getUserInfo } from "@/actions/auth";
import UploaderButton from "@/components/UploadButton";
import { getResumeUrl } from "@/lib/queries";
import Navbar from "../components/navbar";

export const dynamic = true;

export default async function Resume() {
  const user = await getUserInfo();
  const resumeUrl = await getResumeUrl(user?.id as string);
  return (
    <div className="flex flex-col gap-4 space-y-2 w-full h-screen">
      <Navbar />
      <div className="pl-6 space-y-8 w-full h-screen">
        <h2 className="text-3xl font-bold">Resume</h2>
        <UploaderButton />
        {resumeUrl ? (
          <embed
            className="w-full h-screen"
            src={`${resumeUrl}#tooltip=0`}
          ></embed>
        ) : (
          <div className="w-full h-screen text-center">No resume uploaded</div>
        )}
      </div>
    </div>
  );
}
