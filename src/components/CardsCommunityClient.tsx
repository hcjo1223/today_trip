"use client";

import React, { useState, useMemo } from "react";
import {
  Camera,
  Eye,
  Heart,
  MessageCircle,
  Plus,
  Send,
  X,
} from "lucide-react";
import type { PicturePost } from "@/lib/types";
import { COMPANIONS, REGIONS, TRAVEL_STYLES } from "@/lib/constants";

interface CardsCommunityClientProps {
  initialPosts: PicturePost[];
  initialHighlightUid?: number;
  initialOpenWrite?: boolean;
}

const PRESET_GALLERY_IMAGES = [
  { label: "제주 성산 유채꽃 해안", path: "/images/jeju.jpg" },
  { label: "서울 경복궁 경회루 단풍", path: "/images/seoul.jpg" },
  { label: "부산 광안리 & 광안대교 노을", path: "/images/busan.jpg" },
  { label: "강릉 고택 한옥 스테이 다과", path: "/images/gangneung.jpg" },
  { label: "애월 흑돼지 & 전복구이 한상", path: "/images/dining.jpg" },
  { label: "경주 월정교 야간 반영", path: "/images/gyeongju.jpg" },
];

export default function CardsCommunityClient({
  initialPosts,
  initialHighlightUid,
  initialOpenWrite,
}: CardsCommunityClientProps) {
  const [posts, setPosts] = useState<PicturePost[]>(initialPosts);
  const [location, setLocation] = useState<number>(0);
  const [withWho, setWithWho] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);

  const [selectedPostUid, setSelectedPostUid] = useState<number | null>(
    initialHighlightUid || null
  );
  const [writeOpen, setWriteOpen] = useState<boolean>(
    Boolean(initialOpenWrite)
  );
  const [commentText, setCommentText] = useState("");

  // New Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContents, setNewContents] = useState("");
  const [newLocation, setNewLocation] = useState<number>(17);
  const [newWith, setNewWith] = useState<number>(2);
  const [newFocus, setNewFocus] = useState<number>(3);
  const [newImage, setNewImage] = useState<string>("/images/jeju.jpg");
  const [newTags, setNewTags] = useState("제주도,감성스냅,힐링여행");
  const [submitting, setSubmitting] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (location !== 0 && p.location !== location) return false;
      if (withWho !== 0 && p.withWho !== withWho) return false;
      if (focus !== 0 && p.focus !== focus) return false;
      return true;
    });
  }, [posts, location, withWho, focus]);

  const activePost = useMemo(
    () => posts.find((p) => p.pcUid === selectedPostUid) || null,
    [posts, selectedPostUid]
  );

  async function handleToggleLike(pcUid: number, e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", pcUid }),
    });
    const data = await res.json();
    if (data.status === "OK") {
      setPosts((prev) =>
        prev.map((p) =>
          p.pcUid === pcUid
            ? { ...p, likedByMe: data.liked, likeCnt: data.likeCnt }
            : p
        )
      );
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!activePost || !commentText.trim()) return;
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "comment",
        pcUid: activePost.pcUid,
        contents: commentText.trim(),
      }),
    });
    const data = await res.json();
    if (data.status === "OK" && data.comment) {
      setCommentText("");
      setPosts((prev) =>
        prev.map((p) =>
          p.pcUid === activePost.pcUid
            ? {
                ...p,
                commentCnt: p.commentCnt + 1,
                comments: [...(p.comments || []), data.comment],
              }
            : p
        )
      );
    }
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newContents.trim() || submitting) return;
    setSubmitting(true);
    try {
      const tags = newTags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title: newTitle,
          contents: newContents,
          location: newLocation,
          withWho: newWith,
          focus: newFocus,
          imageUrl: newImage,
          tags,
        }),
      });
      const data = await res.json();
      if (data.status === "OK") {
        const listRes = await fetch("/api/cards");
        const listData = await listRes.json();
        if (listData.list) {
          setPosts(listData.list);
        }
        setWriteOpen(false);
        setNewTitle("");
        setNewContents("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Filter Bar (지역 / 누구와 / 목적 + 사진 올리기) */}
      <div className="surface-card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            id="cards-filter-location"
            value={location}
            onChange={(e) => setLocation(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800"
          >
            <option value={0}>지역 전체 (어디로)</option>
            {Object.entries(REGIONS).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select
            id="cards-filter-with"
            value={withWho}
            onChange={(e) => setWithWho(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800"
          >
            <option value={0}>동행 전체 (누구와)</option>
            {Object.entries(COMPANIONS).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select
            id="cards-filter-focus"
            value={focus}
            onChange={(e) => setFocus(Number(e.target.value))}
            className="px-3.5 py-2.5 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm text-stone-800"
          >
            <option value={0}>목적 전체 (여행스타일)</option>
            {Object.entries(TRAVEL_STYLES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
          <span>
            총 <strong className="text-stone-900">{filteredPosts.length}</strong>장의 여행 스냅이 공유되고 있습니다.
          </span>
          <button
            type="button"
            id="cards-open-write-btn"
            onClick={() => setWriteOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>새 여행 사진 올리기</span>
          </button>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.pcUid}
            onClick={() => setSelectedPostUid(post.pcUid)}
            className="surface-card overflow-hidden flex flex-col cursor-pointer group"
          >
            <div className="relative h-64 overflow-hidden bg-stone-200">
              <img
                src={post.images[0]}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
                  {REGIONS[post.location] || "전국"}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 text-stone-900 backdrop-blur-xs">
                  {TRAVEL_STYLES[post.focus] || "여행"}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => handleToggleLike(post.pcUid, e)}
                aria-label="좋아요"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs"
              >
                <Heart
                  className={`w-4 h-4 ${
                    post.likedByMe
                      ? "fill-rose-500 text-rose-500"
                      : "text-stone-600"
                  }`}
                />
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-teal-800 font-medium">
                  {COMPANIONS[post.withWho] || "자유여행"} · {post.writeDate}
                </p>
                <h2 className="mt-1 font-serif font-bold text-lg text-stone-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {post.contents}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-stone-800">
                  {post.nickname}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    {post.likeCnt}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-teal-700" />
                    {post.commentCnt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.hits}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Photo Detail & Comments Modal (기존 #dlg_write 뷰 모달 업그레이드) */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#e7e2da] shadow-2xl max-w-4xl w-full max-h-[88vh] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 bg-stone-950 flex items-center justify-center relative min-h-[300px]">
              <img
                src={activePost.images[0]}
                alt={activePost.title}
                className="w-full h-full max-h-[88vh] object-cover"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col max-h-[88vh]">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-teal-800">
                    {REGIONS[activePost.location]} ·{" "}
                    {COMPANIONS[activePost.withWho]} ·{" "}
                    {TRAVEL_STYLES[activePost.focus]}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mt-0.5">
                    {activePost.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPostUid(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 space-y-5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-900">
                    {activePost.nickname}
                  </span>
                  <span>{activePost.writeDate}</span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed">
                  {activePost.contents}
                </p>

                {activePost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {activePost.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#faf8f5] border border-[#e7e2da] text-xs text-stone-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(activePost.pcUid)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
                      activePost.likedByMe
                        ? "bg-rose-50 border-rose-200 text-rose-700"
                        : "bg-[#faf8f5] border-[#e7e2da] text-stone-800"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        activePost.likedByMe
                          ? "fill-rose-500 text-rose-500"
                          : ""
                      }`}
                    />
                    <span>좋아요 {activePost.likeCnt}</span>
                  </button>
                  <span className="text-xs text-stone-400">
                    조회수 {activePost.hits}
                  </span>
                </div>

                {/* Comments List */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <p className="text-xs font-semibold text-stone-800">
                    댓글 ({activePost.comments?.length || 0})
                  </p>
                  <div className="space-y-2.5">
                    {(activePost.comments || []).map((c) => (
                      <div
                        key={c.cmtUid}
                        className="p-3 rounded-xl bg-[#faf8f5] border border-[#e7e2da] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900">
                            {c.nickname}
                          </span>
                          <span className="text-stone-400">{c.writeDate}</span>
                        </div>
                        <p className="text-stone-700">{c.contents}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleAddComment}
                className="p-4 bg-[#faf8f5] border-t border-stone-100 flex gap-2"
              >
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="따뜻한 댓글을 남겨보세요..."
                  className="flex-1 px-3.5 py-2 rounded-lg border border-[#e7e2da] bg-white text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>등록</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Write Photo Post Modal */}
      {writeOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-white rounded-2xl border border-[#e7e2da] shadow-xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-700" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  새 여행 사진 스토리 작성
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWriteOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                사진 제목 *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="예: 노을빛이 내려앉은 해안 산책로에서"
                className="w-full px-3.5 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  지역
                </label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-xs"
                >
                  {Object.entries(REGIONS).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  누구와
                </label>
                <select
                  value={newWith}
                  onChange={(e) => setNewWith(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-xs"
                >
                  {Object.entries(COMPANIONS).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  여행 목적
                </label>
                <select
                  value={newFocus}
                  onChange={(e) => setNewFocus(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-xs"
                >
                  {Object.entries(TRAVEL_STYLES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                대표 여행 사진 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_GALLERY_IMAGES.map((img) => (
                  <button
                    key={img.path}
                    type="button"
                    onClick={() => setNewImage(img.path)}
                    className={`relative rounded-lg overflow-hidden border-2 text-left transition-all ${
                      newImage === img.path
                        ? "border-teal-700 ring-2 ring-teal-700/20"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.path}
                      alt={img.label}
                      className="w-full h-16 object-cover"
                    />
                    <span className="block px-1.5 py-1 text-[10px] font-medium text-stone-800 bg-white truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                사진 스토리 내용 *
              </label>
              <textarea
                rows={3}
                required
                value={newContents}
                onChange={(e) => setNewContents(e.target.value)}
                placeholder="사진을 찍은 시간대, 장소의 분위기, 여행 팁을 자유롭게 적어주세요."
                className="w-full p-3 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                태그 (쉼표 `,`로 구분)
              </label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#e7e2da] bg-[#faf8f5] text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWriteOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#e7e2da] text-xs font-medium text-stone-700"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-lg bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold"
              >
                {submitting ? "등록 중..." : "사진 스토리 올리기"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
