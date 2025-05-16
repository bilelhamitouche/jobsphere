"use server";
import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const signInSchemaValidation = signInSchema.safeParse({ email, password });
    if (!signInSchemaValidation.success) {
      return {
        errors: signInSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signInEmail({
      body: {
        email: signInSchemaValidation.data.email,
        password: signInSchemaValidation.data.password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function signUpAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const signUpSchemaValidation = signUpSchema.safeParse({
      name,
      email,
      password,
    });
    if (!signUpSchemaValidation.success) {
      return {
        errors: signUpSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signUpEmail({
      body: {
        name: signUpSchemaValidation.data.name,
        email: signUpSchemaValidation.data.email,
        password: signUpSchemaValidation.data.password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function recruiterSignInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const signInSchemaValidation = signInSchema.safeParse({ email, password });
    if (!signInSchemaValidation.success) {
      return {
        errors: signInSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signInEmail({
      body: {
        email: signInSchemaValidation.data.email,
        password: signInSchemaValidation.data.password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function recruiterSignUpAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const signUpSchemaValidation = signUpSchema.safeParse({
      name,
      email,
      password,
    });
    if (!signUpSchemaValidation.success) {
      return {
        errors: signUpSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signUpEmail({
      body: {
        name: signUpSchemaValidation.data.name,
        email: signUpSchemaValidation.data.email,
        password: signUpSchemaValidation.data.password,
        role: "recruiter",
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session;
}

export async function getUserInfo() {
  const session = await getSession();
  return session?.user;
}

export async function isAuthenticated() {
  const session = await getSession();
  if(!session) redirect("/signin");
}

export async function isRecruiterAuthenticated() {
  const session = await getSession();
  if(!session) redirect("/recruiter-signin");
}
