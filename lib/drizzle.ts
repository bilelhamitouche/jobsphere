import { drizzle } from "drizzle-orm/node-postgres";
import {
  pgTable,
  timestamp,
  text,
  boolean,
  pgEnum,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const db = drizzle(process.env.DATABASE_URL!);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  role: text("role"),
  resumeUrl: text("resume_url"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const experienceLevelEnum = pgEnum("experience_level", [
  "none",
  "entry",
  "mid",
  "senior",
]);

export const jobType = pgEnum("job_type", [
  "full",
  "part",
  "internship",
  "remote",
]);

export const jobCategory = pgEnum("job_category", [
  "Information Technology",
  "Business & Management",
  "Finance & Accounting",
  "Sales & Marketing",
  "Engineering",
  "Creative & Media",
  "Healthcare & Medicine",
  "Education & Training",
  "Manufacturing & Skilled Trades",
  "Logistics & Transportation",
  "Hospitality & Tourism",
  "Legal",
  "Government & Public Sector",
  "Science & Research",
  "Retail",
  "Other",
]);

export const jobListing = pgTable("job_listing", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  description: text("description").notNull(),
  position: text("position").notNull(),
  type: jobType("job_type").notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  location: text("location"),
  category: jobCategory("category").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  postedAt: timestamp("posted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const jobListingRequirement = pgTable("job_listing_requirement", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  requirement: text("requirement").notNull(),
  jobListingId: text("job_listing_id")
    .notNull()
    .references(() => jobListing.id, { onDelete: "cascade" }),
});

export const jobListingResponsibility = pgTable("job_listing_responsibility", {
  id: text("responsibility_id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  responsibility: text("responsiblity").notNull(),
  jobListingId: text("job_listing_id")
    .notNull()
    .references(() => jobListing.id, { onDelete: "cascade" }),
});

export const jobApplicationStatus = pgEnum("job_application_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const jobListingApplication = pgTable(
  "job_listing_application",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    jobListingId: text("job_listing_id")
      .notNull()
      .references(() => jobListing.id, { onDelete: "cascade" }),
    status: jobApplicationStatus().default("pending"),
    appliedAt: timestamp("applied_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.jobListingId] })],
);

export const jobListingSaved = pgTable(
  "job_listing_saved",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    jobListingId: text("job_listing_id")
      .notNull()
      .references(() => jobListing.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.jobListingId] })],
);

export const industry = pgEnum("industry", [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Transportation",
  "Energy",
  "Telecommunications",
  "Food & Beverage",
  "Consulting",
  "Manufactoring",
  "Government",
  "Pharmaceuticals",
  "Insurance",
  "E-Commerce",
]);

export const companySize = pgEnum("company_size", ["small", "mid", "large"]);

export const company = pgTable("company", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  about: text("about").notNull(),
  size: companySize("size").notNull(),
  foundationYear: integer("foundation_year").notNull(),
  headquarters: text("headquarters"),
  website: text("website"),
  logoUrl: text("logo_url"),
  industry: industry("industry").notNull(),
  recruiterId: text("recruiter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const schema = { user, session, account, verification };
