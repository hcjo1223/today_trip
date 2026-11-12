import { NextResponse } from "next/server";
import {
  adminTogglePostStatus,
  adminUpdateUserRole,
  getAdminDashboardData,
  getPictures,
  getTours,
} from "@/lib/db";

export async function GET() {
  const dashboard = getAdminDashboardData();
  const allTours = getTours({ includeDeleted: true });
  const allPictures = getPictures({ includeDeleted: true });

  return NextResponse.json({
    status: "OK",
    dashboard,
    allTours,
    allPictures,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "togglePost") {
      adminTogglePostStatus(body.type, Number(body.uid), Number(body.isDeleted));
      return NextResponse.json({ status: "OK" });
    }

    if (body.action === "updateRole") {
      adminUpdateUserRole(Number(body.usUid), body.role === "ADMIN" ? "ADMIN" : "USER");
      return NextResponse.json({ status: "OK" });
    }

    return NextResponse.json({ status: "FAIL", message: "잘못된 요청입니다." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "관리자 작업 중 오류가 발생했습니다.";
    return NextResponse.json({ status: "FAIL", message }, { status: 500 });
  }
}
