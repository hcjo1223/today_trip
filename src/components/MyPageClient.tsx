"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Camera, Check, Heart, User as UserIcon } from "lucide-react";
import type { PicturePost, Place, Tour, User } from "@/lib/types";
import { REGIONS } from "@/lib/constants";

interface MyPageClientProps {
  user: User;
  myTours: Tour[];
  myPictures: PicturePost[];
  likedPlaces: Place[];
}

export default function MyPageClient({
  user: initialUser,
  myTours,
  myPictures,
  likedPlaces,
}: MyPageClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUser);
  const [nickname, setNickname] = useState(initialUser.nickname);
  const [email, setEmail] = useState(initialUser.email);
  const [memo, setMemo] = useState(initialUser.memo || "");
  const [savedMsg, setSavedMsg] = useState(false);

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        usUid: user.usUid,
        nickname,
        email,
        memo,
      }),
    });
    const data = await res.json();
    if (data.status === "OK" && data.user) {
      setUser(data.user);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      router.refresh();
    }
  }

  return (
    <div className="space-y-10">
      {/* Profile Header & Edit Card (기존 UserProfileController + updateView.jsp 통합) */}
      <div className="surface-card p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0f766e] text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0">
            {user.nickname.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-stone-900">
                {user.nickname}
              </h1>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              @{user.userId} · 가입일 {user.joinDate}
            </p>
            <p className="text-sm text-stone-700 mt-3 leading-relaxed">
              {user.memo || "나만의 여행 코스와 순간을 기록하는 공간입니다."}
            </p>
            <div className="mt-4 flex gap-4 text-xs text-stone-600">
              <span>
                작성 일정 <strong className="text-stone-900">{myTours.length}</strong>
              </span>
              <span>
                작성 사진 <strong className="text-stone-900">{myPictures.length}</strong>
              </span>
              <span>
                찜한 장소{" "}
                <strong className="text-stone-900">{likedPlaces.length}</strong>
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleUpdateProfile}
          className="lg:col-span-7 p-5 rounded-xl bg-[#faf8f5] border border-[#e7e2da] space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-teal-700" />
              <span>내 프로필 정보 수정</span>
            </h2>
            {savedMsg && (
              <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 저장되었습니다
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-stone-600 mb-1">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-600 mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-600 mb-1">
              자기소개 메모
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-white text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold"
            >
              프로필 변경사항 저장
            </button>
          </div>
        </form>
      </div>

      {/* My Travel Itineraries */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <span>내가 작성한 여행 일정 ({myTours.length})</span>
          </h2>
          <Link
            href="/tours/new"
            className="text-xs font-semibold text-teal-800 hover:underline"
          >
            + 새 일정 쓰기
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {myTours.map((t) => (
            <Link
              key={t.tuUid}
              href={`/tours/${t.tuUid}`}
              className="surface-card overflow-hidden flex flex-col group"
            >
              <img
                src={t.coverImage}
                alt={t.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-teal-800">
                  {REGIONS[t.location]} · {t.startDate}
                </span>
                <h3 className="font-semibold text-stone-900 mt-1 line-clamp-1">
                  {t.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {t.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* My Photo Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <Camera className="w-5 h-5 text-teal-700" />
          <span>내가 공유한 여행 사진 ({myPictures.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {myPictures.map((p) => (
            <Link
              key={p.pcUid}
              href={`/cards?highlight=${p.pcUid}`}
              className="surface-card overflow-hidden flex flex-col"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm text-stone-900 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                  {p.contents}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Liked Places */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>내가 좋아요한 장소 ({likedPlaces.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {likedPlaces.map((pl) => (
            <Link
              key={pl.placeUid}
              href={`/places/${pl.placeUid}`}
              className="surface-card p-3.5 flex items-center gap-3"
            >
              <img
                src={pl.firstImage2}
                alt={pl.title}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-900 truncate">
                  {pl.title}
                </p>
                <p className="text-xs text-stone-500 truncate">{pl.addr1}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
