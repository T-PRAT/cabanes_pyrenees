import type { InferSelectModel } from "drizzle-orm";
import { pgTable, integer, decimal, timestamp, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
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
export type Sessions = InferSelectModel<typeof sessions>;
export type Huts = InferSelectModel<typeof huts>;
