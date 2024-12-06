import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { authenticator } from "otplib";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";

const JWTsecret = process.env.JWT_SECRET!;

const usersRoute = new Hono();

// POST /api/users - Create a new user with an OTP secret
usersRoute.post("/", async (c) => {
  const name = c.req.query("name");
  if (!name) return c.json({ error: "Name parameter is required" }, 400);

  const user = await db.select().from(users).where(eq(users.name, name));
  if (user.length > 0) return c.json({ error: "User already exists" }, 400);

  const otpSecret = authenticator.generateSecret();
  return c.json({ otpSecret });
});

// POST /api/users/verify - Verify the OTP secret
usersRoute.post("/verify", async (c) => {
  const name = c.req.query("name");
  const code = c.req.query("code");
  if (!name || !code) return c.json({ error: "Name and code parameters are required" }, 400);

  const user = await db.select().from(users).where(eq(users.name, name));
  if (user.length !== 1) return c.json({ error: "User not found" }, 400);

  const isValid = authenticator.check(code, user[0].otpSecret);

  if (!isValid) return c.json({ error: "Invalid code" }, 400);

  !user[0].isActivated && (await db.update(users).set({ isActivated: true }).where(eq(users.name, name)));

  return c.json({
    token: sign({ sub: user[0].name, exp: 30 }, JWTsecret),
  });
});

export default usersRoute;
