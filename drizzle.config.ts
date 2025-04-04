import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle.ts",
  schema: "./lib/drizzle.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
