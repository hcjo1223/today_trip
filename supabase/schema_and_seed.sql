-- ============================================================================
-- 오늘의여행 (Today's Trip) — Supabase (PostgreSQL) Schema & Seed Script
-- 사용법: Supabase 대시보드 -> SQL Editor -> New Query 에 전체 복사 후 Run 클릭
-- ============================================================================

BEGIN;

-- 1. 테이블 초기화 (재실행 안전성 보장)
DROP TABLE IF EXISTS pic_like CASCADE;
DROP TABLE IF EXISTS pic_comment CASCADE;
DROP TABLE IF EXISTS pic_lib CASCADE;
DROP TABLE IF EXISTS picture CASCADE;
DROP TABLE IF EXISTS tour_like CASCADE;
DROP TABLE IF EXISTS tour_memo CASCADE;
DROP TABLE IF EXISTS tour_location CASCADE;
DROP TABLE IF EXISTS tour CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS place_like CASCADE;
DROP TABLE IF EXISTS place CASCADE;
DROP TABLE IF EXISTS user_log CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. 스키마 생성 (13개 정규화 테이블)
CREATE TABLE users (
  us_uid SERIAL PRIMARY KEY,
  us_id VARCHAR(60) NOT NULL UNIQUE,
  us_pw VARCHAR(255) NOT NULL,
  us_email VARCHAR(120) NOT NULL,
  us_nickname VARCHAR(80) NOT NULL,
  us_gender SMALLINT DEFAULT 0,
  us_birth VARCHAR(20),
  us_memo TEXT,
  us_join_date VARCHAR(20) NOT NULL,
  us_pic TEXT DEFAULT '/images/seoul.jpg',
  us_exit_ck SMALLINT DEFAULT 0,
  us_role VARCHAR(20) DEFAULT 'USER'
);

CREATE TABLE user_log (
  log_uid SERIAL PRIMARY KEY,
  log_contents VARCHAR(100),
  log_date VARCHAR(20) NOT NULL
);

CREATE TABLE place (
  place_uid SERIAL PRIMARY KEY,
  contentid INTEGER NOT NULL UNIQUE,
  contenttypeid INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  mapx DOUBLE PRECISION DEFAULT 126.9780,
  mapy DOUBLE PRECISION DEFAULT 37.5665,
  area_code INTEGER DEFAULT 1,
  sigungu_code INTEGER DEFAULT 1,
  addr1 VARCHAR(255) NOT NULL,
  tel VARCHAR(60) DEFAULT '',
  firstimage2 TEXT NOT NULL,
  overview TEXT DEFAULT '',
  pl_viewcnt INTEGER DEFAULT 0
);

CREATE TABLE place_like (
  place_uid INTEGER NOT NULL REFERENCES place(place_uid) ON DELETE CASCADE,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  PRIMARY KEY (place_uid, us_uid)
);

CREATE TABLE review (
  rv_uid SERIAL PRIMARY KEY,
  place_uid INTEGER NOT NULL REFERENCES place(place_uid) ON DELETE CASCADE,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  rv_content TEXT NOT NULL,
  rv_rate SMALLINT DEFAULT 5,
  rv_write_date VARCHAR(20) NOT NULL
);

CREATE TABLE tour (
  tu_uid SERIAL PRIMARY KEY,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  tu_title VARCHAR(255) NOT NULL,
  tu_summary TEXT DEFAULT '',
  tu_hits INTEGER DEFAULT 0,
  tu_period INTEGER DEFAULT 1,
  tu_location INTEGER DEFAULT 1,
  tu_with INTEGER DEFAULT 1,
  tu_focus INTEGER DEFAULT 1,
  tu_del_ck SMALLINT DEFAULT 0,
  tu_write_date VARCHAR(20) NOT NULL,
  tu_start_tour VARCHAR(20) NOT NULL,
  tu_end_tour VARCHAR(20) NOT NULL,
  tu_cover_img TEXT DEFAULT '/images/jeju.jpg',
  tu_tags TEXT DEFAULT ''
);

CREATE TABLE tour_location (
  tl_uid SERIAL PRIMARY KEY,
  tu_uid INTEGER NOT NULL REFERENCES tour(tu_uid) ON DELETE CASCADE,
  place_uid INTEGER NOT NULL REFERENCES place(place_uid) ON DELETE CASCADE,
  day_number INTEGER DEFAULT 1,
  visit_order INTEGER DEFAULT 1
);

CREATE TABLE tour_memo (
  tm_uid SERIAL PRIMARY KEY,
  tu_uid INTEGER NOT NULL REFERENCES tour(tu_uid) ON DELETE CASCADE,
  memo_day INTEGER NOT NULL,
  memo_contents TEXT NOT NULL
);

CREATE TABLE tour_like (
  tu_uid INTEGER NOT NULL REFERENCES tour(tu_uid) ON DELETE CASCADE,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  PRIMARY KEY (tu_uid, us_uid)
);

CREATE TABLE picture (
  pc_uid SERIAL PRIMARY KEY,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  pc_title VARCHAR(255) NOT NULL,
  pc_contents TEXT NOT NULL,
  pc_hits INTEGER DEFAULT 0,
  pc_location INTEGER DEFAULT 1,
  pc_focus INTEGER DEFAULT 1,
  pc_with INTEGER DEFAULT 1,
  pc_write_date VARCHAR(20) NOT NULL,
  pc_del_ck SMALLINT DEFAULT 0,
  pc_tags TEXT DEFAULT ''
);

CREATE TABLE pic_lib (
  pl_uid SERIAL PRIMARY KEY,
  pc_uid INTEGER NOT NULL REFERENCES picture(pc_uid) ON DELETE CASCADE,
  pl_name VARCHAR(200) NOT NULL,
  pl_path TEXT NOT NULL
);

CREATE TABLE pic_comment (
  cmt_uid SERIAL PRIMARY KEY,
  pc_uid INTEGER NOT NULL REFERENCES picture(pc_uid) ON DELETE CASCADE,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  cmt_contents TEXT NOT NULL,
  cmt_date VARCHAR(20) NOT NULL
);

CREATE TABLE pic_like (
  pc_uid INTEGER NOT NULL REFERENCES picture(pc_uid) ON DELETE CASCADE,
  us_uid INTEGER NOT NULL REFERENCES users(us_uid) ON DELETE CASCADE,
  PRIMARY KEY (pc_uid, us_uid)
);

-- 3. 초기 시드 데이터 입력
INSERT INTO users (us_uid, us_id, us_pw, us_email, us_nickname, us_gender, us_birth, us_memo, us_join_date, us_pic, us_role) VALUES
  (1, 'admin', 'admin1234', 'admin@todaytrip.kr', '조호철 (총괄 디렉터)', 1, '1995-03-15', '오늘의여행 장소 큐레이션 및 플랫폼 총괄 에디터입니다.', '2026-01-10', '/images/seoul.jpg', 'ADMIN'),
  (2, 'mingyu', 'pass1234', 'mingyu@todaytrip.kr', '이민규 (트래블 에디터)', 1, '1996-07-22', '전국 숨은 로컬 명소와 감성 숙소를 기록합니다.', '2026-02-01', '/images/busan.jpg', 'ADMIN'),
  (3, 'donghyuk', 'pass1234', 'donghyuk@todaytrip.kr', '임동혁 (일정 플래너)', 1, '1996-11-05', '동선 낭비 없는 완벽한 2박 3일 여행 코스를 설계합니다.', '2026-02-14', '/images/jeju.jpg', 'USER'),
  (4, 'mincheol', 'pass1234', 'mincheol@todaytrip.kr', '정민철 (포토그래퍼)', 1, '1997-04-19', '필름 카메라로 한국의 사계절 풍경을 담는 여행가입니다.', '2026-03-01', '/images/gyeongju.jpg', 'USER'),
  (5, 'dogyun', 'pass1234', 'dogyun@todaytrip.kr', '김도균 (미식 탐험가)', 1, '1997-09-30', '현지인만 아는 노포와 제철 식재료 맛집을 찾아다닙니다.', '2026-03-12', '/images/dining.jpg', 'USER');

INSERT INTO place (place_uid, contentid, contenttypeid, title, mapx, mapy, area_code, sigungu_code, addr1, tel, firstimage2, overview, pl_viewcnt) VALUES
  (1, 126508, 12, '성산일출봉 & 섭지코지 해안산책로', 126.9425, 33.4584, 17, 4, '제주특별자치도 서귀포시 성산읍 일출로 284-12', '064-783-0959', '/images/jeju.jpg', '유네스코 세계자연유산으로 등재된 화산체로, 유채꽃이 만발한 해안 산책로와 에메랄드빛 제주 동부 바다의 일출이 어우러지는 제주 대표 명소입니다.', 1420),
  (2, 126512, 12, '경복궁 경회루와 고궁 단풍길', 126.9770, 37.5796, 1, 23, '서울특별시 종로구 사직로 161', '02-3700-3900', '/images/seoul.jpg', '조선 왕조 법궁의 품격을 간직한 경복궁과 연못 위로 비치는 경회루의 반영이 아름다운 서울 도심 속 역사 산책 코스입니다.', 1180),
  (3, 126535, 12, '광안리 해변 & 광안대교 선셋 테라스', 129.1189, 35.1532, 6, 14, '부산광역시 수영구 광안해변로 219', '051-610-4744', '/images/busan.jpg', '노을빛으로 물드는 바다 위로 광안대교의 야경이 켜지는 부산 최고의 오션뷰 산책로이자 로컬 로스터리 카페 거리입니다.', 985),
  (4, 126590, 12, '경주 월정교 & 동궁과 월지 야경', 129.2267, 35.8294, 13, 2, '경상북도 경주시 교동 274', '054-779-8795', '/images/gyeongju.jpg', '신라 천년의 왕경 문화를 복원한 목조 교량 월정교와 남천 위로 드리워지는 황홀한 야간 반영이 인상적인 역사 유적지입니다.', 890),
  (5, 320101, 32, '강릉 솔향 고택 한옥 스테이', 128.8761, 37.7892, 10, 1, '강원특별자치도 강릉시 죽헌길 142-8', '033-642-8120', '/images/gangneung.jpg', '백년 소나무 정원과 넓은 대청마루에서 수제 다과와 전통 차를 즐기며 온전한 쉼을 경험할 수 있는 프라이빗 한옥 독채 스테이입니다.', 760),
  (6, 320102, 32, '서귀포 바당 돌담 프라이빗 풀빌라', 126.8512, 33.3215, 17, 4, '제주특별자치도 서귀포시 표선면 해안도로 512', '064-787-3310', '/images/jeju.jpg', '현무암 돌담 너머로 제주 남쪽 바다가 한눈에 펼쳐지는 감성 숙소로, 사계절 온수 자쿠지와 조식 바스켓을 제공합니다.', 640),
  (7, 390201, 39, '애월 해안가 참숯 흑돼지 & 전복 한상', 126.3218, 33.4629, 17, 3, '제주특별자치도 제주시 애월읍 애월해안로 682', '064-799-8821', '/images/dining.jpg', '제주 바다를 바라보며 두툼하게 숙성한 제주산 흑돼지 오겹살과 활전복 버터구이, 당일 공수한 제철 해산물을 맛볼 수 있는 대표 미식 공간입니다.', 1120),
  (8, 390202, 39, '서촌 고택 제철 한정식 & 전통 다원', 126.9705, 37.5812, 1, 23, '서울특별시 종로구 자하문로 89', '02-734-5512', '/images/gangneung.jpg', '경복궁 서측 한옥 골목에 자리한 다이닝 공간으로, 전국 산지에서 공수한 제철 나물 반상과 수제 약과·한과 디저트 코스를 선보입니다.', 590);

INSERT INTO place_like (place_uid, us_uid) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4),
  (2, 1), (2, 3),
  (3, 2), (3, 4),
  (5, 1), (5, 2),
  (7, 1), (7, 3), (7, 5);

