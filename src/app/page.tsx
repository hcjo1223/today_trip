import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Camera,
  Eye,
  Heart,
  MapPin,
  Star,
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
      {/* 1. Editorial Hero & Monthly Popular Photo (월간 인기 사진 + 빠른 탐색) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {featuredPic && (
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#e7e2da] bg-stone-900 min-h-[360px] sm:min-h-[430px] flex flex-col justify-end group">
            <img
              src={featuredPic.images[0]}
              alt={featuredPic.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="relative z-10 p-5 sm:p-8 text-white">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-200 mb-2.5">
                <span className="px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-xs border border-white/15 whitespace-nowrap">
                  월간 인기 사진 1위
                </span>
                <span>·</span>
                <span className="whitespace-nowrap">{REGIONS[featuredPic.location] || "대한민국"}</span>
                <span>·</span>
                <span className="whitespace-nowrap">{TRAVEL_STYLES[featuredPic.focus] || "자연과 함께"}</span>
              </div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white leading-snug max-w-2xl break-keep">
                {featuredPic.title}
              </h1>
              <p className="mt-2 text-xs sm:text-base text-stone-200 line-clamp-2 max-w-2xl leading-relaxed break-keep">
                {featuredPic.contents}
              </p>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-300">
                  <span className="font-medium text-white whitespace-nowrap">
                    by {featuredPic.nickname}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Eye className="w-3.5 h-3.5" /> {featuredPic.hits}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />{" "}
                    {featuredPic.likeCnt}
                  </span>
                </div>
                <Link
                  href={`/cards?highlight=${featuredPic.pcUid}`}
                  id="hero-view-photo-btn"
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-white text-stone-900 hover:bg-stone-100 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <span>스토리 보러가기</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Right Side Quick Planner & Curated Stats */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="surface-card p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                Trip Curation &amp; Planner
              </span>
              <h2 className="mt-1.5 text-lg sm:text-xl font-serif font-bold text-stone-900 break-keep">
                어디로 떠날지 고민되시나요?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed break-keep">
                한국관광공사 TourAPI 기반 명소·숙소·맛집 데이터를 조합해 나만의 일차별 여행 코스를 설계해 보세요.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <Link
                href="/places?type=12"
                className="p-3 rounded-xl bg-[#faf8f5] hover:bg-stone-200/50 border border-[#e7e2da] transition-colors"
              >
                <p className="text-[11px] text-stone-500">관광 명소</p>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5 whitespace-nowrap">
                  전국 인기 관광지 →
                </p>
              </Link>
              <Link
                href="/places?type=32"
                className="p-3 rounded-xl bg-[#faf8f5] hover:bg-stone-200/50 border border-[#e7e2da] transition-colors"
              >
                <p className="text-[11px] text-stone-500">감성 스테이</p>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5 whitespace-nowrap">
                  독채·한옥 숙소 →
                </p>
              </Link>
              <Link
                href="/places?type=39"
                className="p-3 rounded-xl bg-[#faf8f5] hover:bg-stone-200/50 border border-[#e7e2da] transition-colors"
              >
                <p className="text-[11px] text-stone-500">로컬 미식</p>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5 whitespace-nowrap">
                  현지인 추천 맛집 →
                </p>
              </Link>
              <Link
                href="/tours/new"
                className="p-3 rounded-xl bg-teal-900/5 hover:bg-teal-900/10 border border-teal-800/20 transition-colors"
              >
                <p className="text-[11px] text-teal-800">일정 설계</p>
                <p className="text-xs sm:text-sm font-semibold text-teal-950 mt-0.5 whitespace-nowrap">
                  새 여행 계획 쓰기 →
                </p>
              </Link>
            </div>
          </div>

          <div className="surface-card p-4 sm:p-5 bg-[#f3efe9]/70 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-stone-500">오늘의여행 아카이브</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5 whitespace-nowrap">
                장소 {places.length}곳 · 일정 {tours.length}건 · 사진 {pictures.length}장
              </p>
            </div>
            <Link
              href="/places"
              className="text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              전체 탐색
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Today's Best Travel Itineraries (오늘의 여행 일정) */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Curated Itineraries</span>
            </div>
            <h2 className="mt-1 text-2xl font-serif font-bold text-stone-900">
              오늘의 여행 일정
            </h2>
          </div>
          <Link
            href="/tours"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 flex items-center gap-1"
          >
            <span>일정 전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTours.map((tour) => (
            <Link
              key={tour.tuUid}
              href={`/tours/${tour.tuUid}`}
              className="surface-card overflow-hidden flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-stone-200">
                <img
                  src={tour.coverImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/70 text-white backdrop-blur-xs">
                    {REGIONS[tour.location] || "전국"}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 text-stone-900 backdrop-blur-xs">
                    {tour.period - 1 > 0
                      ? `${tour.period - 1}박 ${tour.period}일`
                      : "당일치기"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                    <span>{COMPANIONS[tour.withWho] || "자유여행"}</span>
                    <span>·</span>
                    <span>{TRAVEL_STYLES[tour.focus] || "힐링"}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                    {tour.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">
                    {tour.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-700">
                    {tour.nickname}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-700" />
                      {tour.locations?.length || 0}곳
                    </span>
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
      </section>

      {/* 3. Today's Popular Travel Photos (오늘의 인기 사진) */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Community</span>
            </div>
            <h2 className="mt-1 text-2xl font-serif font-bold text-stone-900">
              오늘의 인기 사진
            </h2>
          </div>
          <Link
            href="/cards"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 flex items-center gap-1"
          >
            <span>사진 더보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPics.map((pic) => (
            <Link
              key={pic.pcUid}
              href={`/cards?highlight=${pic.pcUid}`}
              className="surface-card overflow-hidden group flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-stone-200">
                <img
                  src={pic.images[0]}
                  alt={pic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-black/65 text-white backdrop-blur-xs">
                    {REGIONS[pic.location] || "전국"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/90 text-stone-800 backdrop-blur-xs">
                    {TRAVEL_STYLES[pic.focus] || "여행"}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base text-stone-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                    {pic.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2">
                    {pic.contents}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{pic.nickname}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {pic.likeCnt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {pic.hits}
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
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Korea TourAPI Places</span>
            </div>
            <h2 className="mt-1 text-2xl font-serif font-bold text-stone-900">
              사랑받는 여행 장소 · 스테이 · 맛집
            </h2>
          </div>
          <Link
            href="/places"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 flex items-center gap-1"
          >
            <span>장소 전체보기</span>
            <ArrowRight className="w-4 h-4" />
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
                <div className="relative h-44 overflow-hidden bg-stone-200">
                  <img
                    src={place.firstImage2}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                    {typeInfo.label}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-stone-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                      {place.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 line-clamp-1">
                      {place.addr1}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {place.rateAvg > 0 ? place.rateAvg.toFixed(1) : "5.0"}
                      <span className="text-stone-400 font-normal">
                        ({place.reviewCnt})
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {place.likeCnt}
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
