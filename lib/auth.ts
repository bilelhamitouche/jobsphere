import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "./drizzle";

export const auth = betterAuth({
  session: {
    cookieCache: {
      maxAge: 60 * 5,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "jobseeker",
        nullable: false,
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});
