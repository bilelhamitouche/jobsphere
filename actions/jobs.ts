"use server";
import {
  acceptJobListingApplication,
  createJobApplication,
  createJobListing,
  createSavedJob,
  deleteJobApplication,
  deleteJobListing,
  deleteSavedJob,
  rejectJobListingApplication,
  updateJobListing,
} from "@/lib/queries";
import { jobListingSchema, updateJobListingSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import "server-only";

export async function createJobAction(formData: FormData) {
  const position = formData.get("position");
  const description = formData.get("description");
  const location = formData.get("location");
  const type = formData.get("type");
  const experienceLevel = formData.get("experience_level");
  const recruiterId = formData.get("recruiter_id");
  const result = jobListingSchema.safeParse({
    description,
    position,
    type,
    experience_level: experienceLevel,
    location,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await createJobListing(
      result.data.position,
      result.data.location,
      result.data.type,
      result.data.experience_level,
      result.data.description,
      recruiterId as string,
    );
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function updateJobListingAction(formData: FormData) {
  const id = formData.get("id");
  const position = formData.get("position");
  const description = formData.get("description");
  const location = formData.get("location");
  const type = formData.get("type");
  const experienceLevel = formData.get("experience_level");
  console.log(id, position, description, location, type, experienceLevel);
  const result = updateJobListingSchema.safeParse({
    description,
    position,
    type,
    experience_level: experienceLevel,
    location,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await updateJobListing(
      id as string,
      result.data.position as string,
      result.data.description as string,
      result.data.location as string,
      result.data.type as "full" | "part" | "internship" | "remote",
      result.data.experience_level as "none" | "entry" | "mid" | "senior",
    );
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function deleteJobListingAction(jobId: string) {
  try {
    await deleteJobListing(jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
  revalidatePath("/recruiter/jobs");
}

export async function createJobListingApplicationAction(
  userId: string,
  jobId: string,
) {
  try {
    await createJobApplication(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function acceptJobListingApplicationAction(
  userId: string,
  jobId: string,
) {
  try {
    await acceptJobListingApplication(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}
export async function rejectJobListingApplicationAction(
  userId: string,
  jobId: string,
) {
  try {
    await rejectJobListingApplication(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function deleteJobListingApplicationAction(
  userId: string,
  jobId: string,
) {
  try {
    await deleteJobApplication(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function createSavedJobListing(userId: string, jobId: string) {
  try {
    await createSavedJob(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}

export async function deleteSavedJobListing(userId: string, jobId: string) {
  try {
    await deleteSavedJob(userId, jobId);
  } catch (err) {
    return {
      message: err,
    };
  }
}
