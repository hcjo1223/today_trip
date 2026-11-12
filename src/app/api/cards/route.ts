import { NextResponse } from "next/server";
import {
  addPictureComment,
  createPicturePost,
  getPictures,
  togglePictureLike,
} from "@/lib/db";
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

  const user = await getCurrentUser();
  const list = getPictures({
    location,
    withWho,
    focus,
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
      const res = togglePictureLike(Number(body.pcUid), activeUid);
      return NextResponse.json({ status: "OK", ...res });
    }

    if (body.action === "comment") {
      if (!body.contents || !body.contents.trim()) {
        return NextResponse.json(
          { status: "FAIL", message: "댓글 내용을 입력해주세요." },
          { status: 400 }
        );
      }
      const comment = addPictureComment(
        Number(body.pcUid),
        activeUid,
        body.contents.trim()
      );
      return NextResponse.json({ status: "OK", comment });
    }

    if (body.action === "create") {
      if (!body.title || !body.contents) {
        return NextResponse.json(
          { status: "FAIL", message: "제목과 사진 설명을 입력해주세요." },
          { status: 400 }
        );
      }
      const pcUid = createPicturePost({
        usUid: activeUid,
        title: body.title.trim(),
        contents: body.contents.trim(),
        location: Number(body.location || 1),
        withWho: Number(body.withWho || 1),
        focus: Number(body.focus || 1),
        imageUrl: body.imageUrl || "/images/jeju.jpg",
        tags: Array.isArray(body.tags) ? body.tags : [],
      });
      return NextResponse.json({ status: "OK", pcUid });
    }

    return NextResponse.json({ status: "FAIL", message: "잘못된 요청입니다." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "처리 중 오류가 발생했습니다.";
    return NextResponse.json({ status: "FAIL", message }, { status: 500 });
  }
}
