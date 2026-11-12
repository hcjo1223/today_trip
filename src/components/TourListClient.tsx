"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Eye,
  Heart,
  MapPin,
  Plus,
  Search,
} from "lucide-react";
import type { Tour } from "@/lib/types";
import { COMPANIONS, REGIONS, TRAVEL_STYLES } from "@/lib/constants";

interface TourListClientProps {
  initialTours: Tour[];
}

export default function TourListClient({ initialTours }: TourListClientProps) {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [location, setLocation] = useState<number>(0);
  const [withWho, setWithWho] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);
  const [keyword, setKeyword] = useState("");

  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      if (location !== 0 && t.location !== location) return false;
      if (withWho !== 0 && t.withWho !== withWho) return false;
      if (focus !== 0 && t.focus !== focus) return false;
      if (keyword.trim() !== "") {
        const kw = keyword.trim().toLowerCase();
        const match =
          t.title.toLowerCase().includes(kw) ||
          t.summary.toLowerCase().includes(kw) ||
          t.tags.some((tag) => tag.toLowerCase().includes(kw));
        if (!match) return false;
      }
      return true;
    });
  }, [tours, location, withWho, focus, keyword]);

  async function handleToggleLike(e: React.MouseEvent, tuUid: number) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", tuUid }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setTours((prev) =>
        prev.map((t) =>
          t.tuUid === tuUid
            ? { ...t, likedByMe: data.liked, likeCnt: data.likeCnt }
            : t
        )
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Filter Bar (어디로 / 누구와 / 여행스타일 / 검색) */}
      <div className="surface-card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select
            id="tour-filter-location"
            value={location}
            onChange={(e) => setLocation(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800 focus:outline-none focus:border-teal-700"
          >
            <option value={0}>어디로 (전체 지역)</option>
            {Object.entries(REGIONS).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select
            id="tour-filter-with"
            value={withWho}
            onChange={(e) => setWithWho(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800 focus:outline-none focus:border-teal-700"
          >
            <option value={0}>누구와 (전체 동행)</option>
            {Object.entries(COMPANIONS).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select
            id="tour-filter-focus"
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800 focus:outline-none focus:border-teal-700"
          >
            <option value={0}>여행스타일 (전체 테마)</option>
            {Object.entries(TRAVEL_STYLES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              id="tour-filter-keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="일정 제목 또는 태그 검색..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900 focus:outline-none focus:border-teal-700"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
          <span>
            총 <strong className="text-stone-900">{filteredTours.length}</strong>개의 여행 일정이 공유되어 있습니다.
          </span>
          <Link
            href="/tours/new"
            id="tour-create-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>새 여행 일정 작성하기</span>
          </Link>
        </div>
      </div>

      {/* Itinerary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <Link
            key={tour.tuUid}
            href={`/tours/${tour.tuUid}`}
            className="surface-card overflow-hidden flex flex-col group"
          >
            <div className="relative h-56 overflow-hidden bg-stone-200">
              <img
                src={tour.coverImage}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                  {REGIONS[tour.location] || "전국"}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 text-stone-900 backdrop-blur-xs">
                  {tour.period - 1 > 0
                    ? `${tour.period - 1}박 ${tour.period}일`
                    : "당일치기"}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => handleToggleLike(e, tour.tuUid)}
                aria-label="좋아요 토글"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    tour.likedByMe
                      ? "fill-rose-500 text-rose-500"
                      : "text-stone-600"
                  }`}
                />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-teal-800 font-medium">
                  <span>{COMPANIONS[tour.withWho] || "자유여행"}</span>
                  <span>·</span>
                  <span>{TRAVEL_STYLES[tour.focus] || "힐링"}</span>
                </div>
                <h2 className="mt-1.5 font-serif font-bold text-lg text-stone-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                  {tour.title}
                </h2>
                <p className="mt-1.5 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {tour.summary}
                </p>

                {/* Included Places Preview */}
                {tour.locations && tour.locations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                      포함된 방문 코스 ({tour.locations.length}곳)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tour.locations.slice(0, 3).map((loc, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#faf8f5] border border-[#e7e2da] text-xs text-stone-700"
                        >
                          <span className="text-[10px] font-bold text-teal-700">
                            D{loc.dayNumber}
                          </span>
                          <span className="truncate max-w-[120px]">
                            {loc.title}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-800">
                    {tour.nickname}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {tour.startDate}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    {tour.likeCnt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {tour.hits}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
