import { cookies } from "next/headers";
import { getUserById } from "./db";
import type { User } from "./types";

export const SESSION_COOKIE_NAME = "today_trip_session_uid";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const rawUid = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!rawUid) {
    // Default to demo user #1 (조호철 - 총괄 디렉터) only when explicitly logged in,
    // or return null when logged out.
    return null;
  }
  const uid = Number(rawUid);
  if (!Number.isFinite(uid) || uid <= 0) return null;
  return getUserById(uid);
}
