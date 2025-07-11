import { getUserInfo } from "@/actions/auth";
import EditCompanyInfoForm from "../components/EditCompanyInfoForm";
import { getCompanyInfoById } from "@/lib/queries";

export default async function EditCompanyInfo() {
  const user = await getUserInfo();
  const companyInfo = await getCompanyInfoById(user?.id as string);
  if (!companyInfo) return;
  return (
    <div className="p-6 space-y-4 w-full h-full bg-primary-foreground">
      <h2 className="text-3xl font-bold">Edit Company Information</h2>
      <EditCompanyInfoForm
        recruiterId={user?.id as string}
        companyInfo={companyInfo[0]}
      />
    </div>
  );
}
