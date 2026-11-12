"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [memo, setMemo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          userId,
          password,
          nickname,
          email,
          memo,
        }),
      });
      const data = await res.json();
      if (data.status === "OK") {
        router.push("/");
        router.refresh();
      } else {
        setErrorMsg(data.message || "인증에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoQuickLogin(usUid: number) {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "switch", usUid }),
    });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="surface-card p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <span className="inline-flex w-11 h-11 rounded-xl bg-[#0f766e] text-white items-center justify-center font-serif font-bold text-xl">
            오
          </span>
          <h1 className="mt-3 text-2xl font-serif font-bold text-stone-900">
            {mode === "login" ? "오늘의여행 로그인" : "오늘의여행 회원가입"}
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            여행 일정 계획과 나만의 사진 아카이브를 시작하세요.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#f3efe9]">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mode === "login"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>로그인</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMsg("");
            }}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mode === "register"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>회원가입</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              아이디 *
            </label>
            <input
              type="text"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="예: admin 또는 donghyuk"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              비밀번호 *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
            />
          </div>

          {mode === "register" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  닉네임 *
                </label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="커뮤니티에서 사용할 닉네임"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  이메일 *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  한줄 자기소개
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="선호하는 여행 스타일을 소개해주세요."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-sm font-semibold transition-colors"
          >
            {loading
              ? "처리 중..."
              : mode === "login"
              ? "로그인하기"
              : "회원가입 완료"}
          </button>
        </form>

        {/* Quick Demo Login Box */}
        <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
          <p className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>팀원 데모 계정 원클릭 로그인</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoQuickLogin(1)}
              className="p-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] hover:bg-stone-100 text-left text-xs"
            >
              <span className="font-semibold text-stone-900 block">
                조호철 (ADMIN)
              </span>
              <span className="text-stone-500">ID: admin / admin1234</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin(3)}
              className="p-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] hover:bg-stone-100 text-left text-xs"
            >
              <span className="font-semibold text-stone-900 block">
                임동혁 (USER)
              </span>
              <span className="text-stone-500">ID: donghyuk / pass1234</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
