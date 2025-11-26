import { getUserInfo } from "@/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCompanyInfoById } from "@/lib/queries";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CompanyDetails() {
  const user = await getUserInfo();
  const data = await getCompanyInfoById(user?.id as string);
  const companyData = data && data[0];
  return (
    companyData && (
      <Card className="w-full h-full">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <CardTitle className="text-3xl">{companyData.name}</CardTitle>
              <CardDescription className="flex items-center text-sm font-medium text-gray-700">
                {companyData.industry}
                <Dot size={22} />
                {companyData.headquarters}
              </CardDescription>
            </div>
            {companyData.logoUrl ? (
              <Image
                src={companyData.logoUrl}
                alt={`${companyData.name} image`}
                width={16}
                height={16}
              />
            ) : (
              <div className="flex justify-center items-center text-2xl text-center text-white size-16 bg-primary">
                {companyData.name[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-xl font-bold">About {companyData.name}</h3>
            <p className="text-gray-700 leading-7.5">{companyData.about}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-lg font-medium">Company Details</h3>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-700">Size</span>
              <span>
                {companyData.size === "small"
                  ? "1-99"
                  : companyData.size === "mid"
                    ? "100-999"
                    : "More than 1000"}{" "}
                Employees
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-700">Founded</span>
              <span>{companyData.foundationYear}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-lg font-medium">Company Contact</h3>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-700">Email</span>
              <span>{companyData.email}</span>
            </div>
            {companyData.website && (
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-700">Website</span>
                <Link
                  href={companyData.website}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  {companyData.website}
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  );
}
