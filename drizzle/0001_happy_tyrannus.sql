ALTER TABLE "huts" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "huts" DROP CONSTRAINT "huts_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "huts" ADD CONSTRAINT "huts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
