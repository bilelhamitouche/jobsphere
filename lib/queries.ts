import "server-only";
import { company, db, jobListing } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";
import { isAuthenticated, isRecruiterAuthenticated } from "@/actions/auth";
import { z } from "zod";
import { companyIndustry, jobExperienceLevel, jobType } from "./zod";

export async function getJobListings() {
  await isAuthenticated();
  try {
    const jobListings = await db
      .select({
        id: jobListing.id,
        position: jobListing.position,
        location: jobListing.location,
        type: jobListing.type,
        experienceLevel: jobListing.experienceLevel,
        postedAt: jobListing.postedAt,
        company: company.name,
        companyLogo: company.logoUrl,
      })
      .from(jobListing)
      .leftJoin(company, eq(jobListing.companyId, company.id));
    return jobListings;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobListingsById(recruiterId: string) {
  await isRecruiterAuthenticated();
  try {
    const companyId = await db
      .selectDistinct({ id: company.id })
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    const jobListings = await db
      .select()
      .from(jobListing)
      .where(eq(jobListing.companyId, companyId[0].id));
    return jobListings;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobListingById(id: string) {
  await isAuthenticated();
  try {
    const job = await db
      .selectDistinct({
        id: jobListing.id,
        description: jobListing.description,
        position: jobListing.position,
        type: jobListing.type,
        experienceLevel: jobListing.experienceLevel,
        location: jobListing.location,
        postedAt: jobListing.postedAt,
        company: company.name,
        companyLogo: company.logoUrl,
        companyAbout: company.about,
      })
      .from(jobListing)
      .leftJoin(company, eq(jobListing.companyId, company.id))
      .where(eq(jobListing.id, id));
    return job;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function createJobListing(
  position: string,
  location: string | null,
  type: z.infer<typeof jobType>,
  experience_level: z.infer<typeof jobExperienceLevel>,
  description: string | null,
  recruiterId: string,
) {
  await isRecruiterAuthenticated();
  try {
    const data = await db
      .select({ id: company.id })
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    const companyId = data[0].id;
    await db
      .insert(jobListing)
      .values({
        position,
        description,
        type,
        experienceLevel: experience_level,
        location,
        companyId,
      })
      .returning();
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function updateJobListing(
  id: string,
  position: string,
  description: string,
  location: string,
  type: "full" | "part" | "internship" | "remote",
  experienceLevel: "none" | "entry" | "mid" | "senior",
) {
  await isRecruiterAuthenticated();
  try {
    await db
      .update(jobListing)
      .set({ position, description, location, type, experienceLevel })
      .where(eq(jobListing.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function deleteJobListing(id: string) {
  await isRecruiterAuthenticated();
  try {
    await db.delete(jobListing).where(eq(jobListing.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

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

export async function getCompanies() {
  try {
    const companies = await db.select().from(company);
    return companies;
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
  headquarters: string | null,
  website: string | null,
  logoUrl: string | null,
  recruiterId: string,
  industry: z.infer<typeof companyIndustry> | undefined,
) {
  await isRecruiterAuthenticated();
  try {
    await db
      .update(company)
      .set({
        name,
        email,
        about,
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
