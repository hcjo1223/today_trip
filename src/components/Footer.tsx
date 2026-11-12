import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e7e2da] bg-[#f3efe9] text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-md bg-[#0f766e] text-white flex items-center justify-center font-serif font-bold text-sm">
                오
              </span>
              <span className="font-serif font-bold text-lg text-stone-900">
                오늘의여행 (Today_Trip)
              </span>
            </div>
            <p className="mt-3 text-sm text-stone-600 max-w-md leading-relaxed">
              한국관광공사 TourAPI 기반 전국 관광지·숙소·맛집 큐레이션과 여행자들의 생생한 일정·사진을 나누는 여행 커뮤니티 플랫폼입니다.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              고객센터 1670-0876 · 평일 09:00 ~ 18:00 (주말 및 공휴일 제외)
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
              서비스 바로가기
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/places" className="hover:text-stone-900 transition-colors">
                  전국 여행지 · 맛집 · 숙소
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-stone-900 transition-colors">
                  여행 일정 플래너
                </Link>
              </li>
              <li>
                <Link href="/cards" className="hover:text-stone-900 transition-colors">
                  여행 사진 커뮤니티
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-stone-900 transition-colors">
                  관리자 통계 및 데이터 관리
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
              프로젝트 정보
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>팀명: Spring → Modern Fullstack TypeScript</li>
              <li>참여: 조호철 · 이민규 · 임동혁 · 정민철 · 김도균</li>
              <li>기술 스택: Next.js 16 · React 19 · TypeScript · SQLite</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>© 2026 Today_Trip (오늘의여행). All rights reserved.</span>
          <span>Legacy Spring MVC &amp; Oracle → Next.js App Router &amp; TypeScript Migration</span>
        </div>
      </div>
    </footer>
  );
}
