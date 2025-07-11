import { getResumeUrl } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Resume({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  const resumeUrl = await getResumeUrl(resumeId);
  if (!resumeUrl) notFound();
  return <embed className="w-full h-screen" src={resumeUrl}></embed>;
}
