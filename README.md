# 오늘의여행 (Today's Trip) — Modern TypeScript Edition

> **Legacy Java 8 / Spring MVC / JSP / Oracle** 프로젝트를 **TypeScript + Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + SQLite (`node:sqlite`)** 풀스택 아키텍처로 전면 마이그레이션한 대한민국 감성 여행 일정 & 포토 커뮤니티 플랫폼입니다.

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

## 기술 스택

| 영역 | 레거시 (Before — `legacy/`) | 모던 아키텍처 (After) |
| :--- | :--- | :--- |
| **언어 & 런타임** | Java 8 (JDK 1.8) | **TypeScript 5 + Node.js 24 LTS** |
| **프레임워크** | Spring MVC 5.1 + JSP + Tiles | **Next.js 16 (App Router) + React 19** |
| **스타일링** | Bootstrap 4 + jQuery | **Tailwind CSS 4 + Lucide Icons** |
| **데이터베이스** | Oracle 11g + MyBatis XML | **SQLite (`node:sqlite` 내장 모듈, WAL 모드)** |

---

## 빠른 시작 (로컬 실행 & 외부 시연 터널링)

### 1. 의존성 설치 및 개발 서버 실행
```bash
npm install
npm run dev
```
- 실행 시 `data/today_trip.db` SQLite 데이터베이스와 초기 시드 데이터가 자동으로 생성됩니다.

### 2. 시연·테스트용 외부 접속 주소 즉시 생성 (Cloudflare Tunnel)
외부 스마트폰이나 타 PC에서 접속할 수 있는 `https://*.trycloudflare.com` 주소를 즉시 발급합니다:
```bash
npm run demo
```
(이미 서버가 실행 중일 때는 `npm run tunnel`만 실행하면 됩니다.)

### 3. Docker 컨테이너 배포
영구 볼륨(`today_trip_data`)이 연결된 프로덕션 컨테이너를 실행합니다:
```bash
docker compose up -d --build
```
