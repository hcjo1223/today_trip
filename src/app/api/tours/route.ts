import { NextResponse } from "next/server";
import { createTour, getTours, toggleTourLike } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location")
    ? Number(searchParams.get("location"))
    : undefined;
  const withWho = searchParams.get("withWho")
    ? Number(searchParams.get("withWho"))
    : undefined;
  const focus = searchParams.get("focus") ? Number(searchParams.get("focus")) : undefined;
  const keyword = searchParams.get("keyword") || undefined;

  const user = await getCurrentUser();
  const list = getTours({
    location,
    withWho,
    focus,
    keyword,
    currentUserId: user?.usUid ?? 1,
  });

  return NextResponse.json({
    status: "OK",
    count: list.length,
    list,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getCurrentUser();
    const activeUid = user?.usUid ?? Number(body.usUid || 1);

    if (body.action === "like") {
      const res = toggleTourLike(Number(body.tuUid), activeUid);
      return NextResponse.json({ status: "OK", ...res });
    }

    if (body.action === "create") {
      if (!body.title || !body.startDate || !body.endDate) {
        return NextResponse.json(
          { status: "FAIL", message: "제목과 여행 시작일·종료일을 입력해주세요." },
          { status: 400 }
        );
      }

      const tuUid = createTour({
        usUid: activeUid,
        title: body.title.trim(),
        summary: (body.summary || "").trim(),
        location: Number(body.location || 1),
        withWho: Number(body.withWho || 1),
        focus: Number(body.focus || 1),
        startDate: body.startDate,
        endDate: body.endDate,
        coverImage: body.coverImage,
        tags: Array.isArray(body.tags) ? body.tags : [],
        locations: Array.isArray(body.locations) ? body.locations : [],
        memos: Array.isArray(body.memos) ? body.memos : [],
      });

      return NextResponse.json({ status: "OK", tuUid });
    }

    return NextResponse.json({ status: "FAIL", message: "지원하지 않는 요청입니다." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "일정 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ status: "FAIL", message }, { status: 500 });
  }
}
