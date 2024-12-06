import type { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, integer, decimal, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  otpSecret: varchar("otp_secret", { length: 255 }).notNull(),
  isActivated: boolean().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const huts = pgTable("huts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  latitude: decimal().notNull(),
  longitude: decimal().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Users = InferSelectModel<typeof users>;
export type Huts = InferSelectModel<typeof huts>;
