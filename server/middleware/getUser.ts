import { createMiddleware } from "hono/factory";
import { validateSessionToken } from "../lib/auth";
import { getCookie } from "hono/cookie";
import type { Users } from "../db/schema";

type Env = {
  Variables: {
    user: Users;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  const sessionId = getCookie(c, "session");

  const { user } = await validateSessionToken(sessionId!);
  if (user) c.set("user", user);

  await next();
});
