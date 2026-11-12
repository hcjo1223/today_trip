import React from "react";
import { getPlaces } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import PlaceListClient from "@/components/PlaceListClient";

export const dynamic = "force-dynamic";

export default async function PlacesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialType = resolvedParams.type ? Number(resolvedParams.type) : 0;
  const user = await getCurrentUser();
  const places = getPlaces({ currentUserId: user?.usUid ?? 1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          Korea TourAPI Directory
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-stone-900">
          전국 관광지 · 숙소 · 맛집 탐색
        </h1>
        <p className="mt-1.5 text-sm text-stone-600">
          한국관광공사 TourAPI 데이터를 기반으로 엄선한 여행 명소와 실제 여행자들의 별점 리뷰를 확인하세요.
        </p>
      </div>

      <PlaceListClient initialPlaces={places} initialType={initialType} />
    </div>
  );
}
