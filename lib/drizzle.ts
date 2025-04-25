import { drizzle } from "drizzle-orm/node-postgres";
import {
  pgTable,
  timestamp,
  text,
  boolean,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { on } from "events";

export const db = drizzle(process.env.DATABASE_URL!);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  resumeUrl: text("reusme_url"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: text("role"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
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
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const experienceLevelEnum = pgEnum("experience_level", [
  "none",
  "junior",
  "intermediate",
  "senior",
]);

export const jobType = pgEnum("job_type", [
  "full",
  "part",
  "internship",
  "remot",
]);

export const jobListing = pgTable("job_listing", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  position: text("position").notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  postedAt: timestamp("posted_at").defaultNow(),
});

export const jobApplication = pgTable("job_application", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  jobListingId: text("joblisting_id")
    .notNull()
    .references(() => jobListing.id),
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
});

export const jobSaved = pgTable("job_saved", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  jobListingId: text("joblisting_id")
    .notNull()
    .references(() => jobListing.id),
});

export const company = pgTable("company", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  foundationYear: integer("foundation_year"),
  headquarters: text("headquarters"),
  website: text("website"),
});

export const schema = { user, session, account, verification };
