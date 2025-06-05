"use server";
import { createJobListing } from "@/lib/queries";
import { jobListingSchema } from "@/lib/zod";
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
