import React from "react";
import { getPlaces } from "@/lib/db";
import TourPlannerClient from "@/components/TourPlannerClient";

export const dynamic = "force-dynamic";

export default async function NewTourPage({
  searchParams,
}: {
  searchParams: Promise<{ placeUid?: string }>;
}) {
  const resolved = await searchParams;
  const preselectedPlaceUid = resolved.placeUid
    ? Number(resolved.placeUid)
    : undefined;
  const allPlaces = getPlaces();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          Interactive Trip Planner
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-stone-900">
          새 여행 일정 계획하기
        </h1>
        <p className="mt-1.5 text-sm text-stone-600">
          여행 시작일과 종료일을 지정하면 일차별 플래너가 자동 생성됩니다. 관광지·숙소·맛집을 검색해 나만의 코스를 완성하세요.
        </p>
      </div>

      <TourPlannerClient
        allPlaces={allPlaces}
        preselectedPlaceUid={preselectedPlaceUid}
      />
    </div>
  );
}
