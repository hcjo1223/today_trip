import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/db";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "오늘의여행 (Today_Trip) — 대한민국 여행 일정 & 사진 공유 커뮤니티",
  description:
    "한국관광공사 TourAPI 기반 관광지, 맛집, 감성 숙소 정보와 여행자들의 일차별 여행 일정 계획, 사진을 함께 나누는 모던 여행 커뮤니티입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const demoUsers = getAdminDashboardData().users;
  // Default to first user (조호철 - 총괄 디렉터) in UI if not explicitly logged out, or pass currentUser
  const activeUser = user || demoUsers[0] || null;

  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar currentUser={activeUser} demoUsers={demoUsers} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
