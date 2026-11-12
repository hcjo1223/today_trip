import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import type {
  AdminDashboardData,
  PicComment,
  PicturePost,
  Place,
  Review,
  Tour,
  TourLocationItem,
  TourMemoItem,
  User,
} from "./types";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "today_trip.db");

declare global {
  var __todayTripDb: DatabaseSync | undefined;
}

export function getDb(): DatabaseSync {
  if (global.__todayTripDb) {
    return global.__todayTripDb;
  }

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  initializeSchema(db);
  seedDatabaseIfNeeded(db);

  global.__todayTripDb = db;
  return db;
}

function initializeSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      us_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      us_id TEXT NOT NULL UNIQUE,
      us_pw TEXT NOT NULL,
      us_email TEXT NOT NULL,
      us_nickname TEXT NOT NULL,
      us_gender INTEGER DEFAULT 0,
      us_birth TEXT,
      us_memo TEXT,
      us_join_date TEXT NOT NULL,
      us_pic TEXT DEFAULT '/images/seoul.jpg',
      us_exit_ck INTEGER DEFAULT 0,
      us_role TEXT DEFAULT 'USER'
    );

    CREATE TABLE IF NOT EXISTS user_log (
      log_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      log_contents TEXT,
      log_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS place (
      place_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      contentid INTEGER NOT NULL UNIQUE,
      contenttypeid INTEGER NOT NULL,
      title TEXT NOT NULL,
      mapx REAL DEFAULT 126.9780,
      mapy REAL DEFAULT 37.5665,
      area_code INTEGER DEFAULT 1,
      sigungu_code INTEGER DEFAULT 1,
      addr1 TEXT NOT NULL,
      tel TEXT DEFAULT '',
      firstimage2 TEXT NOT NULL,
      overview TEXT DEFAULT '',
      pl_viewcnt INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS place_like (
      place_uid INTEGER NOT NULL,
      us_uid INTEGER NOT NULL,
      PRIMARY KEY (place_uid, us_uid),
      FOREIGN KEY (place_uid) REFERENCES place(place_uid) ON DELETE CASCADE,
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS review (
      rv_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      place_uid INTEGER NOT NULL,
      us_uid INTEGER NOT NULL,
      rv_content TEXT NOT NULL,
      rv_rate INTEGER DEFAULT 5,
      rv_write_date TEXT NOT NULL,
      FOREIGN KEY (place_uid) REFERENCES place(place_uid) ON DELETE CASCADE,
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tour (
      tu_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      us_uid INTEGER NOT NULL,
      tu_title TEXT NOT NULL,
      tu_summary TEXT DEFAULT '',
      tu_hits INTEGER DEFAULT 0,
      tu_period INTEGER DEFAULT 1,
      tu_location INTEGER DEFAULT 1,
      tu_with INTEGER DEFAULT 1,
      tu_focus INTEGER DEFAULT 1,
      tu_del_ck INTEGER DEFAULT 0,
      tu_write_date TEXT NOT NULL,
      tu_start_tour TEXT NOT NULL,
      tu_end_tour TEXT NOT NULL,
      tu_cover_img TEXT DEFAULT '/images/jeju.jpg',
      tu_tags TEXT DEFAULT '',
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tour_location (
      tl_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      tu_uid INTEGER NOT NULL,
      place_uid INTEGER NOT NULL,
      day_number INTEGER DEFAULT 1,
      visit_order INTEGER DEFAULT 1,
      FOREIGN KEY (tu_uid) REFERENCES tour(tu_uid) ON DELETE CASCADE,
      FOREIGN KEY (place_uid) REFERENCES place(place_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tour_memo (
      tm_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      tu_uid INTEGER NOT NULL,
      memo_day INTEGER NOT NULL,
      memo_contents TEXT NOT NULL,
      FOREIGN KEY (tu_uid) REFERENCES tour(tu_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tour_like (
      tu_uid INTEGER NOT NULL,
      us_uid INTEGER NOT NULL,
      PRIMARY KEY (tu_uid, us_uid),
      FOREIGN KEY (tu_uid) REFERENCES tour(tu_uid) ON DELETE CASCADE,
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS picture (
      pc_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      us_uid INTEGER NOT NULL,
      pc_title TEXT NOT NULL,
      pc_contents TEXT NOT NULL,
      pc_hits INTEGER DEFAULT 0,
      pc_location INTEGER DEFAULT 1,
      pc_focus INTEGER DEFAULT 1,
      pc_with INTEGER DEFAULT 1,
      pc_write_date TEXT NOT NULL,
      pc_del_ck INTEGER DEFAULT 0,
      pc_tags TEXT DEFAULT '',
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pic_lib (
      pl_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      pc_uid INTEGER NOT NULL,
      pl_name TEXT NOT NULL,
      pl_path TEXT NOT NULL,
      FOREIGN KEY (pc_uid) REFERENCES picture(pc_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pic_comment (
      cmt_uid INTEGER PRIMARY KEY AUTOINCREMENT,
      pc_uid INTEGER NOT NULL,
      us_uid INTEGER NOT NULL,
      cmt_contents TEXT NOT NULL,
      cmt_date TEXT NOT NULL,
      FOREIGN KEY (pc_uid) REFERENCES picture(pc_uid) ON DELETE CASCADE,
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pic_like (
      pc_uid INTEGER NOT NULL,
      us_uid INTEGER NOT NULL,
      PRIMARY KEY (pc_uid, us_uid),
      FOREIGN KEY (pc_uid) REFERENCES picture(pc_uid) ON DELETE CASCADE,
      FOREIGN KEY (us_uid) REFERENCES users(us_uid) ON DELETE CASCADE
    );
  `);
}

function seedDatabaseIfNeeded(db: DatabaseSync) {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM users").get() as { cnt: number };
  if (row.cnt > 0) return;

  // 1. Seed Users (Team members from original README + demo accounts)
  const insertUser = db.prepare(`
    INSERT INTO users (us_id, us_pw, us_email, us_nickname, us_gender, us_birth, us_memo, us_join_date, us_pic, us_role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    "admin",
    "admin1234",
    "admin@todaytrip.kr",
    "조호철 (총괄 디렉터)",
    1,
    "1995-03-15",
    "오늘의여행 장소 큐레이션 및 플랫폼 총괄 에디터입니다.",
    "2026-01-10",
    "/images/seoul.jpg",
    "ADMIN"
  );
  insertUser.run(
    "mingyu",
    "pass1234",
    "mingyu@todaytrip.kr",
    "이민규 (트래블 에디터)",
    1,
    "1996-07-22",
    "전국 숨은 로컬 명소와 감성 숙소를 기록합니다.",
    "2026-02-01",
    "/images/busan.jpg",
    "ADMIN"
  );
  insertUser.run(
    "donghyuk",
    "pass1234",
    "donghyuk@todaytrip.kr",
    "임동혁 (일정 플래너)",
    1,
    "1996-11-05",
    "동선 낭비 없는 완벽한 2박 3일 여행 코스를 설계합니다.",
    "2026-02-14",
    "/images/jeju.jpg",
    "USER"
  );
  insertUser.run(
    "mincheol",
    "pass1234",
    "mincheol@todaytrip.kr",
    "정민철 (포토그래퍼)",
    1,
    "1997-04-19",
    "필름 카메라로 한국의 사계절 풍경을 담는 여행가입니다.",
    "2026-03-01",
    "/images/gyeongju.jpg",
    "USER"
  );
  insertUser.run(
    "dogyun",
    "pass1234",
    "dogyun@todaytrip.kr",
    "김도균 (미식 탐험가)",
    1,
    "1997-09-30",
    "현지인만 아는 노포와 제철 식재료 맛집을 찾아다닙니다.",
    "2026-03-12",
    "/images/dining.jpg",
    "USER"
  );

  // 2. Seed Places (TourAPI contentTypeId: 12=관광지, 32=숙박, 39=음식점)
  const insertPlace = db.prepare(`
    INSERT INTO place (contentid, contenttypeid, title, mapx, mapy, area_code, sigungu_code, addr1, tel, firstimage2, overview, pl_viewcnt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const placesSeed = [
    {
      contentId: 126508,
      contentTypeId: 12,
      title: "성산일출봉 & 섭지코지 해안산책로",
      mapx: 126.9425,
      mapy: 33.4584,
      areaCode: 17,
      sigunguCode: 4,
      addr1: "제주특별자치도 서귀포시 성산읍 일출로 284-12",
      tel: "064-783-0959",
      firstImage2: "/images/jeju.jpg",
      overview:
        "유네스코 세계자연유산으로 등재된 화산체로, 유채꽃이 만발한 해안 산책로와 에메랄드빛 제주 동부 바다의 일출이 어우러지는 제주 대표 명소입니다.",
      viewCnt: 1420,
    },
    {
      contentId: 126512,
      contentTypeId: 12,
      title: "경복궁 경회루와 고궁 단풍길",
      mapx: 126.977,
      mapy: 37.5796,
      areaCode: 1,
      sigunguCode: 23,
      addr1: "서울특별시 종로구 사직로 161",
      tel: "02-3700-3900",
      firstImage2: "/images/seoul.jpg",
      overview:
        "조선 왕조 법궁의 품격을 간직한 경복궁과 연못 위로 비치는 경회루의 반영이 아름다운 서울 도심 속 역사 산책 코스입니다.",
      viewCnt: 1180,
    },
    {
      contentId: 126535,
      contentTypeId: 12,
      title: "광안리 해변 & 광안대교 선셋 테라스",
      mapx: 129.1189,
      mapy: 35.1532,
      areaCode: 6,
      sigunguCode: 14,
      addr1: "부산광역시 수영구 광안해변로 219",
      tel: "051-610-4744",
      firstImage2: "/images/busan.jpg",
      overview:
        "노을빛으로 물드는 바다 위로 광안대교의 야경이 켜지는 부산 최고의 오션뷰 산책로이자 로컬 로스터리 카페 거리입니다.",
      viewCnt: 985,
    },
    {
      contentId: 126590,
      contentTypeId: 12,
      title: "경주 월정교 & 동궁과 월지 야경",
      mapx: 129.2267,
      mapy: 35.8294,
      areaCode: 13,
      sigunguCode: 2,
      addr1: "경상북도 경주시 교동 274",
      tel: "054-779-8795",
      firstImage2: "/images/gyeongju.jpg",
      overview:
        "신라 천년의 왕경 문화를 복원한 목조 교량 월정교와 남천 위로 드리워지는 황홀한 야간 반영이 인상적인 역사 유적지입니다.",
      viewCnt: 890,
    },
    {
      contentId: 320101,
      contentTypeId: 32,
      title: "강릉 솔향 고택 한옥 스테이",
      mapx: 128.8761,
      mapy: 37.7892,
      areaCode: 10,
      sigunguCode: 1,
      addr1: "강원특별자치도 강릉시 죽헌길 142-8",
      tel: "033-642-8120",
      firstImage2: "/images/gangneung.jpg",
      overview:
        "백년 소나무 정원과 넓은 대청마루에서 수제 다과와 전통 차를 즐기며 온전한 쉼을 경험할 수 있는 프라이빗 한옥 독채 스테이입니다.",
      viewCnt: 760,
    },
    {
      contentId: 320102,
      contentTypeId: 32,
      title: "서귀포 바당 돌담 프라이빗 풀빌라",
      mapx: 126.8512,
      mapy: 33.3215,
      areaCode: 17,
      sigunguCode: 4,
      addr1: "제주특별자치도 서귀포시 표선면 해안도로 512",
      tel: "064-787-3310",
      firstImage2: "/images/jeju.jpg",
      overview:
        "현무암 돌담 너머로 제주 남쪽 바다가 한눈에 펼쳐지는 감성 숙소로, 사계절 온수 자쿠지와 조식 바스켓을 제공합니다.",
      viewCnt: 640,
    },
    {
      contentId: 390201,
      contentTypeId: 39,
      title: "애월 해안가 참숯 흑돼지 & 전복 한상",
      mapx: 126.3218,
      mapy: 33.4629,
      areaCode: 17,
      sigunguCode: 3,
      addr1: "제주특별자치도 제주시 애월읍 애월해안로 682",
      tel: "064-799-8821",
      firstImage2: "/images/dining.jpg",
      overview:
        "제주 바다를 바라보며 두툼하게 숙성한 제주산 흑돼지 오겹살과 활전복 버터구이, 당일 공수한 제철 해산물을 맛볼 수 있는 대표 미식 공간입니다.",
      viewCnt: 1120,
    },
    {
      contentId: 390202,
      contentTypeId: 39,
      title: "서촌 고택 제철 한정식 & 전통 다원",
      mapx: 126.9705,
      mapy: 37.5812,
      areaCode: 1,
      sigunguCode: 23,
      addr1: "서울특별시 종로구 자하문로 89",
      tel: "02-734-5512",
      firstImage2: "/images/gangneung.jpg",
      overview:
        "경복궁 서측 한옥 골목에 자리한 다이닝 공간으로, 전국 산지에서 공수한 제철 나물 반상과 수제 약과·한과 디저트 코스를 선보입니다.",
      viewCnt: 590,
    },
  ];

  for (const p of placesSeed) {
    insertPlace.run(
      p.contentId,
      p.contentTypeId,
      p.title,
      p.mapx,
      p.mapy,
      p.areaCode,
      p.sigunguCode,
      p.addr1,
      p.tel,
      p.firstImage2,
      p.overview,
      p.viewCnt
    );
  }

  // 3. Seed Place Likes & Reviews
  const insertPlaceLike = db.prepare("INSERT INTO place_like (place_uid, us_uid) VALUES (?, ?)");
  insertPlaceLike.run(1, 1);
  insertPlaceLike.run(1, 2);
  insertPlaceLike.run(1, 3);
  insertPlaceLike.run(1, 4);
  insertPlaceLike.run(2, 1);
  insertPlaceLike.run(2, 3);
  insertPlaceLike.run(3, 2);
  insertPlaceLike.run(3, 4);
  insertPlaceLike.run(5, 1);
  insertPlaceLike.run(5, 2);
  insertPlaceLike.run(7, 1);
  insertPlaceLike.run(7, 3);
  insertPlaceLike.run(7, 5);

  const insertReview = db.prepare(`
    INSERT INTO review (place_uid, us_uid, rv_content, rv_rate, rv_write_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertReview.run(
    1,
    3,
    "일출 시간 맞춰서 오전 6시 반에 올라갔는데 유채꽃 산책로와 바다 색감이 정말 비현실적으로 아름다웠습니다. 근처 해녀의집 아침 식사 코스로도 최고예요!",
    5,
    "2026-10-28"
  );
  insertReview.run(
    1,
    4,
    "필름 카메라 한 롤을 다 쓸 만큼 해안 절벽과 파도 풍경이 압도적입니다. 바람이 꽤 부니 가벼운 방풍 자켓을 챙기시는 걸 추천합니다.",
    5,
    "2026-11-02"
  );
  insertReview.run(
    2,
    2,
    "가을 단풍이 절정일 때 경회루 연못 주변을 걸으니 도심 한복판이라는 게 믿기지 않을 만큼 고즈넉했습니다.",
    5,
    "2026-11-04"
  );
  insertReview.run(
    5,
    1,
    "대청마루에 앉아 소나무 정원을 바라보며 마신 수제 쑥차와 개성주악이 아직도 기억에 남습니다. 부모님 모시고 꼭 다시 오고 싶은 숙소입니다.",
    5,
    "2026-11-06"
  );
  insertReview.run(
    7,
    5,
    "창가 좌석에서 노을 지는 애월 바다를 보며 먹는 흑돼지 근고기와 전복구이 조합이 완벽했습니다. 멜젓이 비리지 않고 고소해요!",
    4,
    "2026-11-08"
  );

  // 4. Seed Tours (Travel Itineraries)
  const insertTour = db.prepare(`
    INSERT INTO tour (us_uid, tu_title, tu_summary, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_write_date, tu_start_tour, tu_end_tour, tu_cover_img, tu_tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTour.run(
    3,
    "제주 동쪽에서 서쪽까지, 유채꽃 해안길과 흑돼지 미식 2박 3일",
    "성산일출봉 아침 산책부터 서귀포 돌담 스테이, 애월 오션뷰 흑돼지 만찬까지 실패 없는 제주 핵심 코스",
    342,
    3,
    17,
    3,
    6,
    "2026-11-01",
    "2026-11-15",
    "2026-11-17",
    "/images/jeju.jpg",
    "제주도,성산일출봉,애월맛집,감성숙소,커플여행"
  );

  insertTour.run(
    2,
    "가을 고궁 단풍 산책과 서촌 한옥 다원 하루 코스",
    "경복궁 경회루의 아침 풍경을 감상하고 서촌 골목의 고택에서 제철 다과를 즐기는 여유로운 서울 도심 여행",
    218,
    2,
    1,
    2,
    5,
    "2026-11-03",
    "2026-11-20",
    "2026-11-21",
    "/images/seoul.jpg",
    "서울여행,경복궁,서촌한옥,가을단풍,문화탐방"
  );

  insertTour.run(
    4,
    "부산 광안리 노을부터 경주 월정교 야경까지 영남 감성 일주",
    "바다와 천년 고도의 야경을 함께 담는 사진작가 추천 2박 3일 출사 & 힐링 루트",
    276,
    3,
    6,
    1,
    2,
    "2026-11-05",
    "2026-11-25",
    "2026-11-27",
    "/images/busan.jpg",
    "부산광안리,경주야경,월정교,출사여행,나홀로여행"
  );

  // Tour Locations & Memos
  const insertTL = db.prepare(`
    INSERT INTO tour_location (tu_uid, place_uid, day_number, visit_order)
    VALUES (?, ?, ?, ?)
  `);
  insertTL.run(1, 1, 1, 1);
  insertTL.run(1, 6, 2, 1);
  insertTL.run(1, 7, 3, 1);

  insertTL.run(2, 2, 1, 1);
  insertTL.run(2, 8, 2, 1);

  insertTL.run(3, 3, 1, 1);
  insertTL.run(3, 4, 2, 1);
  insertTL.run(3, 5, 3, 1);

  const insertMemo = db.prepare(`
    INSERT INTO tour_memo (tu_uid, memo_day, memo_contents)
    VALUES (?, ?, ?)
  `);
  insertMemo.run(
    1,
    1,
    "오전 7시 성산일출봉 매표소 도착 후 해안 산책로 따라 1시간 반 여유롭게 트레킹. 점심은 성산항 갈치조림 추천!"
  );
  insertMemo.run(
    1,
    2,
    "표선 해안도로 드라이브 후 오후 3시 풀빌라 체크인. 일몰 시간에 맞춰 야외 자쿠지 이용하기."
  );
  insertMemo.run(
    1,
    3,
    "공항 가기 전 애월 해안도로에서 흑돼지 오겹살 & 전복구이 이른 저녁 식사 후 렌터카 반납."
  );

  insertMemo.run(
    2,
    1,
    "오전 9시 개장 직후 경복궁 입장하여 경회루 연못 반영 촬영. 오후에는 국립고궁박물관 관람."
  );
  insertMemo.run(
    2,
    2,
    "서촌 골목 독립서점 투어 후 고택 다원에서 전통 차와 약과 플레이트로 마무리."
  );

  insertMemo.run(
    3,
    1,
    "오후 5시 광안리 해변 도착, 매직아워 시간에 광안대교 점등 순간 촬영 및 해변 테라스 카페 휴식."
  );
  insertMemo.run(
    3,
    2,
    "경주로 이동하여 교촌한옥마을 산책 후 해 질 녘 월정교 남천 징검다리에서 야경 촬영."
  );

  const insertTourLike = db.prepare("INSERT INTO tour_like (tu_uid, us_uid) VALUES (?, ?)");
  insertTourLike.run(1, 1);
  insertTourLike.run(1, 2);
  insertTourLike.run(1, 4);
  insertTourLike.run(2, 1);
  insertTourLike.run(2, 3);
  insertTourLike.run(3, 2);
  insertTourLike.run(3, 5);

  // 5. Seed Picture Posts (Photo Community)
  const insertPic = db.prepare(`
    INSERT INTO picture (us_uid, pc_title, pc_contents, pc_hits, pc_location, pc_focus, pc_with, pc_write_date, pc_tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPic.run(
    4,
    "유채꽃이 물든 제주 성산의 아침 빛",
    "해가 막 떠오른 직후 성산일출봉 아래 해안 산책로를 걸으며 담은 장면입니다. 현무암 너머로 부서지는 파도와 노란 유채꽃의 대비가 오래도록 마음에 남았습니다.",
    512,
    17,
    6,
    1,
    "2026-11-02",
    "제주도,성산일출봉,필름사진,자연과함께"
  );

  insertPic.run(
    2,
    "강릉 한옥 대청마루에서 맞이한 오후의 차 한 잔",
    "소나무 그림자가 마당에 길게 드리워지는 오후, 따뜻한 호지차와 수제 약과를 곁들이며 보낸 고요한 시간이었습니다. 복잡한 일상에서 벗어나 온전히 숨을 고를 수 있었어요.",
    438,
    10,
    3,
    3,
    "2026-11-04",
    "강릉여행,한옥스테이,다도,힐링여행"
  );

  insertPic.run(
    1,
    "가을 단풍이 내려앉은 경복궁 경회루 반영",
    "바람 한 점 없던 가을 아침, 경회루 연못 수면 위로 단청과 오색 단풍이 거울처럼 비치던 순간을 기록했습니다.",
    395,
    1,
    5,
    2,
    "2026-11-06",
    "서울고궁,경복궁,경회루,가을여행"
  );

  insertPic.run(
    3,
    "광안리 해변의 노을과 카페 테라스의 온기",
    "보랏빛과 주황빛으로 물드는 부산 광안리 해변. 광안대교에 조명이 하나둘 켜질 때 해변을 따라 걷는 것만으로도 완벽한 저녁이 됩니다.",
    360,
    6,
    2,
    3,
    "2026-11-07",
    "부산여행,광안리,광안대교,선셋"
  );

  insertPic.run(
    5,
    "애월 바다 앞 숯불 흑돼지와 전복구이 한 상",
    "금강산도 식후경! 파도 소리가 들리는 창가 자리에서 굽는 제주 흑돼지 오겹살과 고소한 전복 버터구이는 제주 여행의 이유 그 자체입니다.",
    310,
    17,
    7,
    2,
    "2026-11-09",
    "제주맛집,애월흑돼지,전복구이,미식여행"
  );

  insertPic.run(
    4,
    "신라의 밤을 걷다, 경주 월정교의 황금빛 반영",
    "어둠이 내려앉은 남천 위로 월정교의 고운 조명빛이 물결치는 밤. 경주에서만 만날 수 있는 깊고 우아한 야경입니다.",
    290,
    13,
    5,
    1,
    "2026-11-10",
    "경주여행,월정교,야경명소,역사탐방"
  );

  const insertPicLib = db.prepare(`
    INSERT INTO pic_lib (pc_uid, pl_name, pl_path) VALUES (?, ?, ?)
  `);
  insertPicLib.run(1, "jeju.jpg", "/images/jeju.jpg");
  insertPicLib.run(2, "gangneung.jpg", "/images/gangneung.jpg");
  insertPicLib.run(3, "seoul.jpg", "/images/seoul.jpg");
  insertPicLib.run(4, "busan.jpg", "/images/busan.jpg");
  insertPicLib.run(5, "dining.jpg", "/images/dining.jpg");
  insertPicLib.run(6, "gyeongju.jpg", "/images/gyeongju.jpg");

  const insertPicLike = db.prepare("INSERT INTO pic_like (pc_uid, us_uid) VALUES (?, ?)");
  insertPicLike.run(1, 1);
  insertPicLike.run(1, 2);
  insertPicLike.run(1, 3);
  insertPicLike.run(1, 5);
  insertPicLike.run(2, 1);
  insertPicLike.run(2, 3);
  insertPicLike.run(2, 4);
  insertPicLike.run(3, 2);
  insertPicLike.run(3, 4);
  insertPicLike.run(4, 1);
  insertPicLike.run(4, 5);
  insertPicLike.run(5, 1);
  insertPicLike.run(5, 2);
  insertPicLike.run(6, 3);

  const insertPicCmt = db.prepare(`
    INSERT INTO pic_comment (pc_uid, us_uid, cmt_contents, cmt_date) VALUES (?, ?, ?, ?)
  `);
  insertPicCmt.run(1, 2, "색감이 정말 따뜻하네요! 몇 시쯤 촬영하신 사진인가요?", "2026-11-03");
  insertPicCmt.run(1, 4, "오전 7시경 해 뜨고 직후 산책로 초입에서 촬영했습니다 :)", "2026-11-03");
  insertPicCmt.run(2, 3, "대청마루 뷰가 예술이네요. 다음 강릉 일정에 꼭 넣어야겠습니다.", "2026-11-05");
  insertPicCmt.run(3, 5, "수면 반영이 거울처럼 깨끗하네요!", "2026-11-07");

  // 6. Seed User Logs for Admin Analytics
  const insertLog = db.prepare("INSERT INTO user_log (log_contents, log_date) VALUES (?, ?)");
  const logDates = [
    { date: "2026-11-05", count: 18 },
    { date: "2026-11-06", count: 24 },
    { date: "2026-11-07", count: 31 },
    { date: "2026-11-08", count: 29 },
    { date: "2026-11-09", count: 42 },
    { date: "2026-11-10", count: 48 },
    { date: "2026-11-11", count: 56 },
  ];
  for (const item of logDates) {
    for (let i = 0; i < item.count; i++) {
      insertLog.run("HOME_VISIT", item.date);
    }
  }
}

// ============================================================================
// Repository Queries
// ============================================================================

function toPlain<T>(val: T): T {
  if (val === null || val === undefined) return val;
  return JSON.parse(JSON.stringify(val)) as T;
}

export function recordVisitLog() {
  const db = getDb();
  const today = new Date().toISOString().slice(0, 10);
  db.prepare("INSERT INTO user_log (log_contents, log_date) VALUES ('HOME_VISIT', ?)").run(today);
}

export function getPlaces(options?: {
  contentTypeId?: number;
  keyword?: string;
  areaCode?: number;
  currentUserId?: number;
}): Place[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options?.contentTypeId) {
    conditions.push("p.contenttypeid = ?");
    params.push(options.contentTypeId);
  }
  if (options?.areaCode) {
    conditions.push("p.area_code = ?");
    params.push(options.areaCode);
  }
  if (options?.keyword && options.keyword.trim() !== "") {
    conditions.push("(p.title LIKE ? OR p.addr1 LIKE ? OR p.overview LIKE ?)");
    const kw = `%${options.keyword.trim()}%`;
    params.push(kw, kw, kw);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(
      `
      SELECT
        p.place_uid as placeUid,
        p.contentid as contentId,
        p.contenttypeid as contentTypeId,
        p.title,
        p.mapx,
        p.mapy,
        p.area_code as areaCode,
        p.sigungu_code as sigunguCode,
        p.addr1,
        p.tel,
        p.firstimage2 as firstImage2,
        p.overview,
        p.pl_viewcnt as viewCnt,
        (SELECT COUNT(*) FROM place_like pl WHERE pl.place_uid = p.place_uid) as likeCnt,
        COALESCE((SELECT ROUND(AVG(rv.rv_rate), 1) FROM review rv WHERE rv.place_uid = p.place_uid), 0) as rateAvg,
        (SELECT COUNT(*) FROM review rv WHERE rv.place_uid = p.place_uid) as reviewCnt
      FROM place p
      ${whereClause}
      ORDER BY p.pl_viewcnt DESC, p.place_uid ASC
    `
    )
    .all(...params) as unknown as Place[];

  if (options?.currentUserId) {
    const likedStmt = db.prepare(
      "SELECT 1 FROM place_like WHERE place_uid = ? AND us_uid = ?"
    );
    for (const r of rows) {
      r.likedByMe = Boolean(likedStmt.get(r.placeUid, options.currentUserId));
    }
  }

  return toPlain(rows);
}

export function getPlaceById(placeUid: number, currentUserId?: number): Place | null {
  const db = getDb();
  db.prepare("UPDATE place SET pl_viewcnt = pl_viewcnt + 1 WHERE place_uid = ?").run(placeUid);

  const row = db
    .prepare(
      `
      SELECT
        p.place_uid as placeUid,
        p.contentid as contentId,
        p.contenttypeid as contentTypeId,
        p.title,
        p.mapx,
        p.mapy,
        p.area_code as areaCode,
        p.sigungu_code as sigunguCode,
        p.addr1,
        p.tel,
        p.firstimage2 as firstImage2,
        p.overview,
        p.pl_viewcnt as viewCnt,
        (SELECT COUNT(*) FROM place_like pl WHERE pl.place_uid = p.place_uid) as likeCnt,
        COALESCE((SELECT ROUND(AVG(rv.rv_rate), 1) FROM review rv WHERE rv.place_uid = p.place_uid), 0) as rateAvg,
        (SELECT COUNT(*) FROM review rv WHERE rv.place_uid = p.place_uid) as reviewCnt
      FROM place p
      WHERE p.place_uid = ?
    `
    )
    .get(placeUid) as unknown as Place | undefined;

  if (!row) return null;

  if (currentUserId) {
    const liked = db
      .prepare("SELECT 1 FROM place_like WHERE place_uid = ? AND us_uid = ?")
      .get(placeUid, currentUserId);
    row.likedByMe = Boolean(liked);
  }

  return toPlain(row);
}

export function getReviewsByPlace(placeUid: number): Review[] {
  const db = getDb();
  const rows = db
    .prepare(
      `
      SELECT
        r.rv_uid as rvUid,
        r.place_uid as placeUid,
        r.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        r.rv_content as content,
        r.rv_rate as rate,
        r.rv_write_date as writeDate
      FROM review r
      JOIN users u ON r.us_uid = u.us_uid
      WHERE r.place_uid = ?
      ORDER BY r.rv_uid DESC
    `
    )
    .all(placeUid) as unknown as Review[];
  return toPlain(rows);
}

export function createReview(placeUid: number, usUid: number, content: string, rate: number): Review {
  const db = getDb();
  const writeDate = new Date().toISOString().slice(0, 10);
  const res = db
    .prepare(
      "INSERT INTO review (place_uid, us_uid, rv_content, rv_rate, rv_write_date) VALUES (?, ?, ?, ?, ?)"
    )
    .run(placeUid, usUid, content, rate, writeDate);

  const rvUid = Number(res.lastInsertRowid);
  const row = db
    .prepare(
      `
      SELECT
        r.rv_uid as rvUid,
        r.place_uid as placeUid,
        r.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        r.rv_content as content,
        r.rv_rate as rate,
        r.rv_write_date as writeDate
      FROM review r
      JOIN users u ON r.us_uid = u.us_uid
      WHERE r.rv_uid = ?
    `
    )
    .get(rvUid) as unknown as Review;
  return toPlain(row);
}

export function deleteReview(rvUid: number, usUid: number, isAdmin = false): boolean {
  const db = getDb();
  const res = isAdmin
    ? db.prepare("DELETE FROM review WHERE rv_uid = ?").run(rvUid)
    : db.prepare("DELETE FROM review WHERE rv_uid = ? AND us_uid = ?").run(rvUid, usUid);
  return res.changes > 0;
}

export function togglePlaceLike(placeUid: number, usUid: number): { liked: boolean; likeCnt: number } {
  const db = getDb();
  const existing = db
    .prepare("SELECT 1 FROM place_like WHERE place_uid = ? AND us_uid = ?")
    .get(placeUid, usUid);

  if (existing) {
    db.prepare("DELETE FROM place_like WHERE place_uid = ? AND us_uid = ?").run(placeUid, usUid);
  } else {
    db.prepare("INSERT INTO place_like (place_uid, us_uid) VALUES (?, ?)").run(placeUid, usUid);
  }

  const row = db
    .prepare("SELECT COUNT(*) as cnt FROM place_like WHERE place_uid = ?")
    .get(placeUid) as { cnt: number };

  return { liked: !existing, likeCnt: row.cnt };
}

export function getTours(options?: {
  location?: number;
  withWho?: number;
  focus?: number;
  keyword?: string;
  includeDeleted?: boolean;
  currentUserId?: number;
}): Tour[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (!options?.includeDeleted) {
    conditions.push("t.tu_del_ck = 0");
  }
  if (options?.location) {
    conditions.push("t.tu_location = ?");
    params.push(options.location);
  }
  if (options?.withWho) {
    conditions.push("t.tu_with = ?");
    params.push(options.withWho);
  }
  if (options?.focus) {
    conditions.push("t.tu_focus = ?");
    params.push(options.focus);
  }
  if (options?.keyword && options.keyword.trim() !== "") {
    conditions.push("(t.tu_title LIKE ? OR t.tu_summary LIKE ? OR t.tu_tags LIKE ?)");
    const kw = `%${options.keyword.trim()}%`;
    params.push(kw, kw, kw);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(
      `
      SELECT
        t.tu_uid as tuUid,
        t.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        t.tu_title as title,
        t.tu_summary as summary,
        t.tu_hits as hits,
        t.tu_period as period,
        t.tu_location as location,
        t.tu_with as withWho,
        t.tu_focus as focus,
        t.tu_del_ck as isDeleted,
        t.tu_write_date as writeDate,
        t.tu_start_tour as startDate,
        t.tu_end_tour as endDate,
        t.tu_cover_img as coverImage,
        t.tu_tags as rawTags,
        (SELECT COUNT(*) FROM tour_like tl WHERE tl.tu_uid = t.tu_uid) as likeCnt
      FROM tour t
      JOIN users u ON t.us_uid = u.us_uid
      ${whereClause}
      ORDER BY t.tu_hits DESC, t.tu_uid DESC
    `
    )
    .all(...params) as unknown as (Omit<Tour, "tags"> & { rawTags: string })[];

  const locStmt = db.prepare(`
    SELECT
      tl.tl_uid as tlUid,
      tl.tu_uid as tuUid,
      tl.place_uid as placeUid,
      tl.day_number as dayNumber,
      tl.visit_order as visitOrder,
      p.title,
      p.addr1,
      p.firstimage2 as firstImage2,
      p.contenttypeid as contentTypeId,
      p.mapx,
      p.mapy
    FROM tour_location tl
    JOIN place p ON tl.place_uid = p.place_uid
    WHERE tl.tu_uid = ?
    ORDER BY tl.day_number ASC, tl.visit_order ASC
  `);

  const likedStmt = db.prepare("SELECT 1 FROM tour_like WHERE tu_uid = ? AND us_uid = ?");

  const result = rows.map((r) => {
    const locations = locStmt.all(r.tuUid) as unknown as TourLocationItem[];
    return {
      ...r,
      tags: r.rawTags ? r.rawTags.split(",").map((s) => s.trim()).filter(Boolean) : [],
      locations,
      likedByMe: options?.currentUserId ? Boolean(likedStmt.get(r.tuUid, options.currentUserId)) : false,
    };
  });

  return toPlain(result);
}

export function getTourById(tuUid: number, currentUserId?: number): Tour | null {
  const db = getDb();
  db.prepare("UPDATE tour SET tu_hits = tu_hits + 1 WHERE tu_uid = ?").run(tuUid);

  const row = db
    .prepare(
      `
      SELECT
        t.tu_uid as tuUid,
        t.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        t.tu_title as title,
        t.tu_summary as summary,
        t.tu_hits as hits,
        t.tu_period as period,
        t.tu_location as location,
        t.tu_with as withWho,
        t.tu_focus as focus,
        t.tu_del_ck as isDeleted,
        t.tu_write_date as writeDate,
        t.tu_start_tour as startDate,
        t.tu_end_tour as endDate,
        t.tu_cover_img as coverImage,
        t.tu_tags as rawTags,
        (SELECT COUNT(*) FROM tour_like tl WHERE tl.tu_uid = t.tu_uid) as likeCnt
      FROM tour t
      JOIN users u ON t.us_uid = u.us_uid
      WHERE t.tu_uid = ?
    `
    )
    .get(tuUid) as unknown as (Omit<Tour, "tags"> & { rawTags: string }) | undefined;

  if (!row) return null;

  const locations = db
    .prepare(
      `
      SELECT
        tl.tl_uid as tlUid,
        tl.tu_uid as tuUid,
        tl.place_uid as placeUid,
        tl.day_number as dayNumber,
        tl.visit_order as visitOrder,
        p.title,
        p.addr1,
        p.firstimage2 as firstImage2,
        p.contenttypeid as contentTypeId,
        p.mapx,
        p.mapy
      FROM tour_location tl
      JOIN place p ON tl.place_uid = p.place_uid
      WHERE tl.tu_uid = ?
      ORDER BY tl.day_number ASC, tl.visit_order ASC
    `
    )
    .all(tuUid) as unknown as TourLocationItem[];

  const memos = db
    .prepare(
      `
      SELECT
        tm.tm_uid as tmUid,
        tm.tu_uid as tuUid,
        tm.memo_day as memoDay,
        tm.memo_contents as memoContents
      FROM tour_memo tm
      WHERE tm.tu_uid = ?
      ORDER BY tm.memo_day ASC, tm.tm_uid ASC
    `
    )
    .all(tuUid) as unknown as TourMemoItem[];

  const likedByMe = currentUserId
    ? Boolean(
        db.prepare("SELECT 1 FROM tour_like WHERE tu_uid = ? AND us_uid = ?").get(tuUid, currentUserId)
      )
    : false;

  return toPlain({
    ...row,
    tags: row.rawTags ? row.rawTags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    locations,
    memos,
    likedByMe,
  });
}

export function createTour(input: {
  usUid: number;
  title: string;
  summary: string;
  location: number;
  withWho: number;
  focus: number;
  startDate: string;
  endDate: string;
  coverImage?: string;
  tags?: string[];
  locations: { placeUid: number; dayNumber: number; visitOrder: number }[];
  memos: { memoDay: number; memoContents: string }[];
}): number {
  const db = getDb();
  const writeDate = new Date().toISOString().slice(0, 10);
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  let coverImg = input.coverImage || "/images/jeju.jpg";
  if (!input.coverImage && input.locations.length > 0) {
    const firstPlace = db
      .prepare("SELECT firstimage2 FROM place WHERE place_uid = ?")
      .get(input.locations[0].placeUid) as { firstimage2: string } | undefined;
    if (firstPlace?.firstimage2) {
      coverImg = firstPlace.firstimage2;
    }
  }

  const res = db
    .prepare(
      `
      INSERT INTO tour (us_uid, tu_title, tu_summary, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_write_date, tu_start_tour, tu_end_tour, tu_cover_img, tu_tags)
      VALUES (?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
    .run(
      input.usUid,
      input.title,
      input.summary,
      diffDays,
      input.location,
      input.withWho,
      input.focus,
      writeDate,
      input.startDate,
      input.endDate,
      coverImg,
      (input.tags || []).join(",")
    );

  const tuUid = Number(res.lastInsertRowid);

  const insertTL = db.prepare(
    "INSERT INTO tour_location (tu_uid, place_uid, day_number, visit_order) VALUES (?, ?, ?, ?)"
  );
  for (const loc of input.locations) {
    insertTL.run(tuUid, loc.placeUid, loc.dayNumber, loc.visitOrder);
  }

  const insertMemo = db.prepare(
    "INSERT INTO tour_memo (tu_uid, memo_day, memo_contents) VALUES (?, ?, ?)"
  );
  for (const m of input.memos) {
    if (m.memoContents.trim() !== "") {
      insertMemo.run(tuUid, m.memoDay, m.memoContents.trim());
    }
  }

  return tuUid;
}

export function toggleTourLike(tuUid: number, usUid: number): { liked: boolean; likeCnt: number } {
  const db = getDb();
  const existing = db
    .prepare("SELECT 1 FROM tour_like WHERE tu_uid = ? AND us_uid = ?")
    .get(tuUid, usUid);

  if (existing) {
    db.prepare("DELETE FROM tour_like WHERE tu_uid = ? AND us_uid = ?").run(tuUid, usUid);
  } else {
    db.prepare("INSERT INTO tour_like (tu_uid, us_uid) VALUES (?, ?)").run(tuUid, usUid);
  }

  const row = db
    .prepare("SELECT COUNT(*) as cnt FROM tour_like WHERE tu_uid = ?")
    .get(tuUid) as { cnt: number };

  return { liked: !existing, likeCnt: row.cnt };
}

export function getPictures(options?: {
  location?: number;
  withWho?: number;
  focus?: number;
  includeDeleted?: boolean;
  currentUserId?: number;
}): PicturePost[] {
  const db = getDb();
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (!options?.includeDeleted) {
    conditions.push("p.pc_del_ck = 0");
  }
  if (options?.location) {
    conditions.push("p.pc_location = ?");
    params.push(options.location);
  }
  if (options?.withWho) {
    conditions.push("p.pc_with = ?");
    params.push(options.withWho);
  }
  if (options?.focus) {
    conditions.push("p.pc_focus = ?");
    params.push(options.focus);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(
      `
      SELECT
        p.pc_uid as pcUid,
        p.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        p.pc_title as title,
        p.pc_contents as contents,
        p.pc_hits as hits,
        p.pc_location as location,
        p.pc_focus as focus,
        p.pc_with as withWho,
        p.pc_write_date as writeDate,
        p.pc_del_ck as isDeleted,
        p.pc_tags as rawTags,
        (SELECT COUNT(*) FROM pic_like pl WHERE pl.pc_uid = p.pc_uid) as likeCnt,
        (SELECT COUNT(*) FROM pic_comment pc WHERE pc.pc_uid = p.pc_uid) as commentCnt
      FROM picture p
      JOIN users u ON p.us_uid = u.us_uid
      ${whereClause}
      ORDER BY p.pc_hits DESC, p.pc_uid DESC
    `
    )
    .all(...params) as unknown as (Omit<PicturePost, "images" | "tags"> & { rawTags: string })[];

  const imgStmt = db.prepare("SELECT pl_path FROM pic_lib WHERE pc_uid = ? ORDER BY pl_uid ASC");
  const cmtStmt = db.prepare(`
    SELECT
      c.cmt_uid as cmtUid,
      c.pc_uid as pcUid,
      c.us_uid as usUid,
      u.us_nickname as nickname,
      u.us_pic as profilePic,
      c.cmt_contents as contents,
      c.cmt_date as writeDate
    FROM pic_comment c
    JOIN users u ON c.us_uid = u.us_uid
    WHERE c.pc_uid = ?
    ORDER BY c.cmt_uid ASC
  `);
  const likedStmt = db.prepare("SELECT 1 FROM pic_like WHERE pc_uid = ? AND us_uid = ?");

  const result = rows.map((r) => {
    const imgs = (imgStmt.all(r.pcUid) as { pl_path: string }[]).map((x) => x.pl_path);
    const comments = cmtStmt.all(r.pcUid) as unknown as PicComment[];
    return {
      ...r,
      images: imgs.length > 0 ? imgs : ["/images/jeju.jpg"],
      tags: r.rawTags ? r.rawTags.split(",").map((s) => s.trim()).filter(Boolean) : [],
      comments,
      likedByMe: options?.currentUserId ? Boolean(likedStmt.get(r.pcUid, options.currentUserId)) : false,
    };
  });

  return toPlain(result);
}

export function createPicturePost(input: {
  usUid: number;
  title: string;
  contents: string;
  location: number;
  withWho: number;
  focus: number;
  imageUrl: string;
  tags: string[];
}): number {
  const db = getDb();
  const writeDate = new Date().toISOString().slice(0, 10);
  const res = db
    .prepare(
      `
      INSERT INTO picture (us_uid, pc_title, pc_contents, pc_hits, pc_location, pc_focus, pc_with, pc_write_date, pc_tags)
      VALUES (?, ?, ?, 0, ?, ?, ?, ?, ?)
    `
    )
    .run(
      input.usUid,
      input.title,
      input.contents,
      input.location,
      input.focus,
      input.withWho,
      writeDate,
      input.tags.join(",")
    );

  const pcUid = Number(res.lastInsertRowid);
  const imgPath = input.imageUrl.trim() || "/images/jeju.jpg";
  db.prepare("INSERT INTO pic_lib (pc_uid, pl_name, pl_path) VALUES (?, ?, ?)").run(
    pcUid,
    path.basename(imgPath),
    imgPath
  );

  return pcUid;
}

export function togglePictureLike(pcUid: number, usUid: number): { liked: boolean; likeCnt: number } {
  const db = getDb();
  const existing = db
    .prepare("SELECT 1 FROM pic_like WHERE pc_uid = ? AND us_uid = ?")
    .get(pcUid, usUid);

  if (existing) {
    db.prepare("DELETE FROM pic_like WHERE pc_uid = ? AND us_uid = ?").run(pcUid, usUid);
  } else {
    db.prepare("INSERT INTO pic_like (pc_uid, us_uid) VALUES (?, ?)").run(pcUid, usUid);
  }

  const row = db
    .prepare("SELECT COUNT(*) as cnt FROM pic_like WHERE pc_uid = ?")
    .get(pcUid) as { cnt: number };

  return { liked: !existing, likeCnt: row.cnt };
}

export function addPictureComment(pcUid: number, usUid: number, contents: string): PicComment {
  const db = getDb();
  const cmtDate = new Date().toISOString().slice(0, 10);
  const res = db
    .prepare("INSERT INTO pic_comment (pc_uid, us_uid, cmt_contents, cmt_date) VALUES (?, ?, ?, ?)")
    .run(pcUid, usUid, contents, cmtDate);

  const cmtUid = Number(res.lastInsertRowid);
  const row = db
    .prepare(
      `
      SELECT
        c.cmt_uid as cmtUid,
        c.pc_uid as pcUid,
        c.us_uid as usUid,
        u.us_nickname as nickname,
        u.us_pic as profilePic,
        c.cmt_contents as contents,
        c.cmt_date as writeDate
      FROM pic_comment c
      JOIN users u ON c.us_uid = u.us_uid
      WHERE c.cmt_uid = ?
    `
    )
    .get(cmtUid) as unknown as PicComment;
  return toPlain(row);
}

export function getUserByCredentials(userId: string, pw: string): User | null {
  const db = getDb();
  const row = db
    .prepare(
      `
      SELECT
        us_uid as usUid,
        us_id as userId,
        us_email as email,
        us_nickname as nickname,
        us_gender as gender,
        us_birth as birth,
        us_memo as memo,
        us_join_date as joinDate,
        us_pic as profilePic,
        us_exit_ck as isDeleted,
        us_role as role
      FROM users
      WHERE us_id = ? AND us_pw = ? AND us_exit_ck = 0
    `
    )
    .get(userId, pw) as unknown as User | undefined;

  return row ? toPlain(row) : null;
}

export function getUserById(usUid: number): User | null {
  const db = getDb();
  const row = db
    .prepare(
      `
      SELECT
        us_uid as usUid,
        us_id as userId,
        us_email as email,
        us_nickname as nickname,
        us_gender as gender,
        us_birth as birth,
        us_memo as memo,
        us_join_date as joinDate,
        us_pic as profilePic,
        us_exit_ck as isDeleted,
        us_role as role
      FROM users
      WHERE us_uid = ?
    `
    )
    .get(usUid) as unknown as User | undefined;

  return row ? toPlain(row) : null;
}

export function registerUser(input: {
  userId: string;
  password: string;
  email: string;
  nickname: string;
  gender?: number;
  birth?: string;
  memo?: string;
}): User {
  const db = getDb();
  const joinDate = new Date().toISOString().slice(0, 10);
  const res = db
    .prepare(
      `
      INSERT INTO users (us_id, us_pw, us_email, us_nickname, us_gender, us_birth, us_memo, us_join_date, us_pic, us_role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, '/images/seoul.jpg', 'USER')
    `
    )
    .run(
      input.userId,
      input.password,
      input.email,
      input.nickname,
      input.gender ?? 0,
      input.birth || null,
      input.memo || "오늘의여행과 함께 새로운 여행을 기록합니다.",
      joinDate
    );

  return getUserById(Number(res.lastInsertRowid))!;
}

export function updateUserProfile(
  usUid: number,
  input: { nickname: string; email: string; memo: string; profilePic?: string }
): User | null {
  const db = getDb();
  if (input.profilePic) {
    db.prepare(
      "UPDATE users SET us_nickname = ?, us_email = ?, us_memo = ?, us_pic = ? WHERE us_uid = ?"
    ).run(input.nickname, input.email, input.memo, input.profilePic, usUid);
  } else {
    db.prepare("UPDATE users SET us_nickname = ?, us_email = ?, us_memo = ? WHERE us_uid = ?").run(
      input.nickname,
      input.email,
      input.memo,
      usUid
    );
  }
  return getUserById(usUid);
}

export function getAdminDashboardData(): AdminDashboardData {
  const db = getDb();
  const totalUsers = (db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number }).c;
  const totalPlaces = (db.prepare("SELECT COUNT(*) as c FROM place").get() as { c: number }).c;
  const totalTours = (db.prepare("SELECT COUNT(*) as c FROM tour").get() as { c: number }).c;
  const totalPictures = (db.prepare("SELECT COUNT(*) as c FROM picture").get() as { c: number }).c;
  const totalReviews = (db.prepare("SELECT COUNT(*) as c FROM review").get() as { c: number }).c;

  const dailyLogs = db
    .prepare(
      `
      SELECT log_date as date, COUNT(*) as count
      FROM user_log
      GROUP BY log_date
      ORDER BY log_date DESC
      LIMIT 7
    `
    )
    .all() as { date: string; count: number }[];

  const users = db
    .prepare(
      `
      SELECT
        us_uid as usUid,
        us_id as userId,
        us_email as email,
        us_nickname as nickname,
        us_gender as gender,
        us_birth as birth,
        us_memo as memo,
        us_join_date as joinDate,
        us_pic as profilePic,
        us_exit_ck as isDeleted,
        us_role as role
      FROM users
      ORDER BY us_uid ASC
    `
    )
    .all() as unknown as User[];

  return toPlain({
    totalUsers,
    totalPlaces,
    totalTours,
    totalPictures,
    totalReviews,
    dailyLogs: dailyLogs.reverse(),
    topPlaces: getPlaces().slice(0, 5),
    recentTours: getTours({ includeDeleted: true }).slice(0, 6),
    users,
  });
}

export function adminTogglePostStatus(type: "tour" | "picture", uid: number, isDeleted: number) {
  const db = getDb();
  if (type === "tour") {
    db.prepare("UPDATE tour SET tu_del_ck = ? WHERE tu_uid = ?").run(isDeleted, uid);
  } else {
    db.prepare("UPDATE picture SET pc_del_ck = ? WHERE pc_uid = ?").run(isDeleted, uid);
  }
}

export function adminUpdateUserRole(usUid: number, role: "USER" | "ADMIN") {
  const db = getDb();
  db.prepare("UPDATE users SET us_role = ? WHERE us_uid = ?").run(role, usUid);
}
