import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminDashboardData,
  getUserByCredentials,
  getUserById,
  registerUser,
  updateUserProfile,
} from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const rawUid = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const user = rawUid ? getUserById(Number(rawUid)) : null;
  const demoUsers = getAdminDashboardData().users;

  return NextResponse.json({
    status: "OK",
    user,
    demoUsers,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;
    const cookieStore = await cookies();

    if (action === "logout") {
      cookieStore.delete(SESSION_COOKIE_NAME);
      return NextResponse.json({ status: "OK", user: null });
    }

    if (action === "switch") {
      const targetUser = getUserById(Number(body.usUid));
      if (!targetUser) {
        return NextResponse.json(
          { status: "FAIL", message: "사용자를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      cookieStore.set(SESSION_COOKIE_NAME, String(targetUser.usUid), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ status: "OK", user: targetUser });
    }

    if (action === "login") {
      const user = getUserByCredentials(body.userId, body.password);
      if (!user) {
        return NextResponse.json(
          { status: "FAIL", message: "아이디 또는 비밀번호가 일치하지 않습니다." },
          { status: 401 }
        );
      }
      cookieStore.set(SESSION_COOKIE_NAME, String(user.usUid), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ status: "OK", user });
    }

    if (action === "register") {
      if (!body.userId || !body.password || !body.nickname || !body.email) {
        return NextResponse.json(
          { status: "FAIL", message: "필수 항목을 모두 입력해주세요." },
          { status: 400 }
        );
      }
      const user = registerUser({
        userId: body.userId.trim(),
        password: body.password,
        email: body.email.trim(),
        nickname: body.nickname.trim(),
        gender: Number(body.gender || 0),
        birth: body.birth || null,
        memo: body.memo || "",
      });
      cookieStore.set(SESSION_COOKIE_NAME, String(user.usUid), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ status: "OK", user });
    }

    if (action === "update") {
      const rawUid = cookieStore.get(SESSION_COOKIE_NAME)?.value;
      const usUid = Number(rawUid || body.usUid || 1);
      const updated = updateUserProfile(usUid, {
        nickname: body.nickname,
        email: body.email,
        memo: body.memo,
        profilePic: body.profilePic,
      });
      return NextResponse.json({ status: "OK", user: updated });
    }

    return NextResponse.json({ status: "FAIL", message: "지원하지 않는 요청입니다." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "요청 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ status: "FAIL", message }, { status: 500 });
  }
}
