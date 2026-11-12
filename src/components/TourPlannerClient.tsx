"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Plus,
  Search,
  Trash2,
  X,
  Check,
} from "lucide-react";
import type { Place } from "@/lib/types";
import {
  COMPANIONS,
  PLACE_CONTENT_TYPES,
  REGIONS,
  TRAVEL_STYLES,
} from "@/lib/constants";

interface TourPlannerClientProps {
  allPlaces: Place[];
  preselectedPlaceUid?: number;
}

export default function TourPlannerClient({
  allPlaces,
  preselectedPlaceUid,
}: TourPlannerClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [startDate, setStartDate] = useState("2026-11-20");
  const [endDate, setEndDate] = useState("2026-11-22");
  const [location, setLocation] = useState<number>(17);
  const [withWho, setWithWho] = useState<number>(3);
  const [focus, setFocus] = useState<number>(6);
  const [tagInput, setTagInput] = useState("제주도,힐링코스,로컬맛집");

  // Day-by-Day selected places: Record<dayNumber, Place[]>
  const [dayPlaces, setDayPlaces] = useState<Record<number, Place[]>>(() => {
    if (preselectedPlaceUid) {
      const found = allPlaces.find((p) => p.placeUid === preselectedPlaceUid);
      if (found) return { 1: [found] };
    }
    return { 1: allPlaces.slice(0, 1) };
  });

  // Day-by-Day memos: Record<dayNumber, string>
  const [dayMemos, setDayMemos] = useState<Record<number, string>>({
    1: "오전 일찍 명소 산책 후 근처 로컬 식당에서 점심 식사",
  });

  // Modal state for Place Search (기존 #placeModal 대체)
  const [modalDay, setModalDay] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculate total days from startDate ~ endDate (up to 10 days)
  const totalDays = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (!Number.isFinite(diff) || diff < 1) return 1;
    return Math.min(10, diff);
  }, [startDate, endDate]);

  const daysList = Array.from({ length: totalDays }, (_, i) => i + 1);

  const modalFilteredPlaces = useMemo(() => {
    return allPlaces.filter((p) => {
      if (searchType !== 0 && p.contentTypeId !== searchType) return false;
      if (searchKeyword.trim() !== "") {
        const kw = searchKeyword.trim().toLowerCase();
        return (
          p.title.toLowerCase().includes(kw) ||
          p.addr1.toLowerCase().includes(kw)
        );
      }
      return true;
    });
  }, [allPlaces, searchType, searchKeyword]);

  function handleAddPlaceToDay(day: number, place: Place) {
    setDayPlaces((prev) => {
      const current = prev[day] || [];
      return { ...prev, [day]: [...current, place] };
    });
  }

  function handleRemovePlaceFromDay(day: number, index: number) {
    setDayPlaces((prev) => {
      const current = prev[day] || [];
      return {
        ...prev,
        [day]: current.filter((_, idx) => idx !== index),
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!title.trim()) {
      setErrorMsg("여행 일정 제목을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const locationsPayload: {
        placeUid: number;
        dayNumber: number;
        visitOrder: number;
      }[] = [];

      for (const day of daysList) {
        const placesForDay = dayPlaces[day] || [];
        placesForDay.forEach((p, idx) => {
          locationsPayload.push({
            placeUid: p.placeUid,
            dayNumber: day,
            visitOrder: idx + 1,
          });
        });
      }

      const memosPayload = daysList
        .map((day) => ({
          memoDay: day,
          memoContents: dayMemos[day] || "",
        }))
        .filter((m) => m.memoContents.trim() !== "");

      const tags = tagInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title,
          summary:
            summary.trim() ||
            `${REGIONS[location]}로 떠나는 ${totalDays - 1}박 ${totalDays}일 맞춤형 여행 코스`,
          startDate,
          endDate,
          location,
          withWho,
          focus,
          tags,
          locations: locationsPayload,
          memos: memosPayload,
        }),
      });

      const data = await res.json();
      if (data.status === "OK" && data.tuUid) {
        router.push(`/tours/${data.tuUid}`);
        router.refresh();
      } else {
        setErrorMsg(data.message || "일정 저장에 실패했습니다.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Info & Categories */}
        <div className="surface-card p-6 sm:p-8 space-y-5">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
            1. 기본 여행 정보 및 테마 설정
          </h2>

          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label
                htmlFor="planner-title"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                여행 일정 제목 *
              </label>
              <input
                id="planner-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 가을 바람 따라 걷는 제주 동쪽 해안과 흑돼지 미식 2박 3일"
                className="w-full px-4 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900 focus:outline-none focus:border-teal-700"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="planner-summary"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                한줄 소개
              </label>
              <input
                id="planner-summary"
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="여행의 핵심 포인트나 동선 특징을 간단히 적어주세요."
                className="w-full px-4 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900 focus:outline-none focus:border-teal-700"
              />
            </div>

            <div>
              <label
                htmlFor="planner-start-date"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                여행 시작일
              </label>
              <input
                id="planner-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
              />
            </div>

            <div>
              <label
                htmlFor="planner-end-date"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                여행 종료일 (자동으로 DAY 1 ~ DAY {totalDays} 생성)
              </label>
              <input
                id="planner-end-date"
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label
                htmlFor="planner-location"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                어디로 (지역)
              </label>
              <select
                id="planner-location"
                value={location}
                onChange={(e) => setLocation(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
              >
                {Object.entries(REGIONS).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="planner-with"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                누구와 (동행)
              </label>
              <select
                id="planner-with"
                value={withWho}
                onChange={(e) => setWithWho(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
              >
                {Object.entries(COMPANIONS).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="planner-focus"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                여행 스타일 (테마)
              </label>
              <select
                id="planner-focus"
                value={focus}
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
              >
                {Object.entries(TRAVEL_STYLES).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="planner-tags"
              className="block text-xs font-semibold text-stone-700 mb-1.5"
            >
              태그 (쉼표 `,`로 구분)
            </label>
            <input
              id="planner-tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="제주도, 성산일출봉, 가족여행"
              className="w-full px-4 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900"
            />
          </div>
        </div>

        {/* Step 2: Day-by-Day Course Builder */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              2. 일차별 방문 장소 &amp; 여행 노트 (총 {totalDays}일)
            </h2>
            <span className="text-xs text-stone-500">
              각 일차마다 관광지, 숙박, 음식점을 자유롭게 추가하세요.
            </span>
          </div>

          {daysList.map((day) => {
            const selectedForDay = dayPlaces[day] || [];
            return (
              <div key={day} className="surface-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-md bg-stone-900 text-white font-serif font-bold text-xs">
                      DAY {day}
                    </span>
                    <span className="text-sm font-semibold text-stone-800">
                      {day}일차 동선 ({selectedForDay.length}곳 선택됨)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalDay(day)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>장소 검색 &amp; 추가</span>
                  </button>
                </div>

                {/* Selected Places for Day */}
                {selectedForDay.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedForDay.map((p, idx) => {
                      const typeInfo = PLACE_CONTENT_TYPES[p.contentTypeId] || {
                        label: "장소",
                      };
                      return (
                        <div
                          key={`${p.placeUid}-${idx}`}
                          className="p-3 rounded-xl bg-[#faf8f5] border border-[#e7e2da] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-full bg-teal-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <img
                              src={p.firstImage2}
                              alt={p.title}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-semibold text-teal-800">
                                {typeInfo.label}
                              </span>
                              <p className="text-xs font-semibold text-stone-900 truncate">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-stone-500 truncate">
                                {p.addr1}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePlaceFromDay(day, idx)}
                            className="p-1.5 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                            title="장소 제외"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-6 text-center rounded-xl border border-dashed border-stone-300 bg-[#faf8f5]/50">
                    <p className="text-xs text-stone-500">
                      우측 상단의 &lsquo;장소 검색 &amp; 추가&rsquo; 버튼을 눌러 {day}일차 코스를 구성해 보세요.
                    </p>
                  </div>
                )}

                {/* Daily Memo */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    DAY {day} 여행 메모
                  </label>
                  <textarea
                    rows={2}
                    value={dayMemos[day] || ""}
                    onChange={(e) =>
                      setDayMemos((prev) => ({
                        ...prev,
                        [day]: e.target.value,
                      }))
                    }
                    placeholder={`${day}일차 이동 수단, 추천 시간대, 준비물 등 메모를 남겨보세요.`}
                    className="w-full p-3 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl border border-[#e7e2da] bg-white hover:bg-stone-50 text-sm font-medium text-stone-700"
          >
            취소하기
          </button>
          <button
            type="submit"
            id="planner-submit-btn"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-sm font-semibold shadow-xs transition-colors disabled:opacity-50"
          >
            {submitting ? "일정 저장 중..." : "여행 일정 올리기"}
          </button>
        </div>
      </form>

      {/* Place Search Modal (기존 #placeModal 업그레이드) */}
      {modalDay !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#e7e2da] shadow-xl max-w-2xl w-full max-h-[82vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  DAY {modalDay} 방문 장소 검색 및 추가
                </h3>
                <p className="text-xs text-stone-500">
                  관광지(12), 숙박(32), 음식점(39)을 선택해 일정에 담으세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalDay(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#faf8f5] border-b border-stone-100 flex flex-col sm:flex-row gap-2.5">
              <div className="flex gap-1.5">
                {[
                  { id: 0, label: "전체" },
                  { id: 12, label: "관광지" },
                  { id: 32, label: "숙소" },
                  { id: 39, label: "맛집" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSearchType(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      searchType === t.id
                        ? "bg-stone-900 text-white"
                        : "bg-white border border-[#e7e2da] text-stone-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="관광지/맛집/숙소 이름 또는 주소 검색"
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#e7e2da] bg-white text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
              {modalFilteredPlaces.map((place) => {
                const alreadyAdded = (dayPlaces[modalDay] || []).some(
                  (x) => x.placeUid === place.placeUid
                );
                const typeInfo = PLACE_CONTENT_TYPES[place.contentTypeId] || {
                  label: "장소",
                };
                return (
                  <div
                    key={place.placeUid}
                    className="p-3 rounded-xl border border-[#e7e2da] hover:border-teal-700/50 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={place.firstImage2}
                        alt={place.title}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold text-teal-800">
                          {typeInfo.label} · {REGIONS[place.areaCode] || "전국"}
                        </span>
                        <p className="text-sm font-semibold text-stone-900 truncate">
                          {place.title}
                        </p>
                        <p className="text-xs text-stone-500 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {place.addr1}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddPlaceToDay(modalDay, place)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-1 ${
                        alreadyAdded
                          ? "bg-teal-50 text-teal-800 border border-teal-200"
                          : "bg-[#0f766e] text-white hover:bg-[#115e59]"
                      }`}
                    >
                      {alreadyAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>추가됨 (+1)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>일정에 담기</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-3 bg-[#faf8f5] border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalDay(null)}
                className="px-5 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
