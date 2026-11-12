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

    // 1. Supabase REST 루트 API 핑 (테이블 유무와 무관하게 프로젝트 활성화 및 7일 휴면 방지 보장)
    const rootRes = await fetch(`${cfg.url}/rest/v1/`, {
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
      },
      cache: "no-store",
    });

    if (!rootRes.ok && rootRes.status !== 404) {
      // 401, 403 등 인증 실패 시
      const errText = await rootRes.text().catch(() => "");
      return {
        enabled: true,
        ok: false,
        message: `Supabase API 인증/연결 오류: HTTP ${rootRes.status} ${errText.slice(0, 100)}`,
      };
    }

    // 2. place 테이블 조회로 실제 스키마 구성 상태 확인
    const selectRes = await fetch(`${cfg.url}/rest/v1/place?select=place_uid&limit=10`, {
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
      },
      cache: "no-store",
    });

    if (!selectRes.ok) {
      if (selectRes.status === 404) {
        return {
          enabled: true,
          ok: true, // Supabase 인스턴스 핑은 성공했으므로 휴면 방지는 정상 작동
          placeCount: 0,
          message:
            "Supabase API 핑 완료(휴면 방지 정상 가동). 단, place 테이블이 아직 없어 스키마 초기화가 필요합니다 (supabase/schema_and_seed.sql 실행).",
        };
      }
      return {
        enabled: true,
        ok: false,
        message: `Supabase place 테이블 조회 오류: HTTP ${selectRes.status}`,
      };
    }

    const places = (await selectRes.json()) as { place_uid: number }[];

    // 3. user_log 테이블에 일일 헬스체크 로그 기록 (테이블 존재 시)
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
    }).catch(() => {});

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
