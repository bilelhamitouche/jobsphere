"use server";
import "server-only";
import { companyInfoSchema } from "@/lib/zod";
import { createCompany, getCompanyInfoById } from "@/lib/queries";
import { DrizzleError } from "drizzle-orm";

export async function getCompanyInfoAction(recruiterId: string) {
  const companyInfo = await getCompanyInfoById(recruiterId);
  return companyInfo;
}

export async function createCompanyAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const about = formData.get("about");
  const foundationYear = formData.get("foundation_year");
  const website = formData.get("website");
  const industry = formData.get("industry");
  const headquarters = formData.get("headquarters");
  const logoUrl = formData.get("logo_url");
  const recruiterId = formData.get("recruiter_id");
  console.log(
    name,
    email,
    about,
    foundationYear,
    website,
    industry,
    headquarters,
    logoUrl,
    recruiterId,
  );
  const result = companyInfoSchema.safeParse({
    name,
    email,
    about,
    foundationYear,
    headquarters,
    website,
    logoUrl,
    industry,
  });
  console.log(result.error);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // try {
  //   console.log("Before");
  //   await createCompany(
  //     result.data.name,
  //     result.data.email,
  //     result.data.about || null,
  //     Number(result.data.foundation_year),
  //     result.data.headquarters || null,
  //     result.data.website || null,
  //     result.data.logo_url || null,
  //     recruiterId,
  //     result.data.industry,
  //   );
  //   console.log("After");
  // } catch (err) {
  //   return {
  //     message: err,
  //   };
  // }
}
