import { hc } from "hono/client";
import { type ApiType } from "@server/app";

const client = hc<ApiType>("/");
const api = client.api;

export async function getHutss() {
  const response = await api.huts.$get();
  const data = await response.json();
  if (!data) return [];

  return data;
}

export async function getHuts(id: number) {
  const response = await api.huts[":id"].$get({ param: { id: id.toString() } });
  const data = await response.json();

  return data;
}

export async function login(username: string, password: string) {
  const response = await api.auth.login.$post({ form: { username, password } });
  const data = await response.json();

  return data;
}

export async function signup(username: string, password: string) {
  const response = await api.auth.signup.$post({ form: { username, password } });
  const data = await response.json();

  return data;
}

export async function logout() {
  const response = await api.auth.logout.$post();
  const data = await response.json();

  return data;
}

export async function getUser() {
  const response = await api.auth.me.$get();
  console.log(response);
  const data = await response.json();

  return data;
}
