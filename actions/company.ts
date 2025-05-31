"use server";
import "server-only";
import { companyInfoSchema } from "@/lib/zod";
import { createCompany, updateCompany } from "@/lib/queries";
import { revalidatePath } from "next/cache";

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
  const result = companyInfoSchema.safeParse({
    name,
    email,
    about,
    foundation_year: foundationYear,
    headquarters,
    website,
    industry,
    logo_url: logoUrl,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await createCompany(
      result.data.name,
      result.data.email,
      result.data.about || null,
      Number(result.data.foundation_year),
      result.data.headquarters || null,
      result.data.website || null,
      result.data.logo_url || null,
      recruiterId as string,
      result.data.industry,
    );
  } catch (err) {
    return {
      message: err,
    };
  }
  revalidatePath("/company-info");
}

export async function updateCompanyAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const about = formData.get("about");
  const foundationYear = formData.get("foundation_year");
  const website = formData.get("website");
  const industry = formData.get("industry");
  const headquarters = formData.get("headquarters");
  const recruiterId = formData.get("recruiter_id");
  const logoUrl = formData.get("logo_url");
  const result = companyInfoSchema.safeParse({
    name,
    email,
    about,
    foundation_year: foundationYear,
    headquarters,
    website,
    industry,
    logo_url: logoUrl,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await updateCompany(
      result.data.name,
      result.data.email,
      result.data.about || null,
      Number(result.data.foundation_year),
      result.data.headquarters || null,
      result.data.website || null,
      result.data.logo_url || null,
      recruiterId as string,
      result.data.industry,
    );
  } catch (err) {
    return {
      message: err,
    };
  }
}
