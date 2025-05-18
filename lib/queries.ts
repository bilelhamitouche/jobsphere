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
      .select()
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
  logo_url: string | null,
  recruiterId: string,
  industry: z.infer<typeof companyIndustry>,
) {
  await isRecruiterAuthenticated();
  try {
    const newCompany = await db
      .insert(company)
      .values({
        name,
        email,
        about,
        foundationYear,
        headquarters,
        website,
        logo_url,
        recruiterId,
        industry,
      })
      .returning();
    console.log(newCompany);
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}
