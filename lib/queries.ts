import "server-only";
import { company, db } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";
import { isRecruiterAuthenticated } from "@/actions/auth";
import { z } from "zod";
import { companyIndustry } from "./zod";

export async function getJobListing() {}

export async function getCompanyInfoById(recruiterId: string) {
  await isRecruiterAuthenticated();
  try {
    const companyInfo = await db
      .selectDistinct()
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    return companyInfo;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function createCompany(
  name: string,
  email: string,
  about: string | null,
  foundationYear: number,
  headquarters: string | null,
  website: string | null,
  logoUrl: string | null,
  recruiterId: string,
  industry: z.infer<typeof companyIndustry>,
) {
  await isRecruiterAuthenticated();
  try {
    await db.insert(company).values({
      name,
      email,
      about,
      foundationYear,
      headquarters,
      website,
      logoUrl,
      recruiterId,
      industry,
    });
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function updateCompany(
  name: string,
  email: string,
  about: string | null,
  foundationYear: number,
  headquarters: string | null,
  website: string | null,
  logoUrl: string | null,
  recruiterId: string,
  industry: z.infer<typeof companyIndustry>,
) {
  await isRecruiterAuthenticated();
  try {
    await db
      .update(company)
      .set({
        name,
        email,
        about,
        foundationYear,
        headquarters,
        website,
        logoUrl,
        industry,
      })
      .where(eq(company.recruiterId, recruiterId));
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}
