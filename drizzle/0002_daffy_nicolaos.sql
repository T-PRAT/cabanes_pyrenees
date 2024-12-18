CREATE TABLE IF NOT EXISTS "hut_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hut_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"hutId" integer NOT NULL,
	"image_url" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hut_images" ADD CONSTRAINT "hut_images_hutId_huts_id_fk" FOREIGN KEY ("hutId") REFERENCES "public"."huts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
