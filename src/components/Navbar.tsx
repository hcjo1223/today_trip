"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  MapPin,
  Calendar,
  Camera,
  User as UserIcon,
  ShieldCheck,
  PenSquare,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import type { User } from "@/lib/types";

interface NavbarProps {
  currentUser: User | null;
  demoUsers: User[];
}

export default function Navbar({ currentUser, demoUsers }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [writeOpen, setWriteOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "홈", shortLabel: "홈", icon: Compass },
    { href: "/places", label: "장소 탐색", shortLabel: "장소", icon: MapPin },
    { href: "/tours", label: "여행 일정", shortLabel: "일정", icon: Calendar },
    { href: "/cards", label: "사진 커뮤니티", shortLabel: "사진", icon: Camera },
  ];

  async function handleSwitchUser(usUid: number) {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "switch", usUid }),
    });
    setAccountOpen(false);
    router.refresh();
  }

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAccountOpen(false);
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/88 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Brand Logo */}
            <div className="flex items-center gap-6 shrink-0">
              <Link
                href="/"
                id="nav-brand-logo"
                className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap min-h-[44px]"
              >
                <span
                  aria-hidden="true"
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#0ea5e9] text-white flex items-center justify-center font-serif font-bold text-base shadow-sm group-hover:opacity-95 transition-opacity shrink-0"
                >
                  오
                </span>
                <div className="flex flex-col whitespace-nowrap">
                  <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
                    오늘의여행
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-1 whitespace-nowrap">
                    Today Trip Korea
                  </span>
                </div>
              </Link>

              {/* Primary Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1" aria-label="주요 메뉴">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      id={`nav-link-${item.href.replace(/\//g, "") || "home"}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-1.5 px-3.5 min-h-[40px] rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-slate-900 text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {currentUser?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    id="nav-link-admin"
                    aria-current={pathname.startsWith("/admin") ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3.5 min-h-[40px] rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                      pathname.startsWith("/admin")
                        ? "bg-amber-900 text-white shadow-xs"
                        : "text-amber-900 hover:bg-amber-50"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>관리자</span>
                  </Link>
                )}
              </nav>
            </div>

            {/* Right Action Controls (Touch Target >= 44px) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Account Switcher / Login */}
              <div className="relative shrink-0">
                {currentUser ? (
                  <button
                    type="button"
                    id="nav-user-menu-btn"
                    aria-expanded={accountOpen}
                    aria-haspopup="menu"
                    aria-label={`계정 메뉴 열기 (${currentUser.nickname})`}
                    onClick={() => {
                      setAccountOpen(!accountOpen);
                      setWriteOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 min-h-[42px] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm text-slate-800 whitespace-nowrap shadow-2xs"
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 h-6 rounded-full bg-teal-700/15 text-teal-900 font-bold text-xs flex items-center justify-center shrink-0"
                    >
                      {currentUser.nickname.slice(0, 1)}
                    </span>
                    <span className="hidden sm:inline font-semibold max-w-[130px] truncate">
                      {currentUser.nickname}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      id="nav-demo-switch-btn"
                      aria-expanded={accountOpen}
                      onClick={() => {
                        setAccountOpen(!accountOpen);
                        setWriteOpen(false);
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3 min-h-[42px] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 whitespace-nowrap"
                    >
                      <span>데모 계정 전환</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    </button>
                    <Link
                      href="/login"
                      id="nav-login-link"
                      className="inline-flex items-center px-3 min-h-[42px] rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                    >
                      로그인
                    </Link>
                  </div>
                )}

                {accountOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50"
                  >
                    {currentUser && (
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs text-slate-500">현재 로그인 계정</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">
                          {currentUser.nickname}
                        </p>
                        <p className="text-xs text-slate-500">{currentUser.email}</p>
                        <div className="mt-2.5 flex gap-2">
                          <Link
                            href="/mypage"
                            onClick={() => setAccountOpen(false)}
                            className="flex-1 text-center py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 whitespace-nowrap"
                          >
                            마이페이지
                          </Link>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 flex items-center gap-1 whitespace-nowrap"
                          >
                            <LogOut className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            로그아웃
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="px-3 py-1.5">
                      <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        팀원 / 데모 계정 빠른 전환
                      </p>
                      {demoUsers.map((u) => (
                        <button
                          key={u.usUid}
                          type="button"
                          onClick={() => handleSwitchUser(u.usUid)}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-slate-100 transition-colors ${
                            currentUser?.usUid === u.usUid
                              ? "bg-teal-50 text-teal-950 font-bold"
                              : "text-slate-700 font-medium"
                          }`}
                        >
                          <span className="truncate">{u.nickname}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 ${
                              u.role === "ADMIN"
                                ? "bg-amber-100 text-amber-900"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {u.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Write CTA Button (글쓰기) */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  id="nav-write-dropdown-btn"
                  aria-expanded={writeOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setWriteOpen(!writeOpen);
                    setAccountOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 min-h-[42px] rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 shadow-sm"
                >
                  <PenSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">글쓰기</span>
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-85 shrink-0" aria-hidden="true" />
                </button>

                {writeOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50"
                  >
                    <Link
                      href="/tours/new"
                      onClick={() => setWriteOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">여행 일정 만들기</p>
                        <p className="text-xs text-slate-500">일차별 장소와 메모 코스 설계</p>
                      </div>
                    </Link>
                    <Link
                      href="/cards?write=1"
                      onClick={() => setWriteOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">여행 사진 올리기</p>
                        <p className="text-xs text-slate-500">나만의 여행 순간과 테마 공유</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger (44x44pt minimum touch target) */}
              <button
                type="button"
                id="nav-mobile-toggle"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 shrink-0"
                aria-label={mobileOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 min-h-[44px] rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
                >
                  <Icon className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/mypage"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3.5 min-h-[44px] rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <UserIcon className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <span>마이페이지</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3.5 min-h-[44px] rounded-xl text-sm font-semibold text-amber-900 hover:bg-amber-50"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>관리자 대시보드</span>
            </Link>
          </div>
        )}
      </header>

      {/* Mobile Bottom Tab Bar (UI/UX Pro Max: <= 5 items, >= 44pt targets, safe-area compliant) */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 grid grid-cols-5 px-1.5 pt-1 pb-safe shadow-lg"
        aria-label="모바일 하단 내비게이션"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] rounded-xl gap-0.5 text-[11px] whitespace-nowrap transition-colors ${
                isActive
                  ? "text-[#0f766e] font-bold bg-teal-50/70"
                  : "text-slate-500 font-medium hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{item.shortLabel}</span>
            </Link>
          );
        })}
        <Link
          href={currentUser?.role === "ADMIN" ? "/admin" : "/mypage"}
          aria-current={
            pathname.startsWith("/admin") || pathname.startsWith("/mypage")
              ? "page"
              : undefined
          }
          className={`flex flex-col items-center justify-center min-h-[48px] rounded-xl gap-0.5 text-[11px] whitespace-nowrap transition-colors ${
            pathname.startsWith("/admin") || pathname.startsWith("/mypage")
              ? "text-[#0f766e] font-bold bg-teal-50/70"
              : "text-slate-500 font-medium hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>관리·계정</span>
        </Link>
      </nav>
    </>
  );
}
