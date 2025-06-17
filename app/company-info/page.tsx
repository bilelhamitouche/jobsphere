import { auth } from "@/lib/auth";
import { getCompanyInfoById } from "@/lib/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CompanyInfo from "./components/CompanyInfo";

export default async function CompanyInfoPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/recruiter-signin");
  if (session.user.role !== "recruiter") redirect("/");
  const companyInfo = await getCompanyInfoById(session.user.id as string);
  if (!companyInfo) return;
  if (companyInfo.length > 0) redirect("/recruiter");
  return (
    <div className="w-full h-full">
      <CompanyInfo recruiterId={session.user.id as string} />
    </div>
  );
}
