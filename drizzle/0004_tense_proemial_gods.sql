ALTER TABLE "users" ADD COLUMN "password_hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "otp_secret";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "isActivated";