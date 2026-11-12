import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Camera,
  Compass,
  Eye,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Utensils,
  BedDouble,
} from "lucide-react";
import {
  getPictures,
  getPlaces,
  getTours,
  recordVisitLog,
} from "@/lib/db";
import {
  COMPANIONS,
  PLACE_CONTENT_TYPES,
  REGIONS,
  TRAVEL_STYLES,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  recordVisitLog();
  const user = await getCurrentUser();
  const currentUserId = user?.usUid ?? 1;

  const pictures = getPictures({ currentUserId });
  const tours = getTours({ currentUserId });
  const places = getPlaces({ currentUserId });

  const featuredPic = pictures[0];
  const topTours = tours.slice(0, 3);
  const topPics = pictures.slice(0, 6);
  const topPlaces = places.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-12 sm:space-y-16">
      {/* 1. Editorial Hero & Monthly Popular Photo (Aurora UI + Balanced Korean Typography) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {featuredPic && (
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-950 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end group shadow-lg">
            <img
              src={featuredPic.images[0]}
              alt={featuredPic.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/10" />
            <div className="relative z-10 p-5 sm:p-8 text-white">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-3">
                <span className="ui-badge px-2.5 py-1 rounded-full bg-[#ea580c] text-white shadow-xs">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  <span>월간 인기 사진 1위</span>
                </span>
                <span className="ui-badge px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-200 border border-white/15">
                  {REGIONS[featuredPic.location] || "대한민국"}
                </span>
                <span className="ui-badge px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-teal-200 border border-white/15">
                  {TRAVEL_STYLES[featuredPic.focus] || "자연과 함께"}
                </span>
              </div>

              <h1 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white leading-snug max-w-[18ch] sm:max-w-2xl">
                {featuredPic.title}
              </h1>

              <p className="mt-2.5 text-xs sm:text-base text-slate-200 line-clamp-2 max-w-2xl leading-relaxed">
                {featuredPic.contents}
              </p>

              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 text-xs text-slate-200">
                  <span className="font-semibold text-white whitespace-nowrap">
                    by {featuredPic.nickname}
                  </span>
                  <span className="ui-badge text-slate-300">
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{featuredPic.hits}</span>
                  </span>
                  <span className="ui-badge text-rose-300 font-semibold">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" aria-hidden="true" />
                    <span>{featuredPic.likeCnt}</span>
                  </span>
                </div>

                <Link
                  href={`/cards?highlight=${featuredPic.pcUid}`}
                  id="hero-view-photo-btn"
                  className="inline-flex items-center gap-1.5 px-4 min-h-[42px] rounded-xl bg-white text-slate-950 hover:bg-sky-50 text-xs sm:text-sm font-bold whitespace-nowrap shadow-sm"
                >
                  <span>스토리 보러가기</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Right Side Quick Planner & Curated Stats */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="surface-card p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="ui-badge px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200/80 text-[11px] font-bold uppercase tracking-wider">
                Trip Curation &amp; Planner
              </span>
              <h2 className="mt-2.5 text-lg sm:text-xl font-serif font-bold text-slate-900">
                어디로 떠날지 고민되시나요?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                한국관광공사 TourAPI 기반 명소·숙소·맛집 데이터를 조합해 나만의 일차별 여행 코스를 설계해 보세요.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Link
                href="/places?type=12"
                className="p-3.5 rounded-xl bg-slate-50/90 hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>관광 명소</span>
                  <Compass className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 whitespace-nowrap group-hover:text-sky-900">
                  인기 관광지 →
                </p>
              </Link>

              <Link
                href="/places?type=32"
                className="p-3.5 rounded-xl bg-slate-50/90 hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>감성 스테이</span>
                  <BedDouble className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 whitespace-nowrap group-hover:text-teal-900">
                  독채·한옥 숙소 →
                </p>
              </Link>

              <Link
                href="/places?type=39"
                className="p-3.5 rounded-xl bg-slate-50/90 hover:bg-sky-50/70 border border-slate-200/90 hover:border-sky-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>로컬 미식</span>
                  <Utensils className="w-3.5 h-3.5 text-orange-600" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1 whitespace-nowrap group-hover:text-orange-950">
                  현지인 맛집 →
                </p>
              </Link>

              <Link
                href="/tours/new"
                className="p-3.5 rounded-xl bg-gradient-to-br from-teal-900 to-slate-900 text-white hover:opacity-95 border border-teal-800 shadow-xs transition-all"
              >
                <div className="flex items-center justify-between text-xs text-teal-200">
                  <span>일정 빌더</span>
                  <Calendar className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white mt-1 whitespace-nowrap">
                  새 일정 만들기 →
                </p>
              </Link>
            </div>
          </div>

          <div className="surface-card p-4 sm:p-5 bg-gradient-to-r from-sky-50/80 via-white to-teal-50/70 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-slate-500">오늘의여행 실시간 아카이브</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                명소 {places.length}곳 · 일정 {tours.length}건 · 스냅 {pictures.length}장
              </p>
            </div>
            <Link
              href="/places"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-teal-800 hover:bg-teal-50 whitespace-nowrap shrink-0"
            >
              전체 탐색
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Today's Best Travel Itineraries (오늘의 여행 일정) */}
      <section>
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Curated Itineraries</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-serif font-bold text-slate-900">
              오늘의 추천 여행 코스
            </h2>
          </div>
          <Link
            href="/tours"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-800 flex items-center gap-1 whitespace-nowrap min-h-[40px]"
          >
            <span>일정 전체보기</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {topTours.map((tour) => (
            <Link
              key={tour.tuUid}
              href={`/tours/${tour.tuUid}`}
              className="surface-card overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={tour.coverImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="ui-badge px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950/75 text-white backdrop-blur-xs">
                    {REGIONS[tour.location] || "전국"}
                  </span>
                  <span className="ui-badge px-2.5 py-1 rounded-full text-xs font-bold bg-white/92 text-slate-900 backdrop-blur-xs shadow-2xs">
                    {tour.period - 1 > 0
                      ? `${tour.period - 1}박 ${tour.period}일`
                      : "당일치기"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
                    <span className="ui-badge px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {COMPANIONS[tour.withWho] || "자유여행"}
                    </span>
                    <span className="ui-badge px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                      {TRAVEL_STYLES[tour.focus] || "힐링"}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 leading-snug">
                    {tour.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                    {tour.nickname}
                  </span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="ui-badge text-teal-800 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
                      <span>{tour.locations?.length || 0}곳</span>
                    </span>
                    <span className="ui-badge">
                      <Heart className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                      <span>{tour.likeCnt}</span>
                    </span>
                    <span className="ui-badge">
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{tour.hits}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Today's Popular Travel Photos (오늘의 인기 사진) */}
      <section>
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Photo Community</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-serif font-bold text-slate-900">
              오늘의 인기 포토 스토리
            </h2>
          </div>
          <Link
            href="/cards"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-800 flex items-center gap-1 whitespace-nowrap min-h-[40px]"
          >
            <span>사진 더보기</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {topPics.map((pic) => (
            <Link
              key={pic.pcUid}
              href={`/cards?highlight=${pic.pcUid}`}
              className="surface-card overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src={pic.images[0]}
                  alt={pic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span className="ui-badge px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-950/75 text-white backdrop-blur-xs">
                    {REGIONS[pic.location] || "전국"}
                  </span>
                  <span className="ui-badge px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/92 text-slate-900 backdrop-blur-xs">
                    {TRAVEL_STYLES[pic.focus] || "여행"}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                    {pic.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {pic.contents}
                  </p>
                </div>
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700 truncate">{pic.nickname}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="ui-badge">
                      <Heart className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                      <span>{pic.likeCnt}</span>
                    </span>
                    <span className="ui-badge">
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{pic.hits}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Places (인기 관광지 · 숙소 · 맛집) */}
      <section>
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Korea TourAPI Places</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-serif font-bold text-slate-900">
              사랑받는 명소 · 스테이 · 맛집
            </h2>
          </div>
          <Link
            href="/places"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-800 flex items-center gap-1 whitespace-nowrap min-h-[40px]"
          >
            <span>장소 전체보기</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topPlaces.map((place) => {
            const typeInfo = PLACE_CONTENT_TYPES[place.contentTypeId] || {
              label: "장소",
              badge: "추천",
            };
            return (
              <Link
                key={place.placeUid}
                href={`/places/${place.placeUid}`}
                className="surface-card overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={place.firstImage2}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="ui-badge absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-xs">
                    {typeInfo.label}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                      {place.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                      {place.addr1}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="ui-badge font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      <span>{place.rateAvg > 0 ? place.rateAvg.toFixed(1) : "5.0"}</span>
                      <span className="text-slate-400 font-normal">
                        ({place.reviewCnt})
                      </span>
                    </span>
                    <span className="ui-badge text-slate-600 font-medium">
                      <Heart className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                      <span>{place.likeCnt}</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
