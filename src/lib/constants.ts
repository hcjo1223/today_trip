export const REGIONS: Record<number, string> = {
  1: "서울",
  2: "인천",
  3: "대전",
  4: "대구",
  5: "광주",
  6: "부산",
  7: "울산",
  8: "세종",
  9: "경기도",
  10: "강원도",
  11: "충청북도",
  12: "충청남도",
  13: "경상북도",
  14: "경상남도",
  15: "전라북도",
  16: "전라남도",
  17: "제주도",
};

export const COMPANIONS: Record<number, string> = {
  1: "혼자",
  2: "친구와",
  3: "연인과",
  4: "배우자·가족",
  5: "아이들과",
  6: "부모님과",
  7: "반려동물과",
};

export const TRAVEL_STYLES: Record<number, string> = {
  1: "유명 관광지는 필수",
  2: "SNS 핫플레이스",
  3: "여유롭게 힐링",
  4: "체험·액티비티",
  5: "문화·예술·역사 탐방",
  6: "자연과 함께",
  7: "관광보다 먹방",
};

export const PLACE_CONTENT_TYPES: Record<number, { label: string; badge: string }> = {
  12: { label: "관광지", badge: "명소·관광" },
  32: { label: "숙박", badge: "스테이·숙소" },
  39: { label: "음식점", badge: "미식·맛집" },
};
