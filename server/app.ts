import { Hono } from "hono";
import { logger } from "hono/logger";
import { hutRoute } from "./routes/hut";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/hut", hutRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist/index.html" }));

export default app;

//export for the front-end
export type ApiRoutes = typeof apiRoutes;
