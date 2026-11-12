"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Star,
  Trash2,
} from "lucide-react";
import type { Place, Review, User } from "@/lib/types";
import { PLACE_CONTENT_TYPES, REGIONS } from "@/lib/constants";

interface PlaceDetailClientProps {
  initialPlace: Place;
  initialReviews: Review[];
  currentUser: User | null;
}

export default function PlaceDetailClient({
  initialPlace,
  initialReviews,
  currentUser,
}: PlaceDetailClientProps) {
  const [place, setPlace] = useState<Place>(initialPlace);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rate, setRate] = useState<number>(5);
  const [content, setContent] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const typeInfo = PLACE_CONTENT_TYPES[place.contentTypeId] || {
    label: "장소",
    badge: "추천",
  };

  async function handleToggleLike() {
    const res = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", placeUid: place.placeUid }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setPlace((prev) => ({
        ...prev,
        likedByMe: data.liked,
        likeCnt: data.likeCnt,
      }));
    }
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          placeUid: place.placeUid,
          rate,
          content,
        }),
      });
      const data = await res.json();
      if (data.status === "OK") {
        setReviews(data.reviews);
        setContent("");
        const avg =
          data.reviews.length > 0
            ? data.reviews.reduce((acc: number, r: Review) => acc + r.rate, 0) /
              data.reviews.length
            : 5;
        setPlace((prev) => ({
          ...prev,
          reviewCnt: data.reviews.length,
          rateAvg: avg,
        }));
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteReview(rvUid: number) {
    const res = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "deleteReview",
        placeUid: place.placeUid,
        rvUid,
      }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setReviews(data.reviews);
      const avg =
        data.reviews.length > 0
          ? data.reviews.reduce((acc: number, r: Review) => acc + r.rate, 0) /
            data.reviews.length
          : 0;
      setPlace((prev) => ({
        ...prev,
        reviewCnt: data.reviews.length,
        rateAvg: avg,
      }));
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/places"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>장소 목록으로 돌아가기</span>
        </Link>
        <Link
          href={`/tours/new?placeUid=${place.placeUid}`}
          className="px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs sm:text-sm font-medium transition-colors"
        >
          이 장소를 포함해 여행 일정 만들기 →
        </Link>
      </div>

      {/* Main Place Card */}
      <div className="surface-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative min-h-[340px] bg-stone-200">
          <img
            src={place.firstImage2}
            alt={place.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-stone-900/85 text-white backdrop-blur-xs">
              {typeInfo.label} (TourAPI #{place.contentId})
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-white/90 text-stone-900 backdrop-blur-xs">
              {REGIONS[place.areaCode] || "전국"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                {typeInfo.badge}
              </span>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> 조회 {place.viewCnt}
                </span>
              </div>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {place.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-base">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{place.rateAvg > 0 ? place.rateAvg.toFixed(1) : "5.0"}</span>
              </div>
              <span className="text-xs text-stone-500">
                여행자 리뷰 {place.reviewCnt}개
              </span>
            </div>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              {place.overview}
            </p>

            <div className="mt-6 space-y-2.5 pt-4 border-t border-stone-100 text-sm text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-700 mt-1 shrink-0" />
                <span>{place.addr1}</span>
              </div>
              {place.tel && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>{place.tel}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-xs text-stone-500">
                <Navigation className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  GPS 좌표: 위도 {place.mapy.toFixed(4)}° N, 경도{" "}
                  {place.mapx.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
            <button
              type="button"
              id="place-detail-like-btn"
              onClick={handleToggleLike}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-colors ${
                place.likedByMe
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-[#faf8f5] border-[#e7e2da] text-stone-800 hover:bg-stone-100"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  place.likedByMe ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>좋아요 {place.likeCnt}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section (기존 ReviewController + commentS.jsp 마이그레이션) */}
      <div className="surface-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              여행자 별점 &amp; 한줄평 ({reviews.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              다녀오신 장소의 생생한 팁과 별점을 남겨주세요.
            </p>
          </div>
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="p-4 rounded-xl bg-[#faf8f5] border border-[#e7e2da] space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-700 mr-2">
                별점 선택:
              </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRate(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rate
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 text-xs font-bold text-amber-700">
                {rate}.0점
              </span>
            </div>
            <span className="text-xs text-stone-500">
              작성자: {currentUser?.nickname || "조호철 (총괄 디렉터)"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <textarea
              id="place-review-textarea"
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="방문 시간대, 주차 정보, 추천 메뉴 등 다른 여행자에게 도움이 되는 후기를 남겨주세요."
              className="flex-1 p-3 rounded-lg border border-[#e7e2da] bg-white text-sm text-stone-900 focus:outline-none focus:border-teal-700"
            />
            <button
              type="submit"
              id="place-review-submit-btn"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-sm font-semibold shrink-0 transition-colors disabled:opacity-50"
            >
              {submitting ? "등록 중..." : "리뷰 등록"}
            </button>
          </div>
        </form>

        {/* Review List */}
        <div className="divide-y divide-stone-200/70">
          {reviews.map((rv) => (
            <div key={rv.rvUid} className="py-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-stone-900">
                    {rv.nickname}
                  </span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rv.rate
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">{rv.writeDate}</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {rv.content}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteReview(rv.rvUid)}
                className="p-1.5 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="리뷰 삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