INSERT INTO review (rv_uid, place_uid, us_uid, rv_content, rv_rate, rv_write_date) VALUES
  (1, 1, 3, '일출 시간 맞춰서 오전 6시 반에 올라갔는데 유채꽃 산책로와 바다 색감이 정말 비현실적으로 아름다웠습니다. 근처 해녀의집 아침 식사 코스로도 최고예요!', 5, '2026-10-28'),
  (2, 1, 4, '필름 카메라 한 롤을 다 쓸 만큼 해안 절벽과 파도 풍경이 압도적입니다. 바람이 꽤 부니 가벼운 방풍 자켓을 챙기시는 걸 추천합니다.', 5, '2026-11-02'),
  (3, 2, 2, '가을 단풍이 절정일 때 경회루 연못 주변을 걸으니 도심 한복판이라는 게 믿기지 않을 만큼 고즈넉했습니다.', 5, '2026-11-04'),
  (4, 5, 1, '대청마루에 앉아 소나무 정원을 바라보며 마신 수제 쑥차와 개성주악이 아직도 기억에 남습니다. 부모님 모시고 꼭 다시 오고 싶은 숙소입니다.', 5, '2026-11-06'),
  (5, 7, 5, '창가 좌석에서 노을 지는 애월 바다를 보며 먹는 흑돼지 근고기와 전복구이 조합이 완벽했습니다. 멜젓이 비리지 않고 고소해요!', 4, '2026-11-08');

