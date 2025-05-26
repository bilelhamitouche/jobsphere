import { getUserInfo } from "@/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCompanyInfoById } from "@/lib/queries";
import Image from "next/image";

export default async function CompanyDetails() {
  const user = await getUserInfo();
  const data = await getCompanyInfoById(user?.id as string);
  const companyData = data && data[0];
  return (
    companyData && (
      <Card className="w-full h-full">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle className="text-2xl">{companyData.name}</CardTitle>
              <CardDescription>
                Specializes in:{" "}
                <span className="text-black">{companyData.industry}</span>
              </CardDescription>
            </div>
            {companyData.logo_url ? (
              <Image
                src={companyData.logo_url}
                alt={`${companyData.name} image`}
                width={20}
                height={20}
              />
            ) : (
              <div className="flex justify-center items-center text-2xl text-center text-white size-20 bg-primary">
                {companyData.name[0].toUpperCase()}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-lg font-medium">Company Details</h3>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-500">Industry</span>
              <span>{companyData.industry}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-500">Founded</span>
              <span>{companyData.foundationYear}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-lg font-medium">Company Contact</h3>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-500">Email</span>
              <span>{companyData.email}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-500">Website</span>
              <span>{companyData.website}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
}
