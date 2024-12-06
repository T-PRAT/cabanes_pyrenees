import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";

const client = hc<ApiRoutes>("/");

export async function getHutss() {
  const response = await client.api.huts.$get();
  const data = await response.json();
  if (!data) return [];

  return data;
}

export async function getHuts(id: number) {
  const response = await client.api.huts[":id"].$get({ param: { id: id.toString() } });
  const data = await response.json();

  return data;
}
