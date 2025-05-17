"use server";
import "server-only";
import { companyInfoSchema } from "@/lib/zod";
import { getCompanyInfoById } from "@/lib/queries";

export async function getCompanyInfoAction(recruiterId: string) {
  const companyInfo = await getCompanyInfoById(recruiterId);
  return companyInfo;
}

export async function createCompany(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const about = formData.get("about") as string;
  const foundationYear = formData.get("foundation_year");
  const website = formData.get("website") as string;
  const industry = formData.get("industry") as string;
  const logoUrl = formData.get("logo_url") as string;
  const recruiterId = formData.get("recruiterId") as string;
  console.log(
    name,
    email,
    about,
    foundationYear,
    website,
    industry,
    logoUrl,
    recruiterId,
  );

  const result = companyInfoSchema.safeParse({
    name,
    email,
    about,
    foundationYear,
    website,
    industry,
    logoUrl,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
}
