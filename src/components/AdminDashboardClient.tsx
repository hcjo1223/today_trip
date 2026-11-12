"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Calendar,
  Camera,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import type {
  AdminDashboardData,
  PicturePost,
  Place,
  Tour,
} from "@/lib/types";
import { PLACE_CONTENT_TYPES, REGIONS } from "@/lib/constants";

interface AdminDashboardClientProps {
  initialDashboard: AdminDashboardData;
  initialTours: Tour[];
  initialPictures: PicturePost[];
  allPlaces: Place[];
}

export default function AdminDashboardClient({
  initialDashboard,
  initialTours,
  initialPictures,
  allPlaces,
}: AdminDashboardClientProps) {
  const [tab, setTab] = useState<"overview" | "places" | "boards" | "users">(
    "overview"
  );
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [tours, setTours] = useState(initialTours);
  const [pictures, setPictures] = useState(initialPictures);
  const [placeFilter, setPlaceFilter] = useState<number>(0);

  const maxLog = Math.max(
    1,
    ...dashboard.dailyLogs.map((item) => item.count)
  );

  async function handleTogglePost(
    type: "tour" | "picture",
    uid: number,
    nextDeleted: number
  ) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "togglePost",
        type,
        uid,
        isDeleted: nextDeleted,
      }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      if (type === "tour") {
        setTours((prev) =>
          prev.map((t) =>
            t.tuUid === uid ? { ...t, isDeleted: nextDeleted } : t
          )
        );
      } else {
        setPictures((prev) =>
          prev.map((p) =>
            p.pcUid === uid ? { ...p, isDeleted: nextDeleted } : p
          )
        );
      }
    }
  }

  async function handleToggleUserRole(usUid: number, currentRole: string) {
    const nextRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateRole",
        usUid,
        role: nextRole,
      }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setDashboard((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.usUid === usUid ? { ...u, role: nextRole } : u
        ),
      }));
    }
  }

  const filteredPlaces =
    placeFilter === 0
      ? allPlaces
      : allPlaces.filter((p) => p.contentTypeId === placeFilter);

  return (
    <div className="space-y-8">
      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#e7e2da] pb-4">
        {[
          { id: "overview", label: "통계 및 방문 로그", icon: BarChart3 },
          {
            id: "places",
            label: `장소 DB 관리 (${allPlaces.length})`,
            icon: MapPin,
          },
          {
            id: "boards",
            label: `일정·사진 게시글 관리 (${tours.length + pictures.length})`,
            icon: Calendar,
          },
          {
            id: "users",
            label: `회원 및 권한 관리 (${dashboard.users.length})`,
            icon: Users,
          },
        ].map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setTab(item.id as "overview" | "places" | "boards" | "users")
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                active
                  ? "bg-stone-900 text-white"
                  : "bg-white border border-[#e7e2da] text-stone-700 hover:bg-stone-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Daily Visit Chart */}
      {tab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: "전체 회원", value: `${dashboard.totalUsers}명` },
              { label: "TourAPI 장소", value: `${dashboard.totalPlaces}곳` },
              { label: "공유된 여행 일정", value: `${dashboard.totalTours}건` },
              { label: "공유된 여행 사진", value: `${dashboard.totalPictures}장` },
              { label: "장소 별점 리뷰", value: `${dashboard.totalReviews}개` },
            ].map((stat, idx) => (
              <div key={idx} className="surface-card p-5">
                <p className="text-xs text-stone-500">{stat.label}</p>
                <p className="mt-1.5 text-2xl font-serif font-bold text-stone-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="surface-card p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                최근 7일 일별 방문자 추이 (user_log 집계)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                홈페이지 접속 시 자동 기록되는 방문 로그 통계입니다.
              </p>
            </div>

            <div className="grid grid-cols-7 gap-3 items-end h-52 pt-6 px-2 border-b border-stone-200">
              {dashboard.dailyLogs.map((log) => {
                const heightPct = Math.max(
                  12,
                  Math.round((log.count / maxLog) * 100)
                );
                return (
                  <div
                    key={log.date}
                    className="flex flex-col items-center justify-end h-full gap-2"
                  >
                    <span className="text-xs font-bold text-teal-800">
                      {log.count}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[44px] rounded-t-lg bg-[#0f766e] transition-all"
                    />
                    <span className="text-[11px] text-stone-500 pb-2">
                      {log.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Places Management (숙소 32 / 식당 39 / 관광지 12) */}
      {tab === "places" && (
        <div className="surface-card p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                한국관광공사 TourAPI 장소 DB 관리
              </h2>
              <p className="text-xs text-stone-500">
                카테고리별(관광지 12 · 숙박 32 · 음식점 39) 장소 조회수 및 평점 현황입니다.
              </p>
            </div>
            <div className="flex gap-1.5">
              {[
                { id: 0, label: "전체" },
                { id: 12, label: "관광지 (12)" },
                { id: 32, label: "숙박 (32)" },
                { id: 39, label: "음식점 (39)" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPlaceFilter(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    placeFilter === t.id
                      ? "bg-[#0f766e] text-white"
                      : "bg-[#faf8f5] border border-[#e7e2da] text-stone-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="py-3 px-3">UID</th>
                  <th className="py-3 px-3">분류</th>
                  <th className="py-3 px-3">장소명</th>
                  <th className="py-3 px-3">지역 / 주소</th>
                  <th className="py-3 px-3">평점</th>
                  <th className="py-3 px-3">조회수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPlaces.map((p) => (
                  <tr key={p.placeUid} className="hover:bg-stone-50/80">
                    <td className="py-3 px-3 font-mono text-xs text-stone-500">
                      #{p.placeUid}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-xs font-medium">
                        {PLACE_CONTENT_TYPES[p.contentTypeId]?.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      {p.title}
                    </td>
                    <td className="py-3 px-3 text-stone-600">
                      [{REGIONS[p.areaCode]}] {p.addr1}
                    </td>
                    <td className="py-3 px-3 font-semibold text-amber-600">
                      ★ {p.rateAvg > 0 ? p.rateAvg.toFixed(1) : "5.0"} (
                      {p.reviewCnt})
                    </td>
                    <td className="py-3 px-3 text-stone-600">{p.viewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Boards Management (일정 & 사진 삭제/복구 관리) */}
      {tab === "boards" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="surface-card p-6 space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>여행 일정 게시글 관리 (숨김 / 복구)</span>
            </h2>
            <div className="space-y-2.5">
              {tours.map((t) => (
                <div
                  key={t.tuUid}
                  className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e7e2da] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.isDeleted
                            ? "bg-rose-100 text-rose-800"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {t.isDeleted ? "숨김됨" : "공개중"}
                      </span>
                      <span className="text-xs text-stone-500">
                        {t.nickname} · {t.writeDate}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-stone-900 truncate mt-1">
                      {t.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleTogglePost(
                        "tour",
                        t.tuUid,
                        t.isDeleted === 0 ? 1 : 0
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 ${
                      t.isDeleted
                        ? "bg-teal-700 text-white"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {t.isDeleted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>복구</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>숨김</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-6 space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-teal-700" />
              <span>사진 커뮤니티 게시글 관리 (숨김 / 복구)</span>
            </h2>
            <div className="space-y-2.5">
              {pictures.map((p) => (
                <div
                  key={p.pcUid}
                  className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e7e2da] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.isDeleted
                            ? "bg-rose-100 text-rose-800"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {p.isDeleted ? "숨김됨" : "공개중"}
                      </span>
                      <span className="text-xs text-stone-500">
                        {p.nickname} · {p.writeDate}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-stone-900 truncate mt-1">
                      {p.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleTogglePost(
                        "picture",
                        p.pcUid,
                        p.isDeleted === 0 ? 1 : 0
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 ${
                      p.isDeleted
                        ? "bg-teal-700 text-white"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {p.isDeleted ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>복구</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>숨김</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Users & Authority Management */}
      {tab === "users" && (
        <div className="surface-card p-6 space-y-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">
              회원 목록 및 관리자 권한(USER_AUTHORITY) 제어
            </h2>
            <p className="text-xs text-stone-500">
              기존 AjaxAdminController의 권한 부여/해제 기능을 실시간 토글로 제공합니다.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="py-3 px-3">UID</th>
                  <th className="py-3 px-3">아이디</th>
                  <th className="py-3 px-3">닉네임</th>
                  <th className="py-3 px-3">이메일</th>
                  <th className="py-3 px-3">가입일</th>
                  <th className="py-3 px-3">현재 권한</th>
                  <th className="py-3 px-3">권한 변경</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {dashboard.users.map((u) => (
                  <tr key={u.usUid} className="hover:bg-stone-50/80">
                    <td className="py-3 px-3 font-mono text-xs text-stone-500">
                      #{u.usUid}
                    </td>
                    <td className="py-3 px-3 font-medium text-stone-800">
                      {u.userId}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      {u.nickname}
                    </td>
                    <td className="py-3 px-3 text-stone-600">{u.email}</td>
                    <td className="py-3 px-3 text-stone-500">{u.joinDate}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                          u.role === "ADMIN"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => handleToggleUserRole(u.usUid, u.role)}
                        className="px-3 py-1 rounded-lg border border-[#e7e2da] bg-white hover:bg-stone-100 text-xs font-medium text-stone-800 flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                        <span>
                          {u.role === "ADMIN" ? "일반회원으로" : "관리자 승격"}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
