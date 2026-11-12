/**
 * Supabase (PostgREST) 연동 및 무료 플랜 휴면 방지(Keep-Alive) 헬퍼
 * 환경 변수 NEXT_PUBLIC_SUPABASE_URL 과 SUPABASE_SERVICE_ROLE_KEY (또는 NEXT_PUBLIC_SUPABASE_ANON_KEY) 설정 시 활성화됩니다.
 */

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }
  return { url, key };
}

export async function pingSupabaseKeepAlive(): Promise<{
  enabled: boolean;
  ok: boolean;
  placeCount?: number;
  message: string;
}> {
  const cfg = getSupabaseConfig();
  if (!cfg) {
    return {
      enabled: false,
      ok: true,
      message: "Supabase 환경 변수가 설정되지 않아 로컬 SQLite 모드로 동작 중입니다.",
    };
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    // 1. place 테이블 조회로 DB 활성 상태 유지
    const selectRes = await fetch(`${cfg.url}/rest/v1/place?select=place_uid`, {
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
      },
      cache: "no-store",
    });

    if (!selectRes.ok) {
      return {
        enabled: true,
        ok: false,
        message: `Supabase 조회 응답 오류: HTTP ${selectRes.status}`,
      };
    }

    const places = (await selectRes.json()) as { place_uid: number }[];

    // 2. user_log 테이블에 일일 헬스체크 로그 기록
    await fetch(`${cfg.url}/rest/v1/user_log`, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        log_contents: "VERCEL_CRON_KEEPALIVE",
        log_date: today,
      }),
    });

    return {
      enabled: true,
      ok: true,
      placeCount: places.length,
      message: "Supabase DB 활성 상태 확인 및 Keep-Alive 로그 기록 완료",
    };
  } catch (err) {
    return {
      enabled: true,
      ok: false,
      message: err instanceof Error ? err.message : "Supabase 연결 중 알 수 없는 오류",
    };
  }
}
