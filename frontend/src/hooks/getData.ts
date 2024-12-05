import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";

const client = hc<ApiRoutes>("/");

export async function getHuts() {
  const response = await client.api.hut.$get();
  const data = await response.json();
  if (!data) return [];

  return data;
}

export async function getHut(id: number) {
  const response = await client.api.hut[":id"].$get({ param: { id: id.toString() } });
  const data = await response.json();

  return data;
}
