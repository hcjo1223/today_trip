"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Eye,
  FileText,
  Heart,
  MapPin,
  Tag,
} from "lucide-react";
import type { Tour } from "@/lib/types";
import {
  COMPANIONS,
  PLACE_CONTENT_TYPES,
  REGIONS,
  TRAVEL_STYLES,
} from "@/lib/constants";

export default function TourDetailClient({ initialTour }: { initialTour: Tour }) {
  const [tour, setTour] = useState<Tour>(initialTour);

  const days = Array.from({ length: Math.max(1, tour.period) }, (_, i) => i + 1);

  async function handleToggleLike() {
    const res = await fetch("/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", tuUid: tour.tuUid }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setTour((prev) => ({
        ...prev,
        likedByMe: data.liked,
        likeCnt: data.likeCnt,
      }));
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/tours"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>일정 게시판으로 돌아가기</span>
        </Link>
        <Link
          href="/tours/new"
          className="px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs sm:text-sm font-medium transition-colors"
        >
          나도 여행 일정 작성하기 →
        </Link>
      </div>

      {/* Hero Cover Banner */}
      <div className="surface-card overflow-hidden">
        <div className="relative h-72 sm:h-80 bg-stone-900">
          <img
            src={tour.coverImage}
            alt={tour.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-200 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-black/50 border border-white/15">
                {REGIONS[tour.location] || "전국"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/50 border border-white/15">
                {COMPANIONS[tour.withWho] || "자유여행"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/50 border border-white/15">
                {TRAVEL_STYLES[tour.focus] || "힐링"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {tour.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-200 max-w-3xl">
              {tour.summary}
            </p>
          </div>
        </div>

        <div className="p-5 sm:px-8 bg-white flex flex-wrap items-center justify-between gap-4 border-t border-[#e7e2da]">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-600">
            <span className="font-semibold text-stone-900">
              작성자: {tour.nickname}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-700" />
              {tour.startDate} ~ {tour.endDate} (
              {tour.period - 1 > 0
                ? `${tour.period - 1}박 ${tour.period}일`
                : "당일치기"}
              )
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-stone-400" /> 조회 {tour.hits}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleLike}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 border transition-colors ${
              tour.likedByMe
                ? "bg-rose-50 border-rose-200 text-rose-700"
                : "bg-[#faf8f5] border-[#e7e2da] text-stone-800 hover:bg-stone-100"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                tour.likedByMe ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
            <span>일정 찜하기 {tour.likeCnt}</span>
          </button>
        </div>
      </div>

      {/* Day-by-Day Timeline (기존 calender/read.jsp 일차별 장소 + 메모 타임라인) */}
      <div className="space-y-6">
        {days.map((day) => {
          const dayPlaces = (tour.locations || []).filter(
            (loc) => loc.dayNumber === day
          );
          const dayMemos = (tour.memos || []).filter((m) => m.memoDay === day);

          return (
            <div key={day} className="surface-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#0f766e] text-white font-serif font-bold text-sm">
                    DAY {day}
                  </span>
                  <h2 className="font-serif font-bold text-lg text-stone-900">
                    {day}일차 여행 코스
                  </h2>
                </div>
                <span className="text-xs text-stone-500">
                  방문 장소 {dayPlaces.length}곳 · 메모 {dayMemos.length}건
                </span>
              </div>

              {/* Places for this Day */}
              {dayPlaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dayPlaces.map((loc, idx) => {
                    const typeInfo = PLACE_CONTENT_TYPES[
                      loc.contentTypeId || 12
                    ] || { label: "장소" };
                    return (
                      <Link
                        key={idx}
                        href={`/places/${loc.placeUid}`}
                        className="p-3.5 rounded-xl bg-[#faf8f5] hover:bg-stone-100 border border-[#e7e2da] flex items-center gap-4 transition-colors"
                      >
                        <span className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <img
                          src={loc.firstImage2 || "/images/jeju.jpg"}
                          alt={loc.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 bg-stone-200"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold text-teal-800">
                            {typeInfo.label}
                          </span>
                          <h3 className="font-semibold text-sm text-stone-900 truncate">
                            {loc.title}
                          </h3>
                          <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {loc.addr1}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-stone-400">
                  등록된 방문 장소가 없습니다.
                </p>
              )}

              {/* Memos for this Day */}
              {dayMemos.length > 0 && (
                <div className="space-y-2 pt-2">
                  {dayMemos.map((memo, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3"
                    >
                      <FileText className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-amber-900">
                          DAY {day} 여행자 노트
                        </p>
                        <p className="text-sm text-stone-800 mt-0.5 leading-relaxed">
                          {memo.memoContents}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tags */}
      {tour.tags && tour.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-stone-400" />
          {tour.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white border border-[#e7e2da] text-xs font-medium text-stone-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
