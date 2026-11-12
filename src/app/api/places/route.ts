import { NextResponse } from "next/server";
import {
  createReview,
  deleteReview,
  getPlaces,
  getReviewsByPlace,
  togglePlaceLike,
} from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentTypeId = searchParams.get("contentTypeId")
    ? Number(searchParams.get("contentTypeId"))
    : undefined;
  const areaCode = searchParams.get("areaCode")
    ? Number(searchParams.get("areaCode"))
    : undefined;
  const keyword = searchParams.get("keyword") || undefined;

  const user = await getCurrentUser();
  const list = getPlaces({
    contentTypeId,
    areaCode,
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
      const res = togglePlaceLike(Number(body.placeUid), activeUid);
      return NextResponse.json({ status: "OK", ...res });
    }

    if (body.action === "review") {
      if (!body.content || !body.content.trim()) {
        return NextResponse.json(
          { status: "FAIL", message: "리뷰 내용을 입력해주세요." },
          { status: 400 }
        );
      }
      const review = createReview(
        Number(body.placeUid),
        activeUid,
        body.content.trim(),
        Number(body.rate || 5)
      );
      const reviews = getReviewsByPlace(Number(body.placeUid));
      return NextResponse.json({ status: "OK", review, reviews });
    }

    if (body.action === "deleteReview") {
      const deleted = deleteReview(
        Number(body.rvUid),
        activeUid,
        user?.role === "ADMIN"
      );
      const reviews = getReviewsByPlace(Number(body.placeUid));
      return NextResponse.json({ status: deleted ? "OK" : "FAIL", reviews });
    }

    return NextResponse.json({ status: "FAIL", message: "잘못된 요청입니다." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "오류가 발생했습니다.";
    return NextResponse.json({ status: "FAIL", message }, { status: 500 });
  }
}
