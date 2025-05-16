import "server-only";
import { company, db } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";
import { isRecruiterAuthenticated } from "@/actions/auth";
export async function getJobListing() {}

export async function getCompanyInfoById(recruiterId: string) {
  await isRecruiterAuthenticated()
  try {
    const companyInfo = await db.selectDistinct().from(company).where(eq(company.recruiterId, recruiterId));
    return companyInfo;
  } catch (err) {
    if(err instanceof DrizzleError) {
      throw new Error("Database Error")
    }
  }
}
