import { NextResponse } from "next/server";
import { recordVisitLog } from "@/lib/db";
import { pingSupabaseKeepAlive } from "@/lib/supabase";

/**
 * Vercel Cron Job이 매일 1회 호출하여 Supabase 무료 플랜(7일 미사용 시 일시중지)을
 * 상시 활성 상태로 유지하는 엔드포인트입니다.
 */
export async function GET() {
  try {
    recordVisitLog();
  } catch {
    // 무시
  }

  const supabaseStatus = await pingSupabaseKeepAlive();

  return NextResponse.json({
    ok: supabaseStatus.ok,
    timestamp: new Date().toISOString(),
    supabase: supabaseStatus,
  });
}
