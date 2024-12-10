ALTER TABLE "huts" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "huts" ADD COLUMN "summer_capacity" integer;--> statement-breakpoint
ALTER TABLE "huts" ADD COLUMN "winter_capacity" integer;--> statement-breakpoint
ALTER TABLE "huts" ADD COLUMN "altitude" integer NOT NULL;