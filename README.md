# 오늘의여행 (Today's Trip) — Modern TypeScript Edition

> **Legacy Java 8 / Spring MVC / JSP / Oracle** 프로젝트를 **TypeScript + Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + SQLite / Supabase (PostgreSQL)** 풀스택 아키텍처로 전면 마이그레이션한 대한민국 감성 여행 일정 & 포토 커뮤니티 플랫폼입니다.

- **모바일·외부 즉시 시연 URL**: **https://hcjo1223.github.io/today_trip/**

---

## 주요 기능

1. **장소 큐레이션 & 리뷰 (`/places`, `/places/[id]`)**
   - 한국관광공사 TourAPI 분류 체계(`12` 관광지, `32` 숙박, `39` 음식점) 및 전국 17개 시·도 필터링
   - 장소별 상세 정보, 지도 좌표 안내, 좋아요 토글, 실시간 별점 리뷰 작성 및 삭제
2. **여행 일정 코스 탐색 & 플래너 빌더 (`/tours`, `/tours/[id]`, `/tours/new`)**
   - 지역·누구와·여행스타일 다중 필터링
   - Day별 방문 경유지(`tour_location`) 타임라인, SVG 경로 시각화, 일차별 메모(`tour_memo`) 설계 및 저장
3. **여행사진 커뮤니티 (`/cards`)**
   - 여행 스냅 사진과 에세이 공유, 해시태그·지역·테마 필터링, 상세 모달 댓글 및 좋아요 소통
4. **인증 / 마이페이지 / 관리자 대시보드 (`/login`, `/mypage`, `/admin`)**
   - 데모 계정 원클릭 전환 및 회원가입/프로필 편집
   - 일별 방문자 추이 차트, 인기 장소 Top 5, 게시물 노출/숨김 관리 및 회원 권한(`USER`/`ADMIN`) 제어

---

## 무료 배포 가이드 (Vercel + Supabase Free Tier)

### 1단계: Supabase 무료 DB 생성 및 스키마 적용
1. [Supabase](https://supabase.com)에서 무료 프로젝트를 생성합니다.
2. 좌측 메뉴 **SQL Editor** → **New Query**를 열고 [`supabase/schema_and_seed.sql`](supabase/schema_and_seed.sql) 파일 내용을 붙여넣은 뒤 **Run**을 클릭합니다. (13개 정규화 테이블과 초기 시드 데이터가 한 번에 생성됩니다.)

### 2단계: Vercel 무료 호스팅 연결
1. [Vercel](https://vercel.com)에서 **Add New Project** → GitHub `hcjo1223/today_trip` 저장소를 Import 합니다.
2. **Environment Variables**에 [`.env.example`](.env.example)에 안내된 3개 값을 입력하고 **Deploy**를 누릅니다:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. [`vercel.json`](vercel.json)에 설정된 일일 Cron Job(`/api/cron/keepalive`)이 매일 자동으로 Supabase DB를 깨워 **7일 미사용 시 일시 중지(Pause)되는 현상을 방지**합니다.
   - *(환경 변수를 설정하기 전에도 Vercel 서버리스 `/tmp` SQLite 폴백을 통해 즉시 배포·동작합니다.)*

---

## 로컬 실행 & 외부 시연 터널링

```bash
npm install
npm run dev     # 로컬 개발 서버 (http://localhost:3000)
npm run demo    # Cloudflare Quick Tunnel 외부 공유 링크 즉시 생성
```
