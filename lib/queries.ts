import "server-only";
import {
  company,
  db,
  jobListing,
  jobListingApplication,
  jobListingRequirement,
  jobListingResponsibility,
  jobListingSaved,
  user,
} from "./drizzle";
import { and, count, DrizzleError, eq } from "drizzle-orm";
import { isAuthenticated, isRecruiterAuthenticated } from "@/actions/auth";
import { z } from "zod";
import {
  companyIndustry,
  companySize,
  jobExperienceLevel,
  jobType,
} from "./zod";

export async function getResumeUrl(userId: string) {
  try {
    const resumeUrl = await db
      .select({ resumeUrl: user.resumeUrl })
      .from(user)
      .where(eq(user.id, userId));
    return resumeUrl[0].resumeUrl;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function updateResumeUrl(url: string, userId: string) {
  try {
    await db.update(user).set({ resumeUrl: url }).where(eq(user.id, userId));
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobListings() {
  try {
    const jobListings = await db
      .select({
        id: jobListing.id,
        position: jobListing.position,
        location: jobListing.location,
        type: jobListing.type,
        experienceLevel: jobListing.experienceLevel,
        postedAt: jobListing.postedAt,
        companyId: company.id,
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

export async function getJobListingsByCompanyId(companyId: string) {
  try {
    const jobListings = await db
      .select({
        id: jobListing.id,
        position: jobListing.position,
        location: jobListing.location,
        experienceLevel: jobListing.experienceLevel,
        type: jobListing.type,
        postedAt: jobListing.postedAt,
        company: company.name,
        companyLogo: company.logoUrl,
      })
      .from(jobListing)
      .leftJoin(company, eq(jobListing.companyId, company.id))
      .where(eq(jobListing.companyId, companyId));
    return jobListings;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobListingById(id: string) {
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
        companyId: company.id,
        company: company.name,
        companyLogo: company.logoUrl,
        companyFoundationYear: company.foundationYear,
        companyIndustry: company.industry,
      })
      .from(jobListing)
      .leftJoin(company, eq(jobListing.companyId, company.id))
      .leftJoin(
        jobListingRequirement,
        eq(jobListing.id, jobListingRequirement.jobListingId),
      )
      .leftJoin(
        jobListingResponsibility,
        eq(jobListing.id, jobListingResponsibility.jobListingId),
      )
      .where(eq(jobListing.id, id));
    const requirements = await db
      .select({ requirement: jobListingRequirement.requirement })
      .from(jobListingRequirement)
      .where(eq(jobListingRequirement.jobListingId, id));
    const responsibilities = await db
      .select({ responsibility: jobListingResponsibility.responsibility })
      .from(jobListingResponsibility)
      .where(eq(jobListingResponsibility.jobListingId, id));
    return { ...job[0], requirements, responsibilities };
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobListingCountByRecruiterId(recruiterId: string) {
  await isRecruiterAuthenticated();
  try {
    const companyId = await db
      .select({ id: company.id })
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    const jobListingCount = await db
      .select({ count: count() })
      .from(jobListing)
      .where(eq(jobListing.companyId, companyId[0].id));
    return jobListingCount[0].count;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function createJobListing(
  position: string,
  location: string,
  type: z.infer<typeof jobType>,
  experience_level: z.infer<typeof jobExperienceLevel>,
  description: string,
  requirements: string[],
  responsibilities: string[],
  recruiterId: string,
) {
  await isRecruiterAuthenticated();
  try {
    await db.transaction(async (tx) => {
      const data = await tx
        .select({ id: company.id })
        .from(company)
        .where(eq(company.recruiterId, recruiterId));
      const companyId = data[0].id;
      const id = await tx
        .insert(jobListing)
        .values({
          position,
          description,
          type,
          experienceLevel: experience_level,
          location,
          companyId,
        })
        .returning({ id: jobListing.id });
      requirements.map(
        async (requirement) =>
          await tx.insert(jobListingRequirement).values({
            requirement,
            jobListingId: id[0].id,
          }),
      );
      responsibilities.map(
        async (responsibility) =>
          await tx.insert(jobListingResponsibility).values({
            jobListingId: id[0].id,
            responsibility,
          }),
      );
    });
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
  requirements: string[],
  responsibilities: string[],
) {
  await isRecruiterAuthenticated();
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(jobListing)
        .set({ position, description, location, type, experienceLevel })
        .where(eq(jobListing.id, id));
      await tx
        .delete(jobListingRequirement)
        .where(eq(jobListingRequirement.jobListingId, id));
      await tx
        .delete(jobListingResponsibility)
        .where(eq(jobListingResponsibility.jobListingId, id));
      requirements.map(async (requirement) => {
        await tx
          .insert(jobListingRequirement)
          .values({ requirement: requirement, jobListingId: id });
      });
      responsibilities.map(async (responsibility) => {
        await tx
          .insert(jobListingResponsibility)
          .values({ responsibility: responsibility, jobListingId: id });
      });
    });
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

export async function getJobApplicationsByUserId(userId: string) {
  await isAuthenticated();
  try {
    const jobApplications = await db
      .select({
        id: jobListingApplication.jobListingId,
        userId: jobListingApplication.userId,
        position: jobListing.position,
        location: jobListing.location,
        postedAt: jobListing.postedAt,
        status: jobListingApplication.status,
      })
      .from(jobListingApplication)
      .leftJoin(
        jobListing,
        eq(jobListingApplication.jobListingId, jobListing.id),
      )
      .where(eq(jobListingApplication.userId, userId));
    return jobApplications;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobApplicationsByRecruiterId(recruiterId: string) {
  await isRecruiterAuthenticated();
  try {
    const companyId = await db
      .selectDistinct({ id: company.id })
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    const jobApplications = await db
      .select({
        id: jobListing.id,
        userId: user.id,
        username: user.name,
        image: user.image,
        resume: user.resumeUrl,
        position: jobListing.position,
        location: jobListing.location,
        status: jobListingApplication.status,
        appliedAt: jobListingApplication.appliedAt,
      })
      .from(jobListingApplication)
      .leftJoin(
        jobListing,
        eq(jobListingApplication.jobListingId, jobListing.id),
      )
      .leftJoin(company, eq(jobListing.companyId, company.id))
      .leftJoin(user, eq(jobListingApplication.userId, user.id))
      .where(eq(company.id, companyId[0].id));
    return jobApplications;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobApplicationsCountByRecruiterId(
  recruiterId: string,
) {
  await isRecruiterAuthenticated();
  try {
    const companyId = await db
      .selectDistinct({ id: company.id })
      .from(company)
      .where(eq(company.recruiterId, recruiterId));
    const jobApplicationsCount = await db
      .select({
        count: count(),
      })
      .from(jobListingApplication)
      .leftJoin(
        jobListing,
        eq(jobListingApplication.jobListingId, jobListing.id),
      )
      .leftJoin(company, eq(jobListing.companyId, company.id))
      .leftJoin(user, eq(jobListingApplication.userId, user.id))
      .where(eq(company.id, companyId[0].id));
    return jobApplicationsCount[0].count;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getJobApplicationsCountByUserId(userId: string) {
  await isAuthenticated();
  try {
    const jobApplications = await db
      .select({
        count: count(),
      })
      .from(jobListingApplication)
      .leftJoin(
        jobListing,
        eq(jobListingApplication.jobListingId, jobListing.id),
      )
      .where(eq(jobListingApplication.userId, userId));
    return jobApplications[0].count;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function hasApplied(userId: string, jobId: string) {
  try {
    const application = await db
      .select()
      .from(jobListingApplication)
      .where(
        and(
          eq(jobListingApplication.userId, userId),
          eq(jobListingApplication.jobListingId, jobId),
        ),
      );
    return application.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function createJobApplication(userId: string, jobId: string) {
  await isAuthenticated();
  try {
    await db
      .insert(jobListingApplication)
      .values({ userId, jobListingId: jobId });
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function deleteJobApplication(userId: string, jobId: string) {
  await isAuthenticated();
  try {
    await db
      .delete(jobListingApplication)
      .where(
        and(
          eq(jobListingApplication.userId, userId),
          eq(jobListingApplication.jobListingId, jobId),
        ),
      );
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function acceptJobListingApplication(
  userId: string,
  jobId: string,
) {
  await isRecruiterAuthenticated();
  try {
    await db
      .update(jobListingApplication)
      .set({ status: "accepted" })
      .where(
        and(
          eq(jobListingApplication.userId, userId),
          eq(jobListingApplication.jobListingId, jobId),
        ),
      );
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function rejectJobListingApplication(
  userId: string,
  jobId: string,
) {
  await isRecruiterAuthenticated();
  try {
    await db
      .update(jobListingApplication)
      .set({ status: "rejected" })
      .where(
        and(
          eq(jobListingApplication.userId, userId),
          eq(jobListingApplication.jobListingId, jobId),
        ),
      );
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getSavedJobsById(userId: string) {
  await isAuthenticated();
  try {
    const jobsSaved = await db
      .select({
        id: jobListingSaved.jobListingId,
        userId: jobListingSaved.userId,
        position: jobListing.position,
        location: jobListing.location,
        type: jobListing.type,
        experienceLevel: jobListing.experienceLevel,
      })
      .from(jobListingSaved)
      .leftJoin(jobListing, eq(jobListingSaved.jobListingId, jobListing.id))
      .where(eq(jobListingSaved.userId, userId));
    return jobsSaved;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getSavedJobsCountById(userId: string) {
  await isAuthenticated();
  try {
    const jobsSaved = await db
      .select({
        count: count(),
      })
      .from(jobListingSaved)
      .leftJoin(jobListing, eq(jobListingSaved.jobListingId, jobListing.id))
      .where(eq(jobListingSaved.userId, userId));
    return jobsSaved[0].count;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function createSavedJob(userId: string, jobId: string) {
  await isAuthenticated();
  try {
    await db.insert(jobListingSaved).values({ userId, jobListingId: jobId });
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function wasSaved(userId: string, jobId: string) {
  try {
    const saved = await db
      .select()
      .from(jobListingSaved)
      .where(
        and(
          eq(jobListingSaved.userId, userId),
          eq(jobListingSaved.jobListingId, jobId),
        ),
      );
    return saved.length > 0;
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

export async function getCompanyById(id: string) {
  try {
    const companyDetails = await db
      .select({ company: company, count: count(jobListing.id) })
      .from(company)
      .leftJoin(jobListing, eq(company.id, jobListing.companyId))
      .where(eq(company.id, id))
      .groupBy(company.id);
    return companyDetails;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getCompanies() {
  try {
    const companies = await db
      .select({
        count: count(jobListing.id),
        id: company.id,
        name: company.name,
        size: company.size,
        industry: company.industry,
        headquarters: company.headquarters,
        logoUrl: company.logoUrl,
      })
      .from(company)
      .leftJoin(jobListing, eq(company.id, jobListing.companyId))
      .groupBy(company.id);
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
  about: string,
  size: z.infer<typeof companySize>,
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
      size,
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
  about: string,
  size: z.infer<typeof companySize> | undefined,
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
        size,
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

export async function deleteSavedJob(userId: string, jobId: string) {
  try {
    await db
      .delete(jobListingSaved)
      .where(
        and(
          eq(jobListingSaved.userId, userId),
          eq(jobListingSaved.jobListingId, jobId),
        ),
      );
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}
