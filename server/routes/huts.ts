import { Hono } from "hono";
import { db } from "../db";
import { huts } from "../db/schema";
import { eq } from "drizzle-orm";

const hutsRoute = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(huts);

    return c.json(data);
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const data = await db.select().from(huts).where(eq(huts.id, id));

    data.length !== 1 && c.status(404);
    return c.json(data[0]);
  });

export default hutsRoute;