INSERT INTO tour (tu_uid, us_uid, tu_title, tu_summary, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_write_date, tu_start_tour, tu_end_tour, tu_cover_img, tu_tags) VALUES
  (1, 3, '제주 동쪽에서 서쪽까지, 유채꽃 해안길과 흑돼지 미식 2박 3일', '성산일출봉 아침 산책부터 서귀포 돌담 스테이, 애월 오션뷰 흑돼지 만찬까지 실패 없는 제주 핵심 코스', 342, 3, 17, 3, 6, '2026-11-01', '2026-11-15', '2026-11-17', '/images/jeju.jpg', '제주도,성산일출봉,애월맛집,감성숙소,커플여행'),
  (2, 2, '가을 고궁 단풍 산책과 서촌 한옥 다원 하루 코스', '경복궁 경회루의 아침 풍경을 감상하고 서촌 골목의 고택에서 제철 다과를 즐기는 여유로운 서울 도심 여행', 218, 2, 1, 2, 5, '2026-11-03', '2026-11-20', '2026-11-21', '/images/seoul.jpg', '서울여행,경복궁,서촌한옥,가을단풍,문화탐방'),
  (3, 4, '부산 광안리 노을부터 경주 월정교 야경까지 영남 감성 일주', '바다와 천년 고도의 야경을 함께 담는 사진작가 추천 2박 3일 출사 & 힐링 루트', 276, 3, 6, 1, 2, '2026-11-05', '2026-11-25', '2026-11-27', '/images/busan.jpg', '부산광안리,경주야경,월정교,출사여행,나홀로여행');

