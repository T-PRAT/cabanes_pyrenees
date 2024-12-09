import { eq } from "drizzle-orm";
import type { Sessions, Users } from "../db/schema";
import { sessions, users } from "../db/schema";
import { db } from "../db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const expirationTime = 1000 * 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export function generateUserId(): number {
  const userId = Math.floor(10000000 + Math.random() * 90000000);
  return userId;
}

export async function createSession(token: string, userId: number): Promise<Sessions> {
  const newSessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const newSession: Sessions = {
    id: newSessionId,
    userId,
    expiresAt: new Date(Date.now() + expirationTime),
  };
  await db.insert(sessions).values(newSession);
  return newSession;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - expirationTime / 2) {
    session.expiresAt = new Date(Date.now() + expirationTime);
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export type SessionValidationResult = { session: Sessions; user: Users } | { session: null; user: null };
