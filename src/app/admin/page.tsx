import React from "react";
import {
  getAdminDashboardData,
  getPictures,
  getPlaces,
  getTours,
} from "@/lib/db";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const dashboard = getAdminDashboardData();
  const allTours = getTours({ includeDeleted: true });
  const allPictures = getPictures({ includeDeleted: true });
  const allPlaces = getPlaces();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          System Administration
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-stone-900">
          오늘의여행 통합 관리자 대시보드
        </h1>
        <p className="mt-1.5 text-sm text-stone-600">
          일별 방문자 로그 통계, TourAPI 장소 DB, 여행 일정 및 사진 커뮤니티 게시글, 회원 권한을 통합 관리합니다.
        </p>
      </div>

      <AdminDashboardClient
        initialDashboard={dashboard}
        initialTours={allTours}
        initialPictures={allPictures}
        allPlaces={allPlaces}
      />
    </div>
  );
}