INSERT INTO tour_location (tu_uid, place_uid, day_number, visit_order) VALUES
  (1, 1, 1, 1), (1, 6, 2, 1), (1, 7, 3, 1),
  (2, 2, 1, 1), (2, 8, 2, 1),
  (3, 3, 1, 1), (3, 4, 2, 1), (3, 5, 3, 1);

INSERT INTO tour_memo (tu_uid, memo_day, memo_contents) VALUES
  (1, 1, '오전 7시 성산일출봉 매표소 도착 후 해안 산책로 따라 1시간 반 여유롭게 트레킹. 점심은 성산항 갈치조림 추천!'),
  (1, 2, '표선 해안도로 드라이브 후 오후 3시 풀빌라 체크인. 일몰 시간에 맞춰 야외 자쿠지 이용하기.'),
  (1, 3, '공항 가기 전 애월 해안도로에서 흑돼지 오겹살 & 전복구이 이른 저녁 식사 후 렌터카 반납.'),
  (2, 1, '오전 9시 개장 직후 경복궁 입장하여 경회루 연못 반영 촬영. 오후에는 국립고궁박물관 관람.'),
  (2, 2, '서촌 골목 독립서점 투어 후 고택 다원에서 전통 차와 약과 플레이트로 마무리.'),
  (3, 1, '오후 5시 광안리 해변 도착, 매직아워 시간에 광안대교 점등 순간 촬영 및 해변 테라스 카페 휴식.'),
  (3, 2, '경주로 이동하여 교촌한옥마을 산책 후 해 질 녘 월정교 남천 징검다리에서 야경 촬영.');

INSERT INTO tour_like (tu_uid, us_uid) VALUES
  (1, 1), (1, 2), (1, 4),
  (2, 1), (2, 3),
  (3, 2), (3, 5);

INSERT INTO picture (pc_uid, us_uid, pc_title, pc_contents, pc_hits, pc_location, pc_focus, pc_with, pc_write_date, pc_tags) VALUES
  (1, 4, '유채꽃이 물든 제주 성산의 아침 빛', '해가 막 떠오른 직후 성산일출봉 아래 해안 산책로를 걸으며 담은 장면입니다. 현무암 너머로 부서지는 파도와 노란 유채꽃의 대비가 오래도록 마음에 남았습니다.', 512, 17, 6, 1, '2026-11-02', '제주도,성산일출봉,필름사진,자연과함께'),
  (2, 2, '강릉 한옥 대청마루에서 맞이한 오후의 차 한 잔', '소나무 그림자가 마당에 길게 드리워지는 오후, 따뜻한 호지차와 수제 약과를 곁들이며 보낸 고요한 시간이었습니다.', 438, 10, 3, 3, '2026-11-04', '강릉여행,한옥스테이,다도,힐링여행'),
  (3, 1, '가을 단풍이 내려앉은 경복궁 경회루 반영', '바람 한 점 없던 가을 아침, 경회루 연못 수면 위로 단청과 오색 단풍이 거울처럼 비치던 순간을 기록했습니다.', 395, 1, 5, 2, '2026-11-06', '서울고궁,경복궁,경회루,가을여행'),
  (4, 3, '광안리 해변의 노을과 카페 테라스의 온기', '보랏빛과 주황빛으로 물드는 부산 광안리 해변. 광안대교에 조명이 하나둘 켜질 때 해변을 따라 걷는 것만으로도 완벽한 저녁이 됩니다.', 360, 6, 2, 3, '2026-11-07', '부산여행,광안리,광안대교,선셋'),
  (5, 5, '애월 바다 앞 숯불 흑돼지와 전복구이 한 상', '금강산도 식후경! 파도 소리가 들리는 창가 자리에서 굽는 제주 흑돼지 오겹살과 고소한 전복 버터구이는 제주 여행의 이유 그 자체입니다.', 310, 17, 7, 2, '2026-11-09', '제주맛집,애월흑돼지,전복구이,미식여행'),
  (6, 4, '신라의 밤을 걷다, 경주 월정교의 황금빛 반영', '어둠이 내려앉은 남천 위로 월정교의 고운 조명빛이 물결치는 밤. 경주에서만 만날 수 있는 깊고 우아한 야경입니다.', 290, 13, 5, 1, '2026-11-10', '경주여행,월정교,야경명소,역사탐방');

