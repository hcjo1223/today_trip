"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, MapPin, Search, Star, Eye, Phone } from "lucide-react";
import type { Place } from "@/lib/types";
import { PLACE_CONTENT_TYPES, REGIONS } from "@/lib/constants";

interface PlaceListClientProps {
  initialPlaces: Place[];
  initialType?: number;
}

export default function PlaceListClient({
  initialPlaces,
  initialType,
}: PlaceListClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedType, setSelectedType] = useState<number>(initialType || 0);
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [keyword, setKeyword] = useState("");

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      if (selectedType !== 0 && p.contentTypeId !== selectedType) return false;
      if (selectedRegion !== 0 && p.areaCode !== selectedRegion) return false;
      if (keyword.trim() !== "") {
        const kw = keyword.trim().toLowerCase();
        const match =
          p.title.toLowerCase().includes(kw) ||
          p.addr1.toLowerCase().includes(kw) ||
          p.overview.toLowerCase().includes(kw);
        if (!match) return false;
      }
      return true;
    });
  }, [places, selectedType, selectedRegion, keyword]);

  async function handleToggleLike(e: React.MouseEvent, placeUid: number) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", placeUid }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setPlaces((prev) =>
        prev.map((p) =>
          p.placeUid === placeUid
            ? { ...p, likedByMe: data.liked, likeCnt: data.likeCnt }
            : p
        )
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Filter & Search Bar */}
      <div className="surface-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs (전체 / 12 관광지 / 32 숙박 / 39 음식점) */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="장소 카테고리 필터">
            {[
              { id: 0, label: "전체 장소" },
              { id: 12, label: "관광지 (12)" },
              { id: 32, label: "숙박·스테이 (32)" },
              { id: 39, label: "음식점·맛집 (39)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedType === tab.id}
                id={`place-tab-${tab.id}`}
                onClick={() => setSelectedType(tab.id)}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedType === tab.id
                    ? "bg-[#0f766e] text-white shadow-xs"
                    : "bg-[#faf8f5] text-stone-700 hover:bg-stone-200/60 border border-[#e7e2da]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Region Filter */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <select
              id="place-region-select"
              aria-label="지역 선택"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(Number(e.target.value))}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[#e7e2da] bg-[#faf8f5] text-sm font-medium text-stone-800 focus:outline-none focus:border-teal-700 cursor-pointer"
            >
              <option value={0}>전체 지역</option>
              {Object.entries(REGIONS).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                id="place-keyword-input"
                aria-label="장소명, 지역, 키워드 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="장소명, 지역, 키워드 검색..."
                className="w-full min-h-[42px] pl-9 pr-4 py-2 rounded-xl border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
          <span>
            총 <strong className="text-stone-900">{filteredPlaces.length}</strong>곳의 여행 장소가 검색되었습니다.
          </span>
          <span className="whitespace-nowrap">한국관광공사 TourAPI 표준 코드 연동</span>
        </div>
      </div>

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="surface-card p-12 text-center">
          <p className="text-base font-medium text-stone-700">
            조건에 일치하는 장소가 없습니다.
          </p>
          <p className="text-xs text-stone-500 mt-1">
            검색어나 카테고리 필터를 초기화해 보세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const typeInfo = PLACE_CONTENT_TYPES[place.contentTypeId] || {
              label: "장소",
              badge: "추천",
            };
            return (
              <Link
                key={place.placeUid}
                href={`/places/${place.placeUid}`}
                className="surface-card overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                  <img
                    src={place.firstImage2}
                    alt={place.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="ui-badge px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-900/85 text-white backdrop-blur-xs">
                      {typeInfo.label}
                    </span>
                    <span className="ui-badge px-2.5 py-1 rounded-md text-xs font-medium bg-white/92 text-stone-800 backdrop-blur-xs">
                      {REGIONS[place.areaCode] || "전국"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(e, place.placeUid)}
                    aria-label={`${place.title} 좋아요 토글`}
                    aria-pressed={Boolean(place.likedByMe)}
                    className="absolute top-2.5 right-2.5 w-11 h-11 rounded-full bg-white/92 hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        place.likedByMe
                          ? "fill-rose-500 text-rose-500"
                          : "text-stone-600"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-lg text-stone-900 group-hover:text-teal-800 transition-colors">
                      {place.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-stone-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                      <span className="truncate">{place.addr1}</span>
                    </p>
                    <p className="mt-2.5 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {place.overview}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold text-amber-600 whitespace-nowrap">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
                        {place.rateAvg > 0 ? place.rateAvg.toFixed(1) : "5.0"}
                        <span className="text-stone-400 font-normal">
                          ({place.reviewCnt})
                        </span>
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" aria-hidden="true" />
                        {place.likeCnt}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {place.viewCnt}
                      </span>
                    </div>
                    {place.tel && (
                      <span className="flex items-center gap-1 text-stone-500 whitespace-nowrap">
                        <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                        {place.tel}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
