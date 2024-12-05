import { Hono } from "hono";
import { db } from "../db";
import { hut } from "../db/schema";
import { eq } from "drizzle-orm";

export const hutRoute = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(hut);

    return c.json(data);
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const data = await db.select().from(hut).where(eq(hut.id, id));

    data.length !== 1 && c.status(404);
    return c.json(data[0]);
  });