INSERT INTO pic_lib (pc_uid, pl_name, pl_path) VALUES
  (1, 'jeju.jpg', '/images/jeju.jpg'),
  (2, 'gangneung.jpg', '/images/gangneung.jpg'),
  (3, 'seoul.jpg', '/images/seoul.jpg'),
  (4, 'busan.jpg', '/images/busan.jpg'),
  (5, 'dining.jpg', '/images/dining.jpg'),
  (6, 'gyeongju.jpg', '/images/gyeongju.jpg');

INSERT INTO pic_like (pc_uid, us_uid) VALUES
  (1, 1), (1, 2), (1, 3), (1, 5),
  (2, 1), (2, 3), (2, 4),
  (3, 2), (3, 4),
  (4, 1), (4, 5),
  (5, 1), (5, 2),
  (6, 3);

INSERT INTO pic_comment (pc_uid, us_uid, cmt_contents, cmt_date) VALUES
  (1, 2, '색감이 정말 따뜻하네요! 몇 시쯤 촬영하신 사진인가요?', '2026-11-03'),
  (1, 4, '오전 7시경 해 뜨고 직후 산책로 초입에서 촬영했습니다 :)', '2026-11-03'),
  (2, 3, '대청마루 뷰가 예술이네요. 다음 강릉 일정에 꼭 넣어야겠습니다.', '2026-11-05'),
  (3, 5, '수면 반영이 거울처럼 깨끗하네요!', '2026-11-07');

INSERT INTO user_log (log_contents, log_date) VALUES
  ('HOME_VISIT', '2026-11-06'),
  ('HOME_VISIT', '2026-11-07'),
  ('HOME_VISIT', '2026-11-08'),
  ('HOME_VISIT', '2026-11-09'),
  ('HOME_VISIT', '2026-11-10'),
  ('HOME_VISIT', '2026-11-11'),
  ('HOME_VISIT', '2026-11-12');

-- 4. 시퀀스 값 동기화
SELECT setval(pg_get_serial_sequence('users', 'us_uid'), (SELECT MAX(us_uid) FROM users));
SELECT setval(pg_get_serial_sequence('place', 'place_uid'), (SELECT MAX(place_uid) FROM place));
SELECT setval(pg_get_serial_sequence('review', 'rv_uid'), (SELECT MAX(rv_uid) FROM review));
SELECT setval(pg_get_serial_sequence('tour', 'tu_uid'), (SELECT MAX(tu_uid) FROM tour));
SELECT setval(pg_get_serial_sequence('tour_location', 'tl_uid'), (SELECT MAX(tl_uid) FROM tour_location));
SELECT setval(pg_get_serial_sequence('tour_memo', 'tm_uid'), (SELECT MAX(tm_uid) FROM tour_memo));
SELECT setval(pg_get_serial_sequence('picture', 'pc_uid'), (SELECT MAX(pc_uid) FROM picture));
SELECT setval(pg_get_serial_sequence('pic_lib', 'pl_uid'), (SELECT MAX(pl_uid) FROM pic_lib));
SELECT setval(pg_get_serial_sequence('pic_comment', 'cmt_uid'), (SELECT MAX(cmt_uid) FROM pic_comment));
SELECT setval(pg_get_serial_sequence('user_log', 'log_uid'), (SELECT MAX(log_uid) FROM user_log));

COMMIT;
