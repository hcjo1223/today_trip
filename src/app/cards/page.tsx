import React from "react";
import { getPictures } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import CardsCommunityClient from "@/components/CardsCommunityClient";

export const dynamic = "force-dynamic";

export default async function CardsPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string; write?: string }>;
}) {
  const resolved = await searchParams;
  const user = await getCurrentUser();
  const posts = getPictures({ currentUserId: user?.usUid ?? 1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          Travel Photo Community
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-stone-900">
          여행 사진 커뮤니티
        </h1>
        <p className="mt-1.5 text-sm text-stone-600">
          지역별, 동행별, 여행 목적별로 분류된 여행자들의 생생한 사진과 기록을 만나보세요.
        </p>
      </div>

      <CardsCommunityClient
        initialPosts={posts}
        initialHighlightUid={
          resolved.highlight ? Number(resolved.highlight) : undefined
        }
        initialOpenWrite={resolved.write === "1"}
      />
    </div>
  );
}
