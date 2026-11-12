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
    { href: "/", label: "홈", icon: Compass },
    { href: "/places", label: "장소 탐색", icon: MapPin },
    { href: "/tours", label: "여행 일정", icon: Calendar },
    { href: "/cards", label: "사진 커뮤니티", icon: Camera },
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
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e7e2da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              id="nav-brand-logo"
              className="flex items-center gap-2.5 group"
            >
              <span className="w-9 h-9 rounded-lg bg-[#0f766e] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:bg-[#115e59] transition-colors">
                오
              </span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg tracking-tight text-stone-900 leading-none">
                  오늘의여행
                </span>
                <span className="text-[11px] text-stone-500 tracking-wider uppercase mt-0.5">
                  Today Trip Korea
                </span>
              </div>
            </Link>

            {/* Primary Navigation */}
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-stone-900 text-white"
                        : "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {currentUser?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  id="nav-link-admin"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith("/admin")
                      ? "bg-amber-900 text-white"
                      : "text-amber-900 hover:bg-amber-100/70"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>관리자</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Account Switcher / Login */}
            <div className="relative">
              {currentUser ? (
                <button
                  type="button"
                  id="nav-user-menu-btn"
                  onClick={() => {
                    setAccountOpen(!accountOpen);
                    setWriteOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e7e2da] bg-white hover:bg-stone-50 text-sm text-stone-800 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-700/15 text-teal-800 font-semibold text-xs flex items-center justify-center">
                    {currentUser.nickname.slice(0, 1)}
                  </span>
                  <span className="hidden sm:inline font-medium max-w-[130px] truncate">
                    {currentUser.nickname}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="nav-demo-switch-btn"
                    onClick={() => {
                      setAccountOpen(!accountOpen);
                      setWriteOpen(false);
                    }}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e7e2da] bg-white hover:bg-stone-50 text-xs font-medium text-stone-700"
                  >
                    <span>데모 계정 전환</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <Link
                    href="/login"
                    id="nav-login-link"
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200/60 transition-colors"
                  >
                    로그인
                  </Link>
                </div>
              )}

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#e7e2da] py-2 z-50">
                  {currentUser && (
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs text-stone-500">현재 로그인 계정</p>
                      <p className="text-sm font-semibold text-stone-900 mt-0.5">
                        {currentUser.nickname}
                      </p>
                      <p className="text-xs text-stone-500">{currentUser.email}</p>
                      <div className="mt-2 flex gap-2">
                        <Link
                          href="/mypage"
                          onClick={() => setAccountOpen(false)}
                          className="flex-1 text-center py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-800"
                        >
                          마이페이지
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="px-2.5 py-1.5 rounded-md bg-rose-50 hover:bg-rose-100 text-xs font-medium text-rose-700 flex items-center gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="px-3 py-1.5">
                    <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      팀원 / 데모 계정 빠른 전환
                    </p>
                    {demoUsers.map((u) => (
                      <button
                        key={u.usUid}
                        type="button"
                        onClick={() => handleSwitchUser(u.usUid)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-stone-100 transition-colors ${
                          currentUser?.usUid === u.usUid
                            ? "bg-teal-50/80 text-teal-900 font-semibold"
                            : "text-stone-700"
                        }`}
                      >
                        <span className="truncate">{u.nickname}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            u.role === "ADMIN"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-stone-100 text-stone-600"
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

            {/* Write Dropdown Button (글쓰기) */}
            <div className="relative">
              <button
                type="button"
                id="nav-write-dropdown-btn"
                onClick={() => {
                  setWriteOpen(!writeOpen);
                  setAccountOpen(false);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-sm font-medium shadow-xs transition-colors"
              >
                <PenSquare className="w-4 h-4" />
                <span>글쓰기</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {writeOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e7e2da] py-2 z-50">
                  <Link
                    href="/tours/new"
                    onClick={() => setWriteOpen(false)}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-stone-50 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">여행 일정 만들기</p>
                      <p className="text-xs text-stone-500">일차별 장소와 메모 코스 설계</p>
                    </div>
                  </Link>
                  <Link
                    href="/cards?write=1"
                    onClick={() => setWriteOpen(false)}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-stone-50 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">여행 사진 올리기</p>
                      <p className="text-xs text-stone-500">나만의 여행 순간과 테마 공유</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              id="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60"
              aria-label="모바일 메뉴 열기"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e7e2da] bg-[#faf8f5] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-200/60"
              >
                <Icon className="w-4 h-4 text-teal-700" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/mypage"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-200/60"
          >
            <UserIcon className="w-4 h-4 text-teal-700" />
            <span>마이페이지</span>
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-900 hover:bg-amber-100/60"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>관리자 대시보드</span>
          </Link>
        </div>
      )}
    </header>
  );
}
