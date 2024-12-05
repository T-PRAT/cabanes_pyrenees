import type { InferSelectModel } from "drizzle-orm";
import { text, pgTable, integer, decimal, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const hut = pgTable("hut", {
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
export type Hut = InferSelectModel<typeof hut>;
