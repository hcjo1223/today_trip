import React from "react";
import { getTours } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import TourListClient from "@/components/TourListClient";

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const user = await getCurrentUser();
  const tours = getTours({ currentUserId: user?.usUid ?? 1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          Travel Itinerary Community
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-stone-900">
          여행 일정 공유 게시판
        </h1>
        <p className="mt-1.5 text-sm text-stone-600">
          어디로, 누구와, 어떤 스타일로 떠나는지 선택하고 일차별 추천 동선과 메모를 확인해 보세요.
        </p>
      </div>

      <TourListClient initialTours={tours} />
    </div>
  );
}
