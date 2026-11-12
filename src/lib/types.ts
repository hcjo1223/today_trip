export type UserRole = "USER" | "ADMIN";

export interface User {
  usUid: number;
  userId: string;
  email: string;
  nickname: string;
  gender: number; // 0: 미지정, 1: 남성, 2: 여성
  birth: string | null;
  memo: string | null;
  joinDate: string;
  profilePic: string;
  isDeleted: number; // 0: 정상, 1: 탈퇴
  role: UserRole;
}

export interface Place {
  placeUid: number;
  contentId: number;
  contentTypeId: number; // 12: 관광지, 32: 숙박, 39: 음식점
  title: string;
  mapx: number;
  mapy: number;
  areaCode: number;
  sigunguCode: number;
  addr1: string;
  tel: string;
  firstImage2: string;
  overview: string;
  viewCnt: number;
  likeCnt: number;
  rateAvg: number;
  reviewCnt: number;
  likedByMe?: boolean;
}

export interface Review {
  rvUid: number;
  placeUid: number;
  usUid: number;
  nickname: string;
  profilePic: string;
  content: string;
  rate: number;
  writeDate: string;
}

export interface TourLocationItem {
  tlUid?: number;
  tuUid: number;
  placeUid: number;
  dayNumber: number;
  visitOrder: number;
  title?: string;
  addr1?: string;
  firstImage2?: string;
  contentTypeId?: number;
  mapx?: number;
  mapy?: number;
}

export interface TourMemoItem {
  tmUid?: number;
  tuUid: number;
  memoDay: number;
  memoContents: string;
}

export interface Tour {
  tuUid: number;
  usUid: number;
  nickname: string;
  profilePic: string;
  title: string;
  summary: string;
  hits: number;
  period: number;
  location: number;
  withWho: number;
  focus: number;
  isDeleted: number;
  writeDate: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  tags: string[];
  likeCnt: number;
  likedByMe?: boolean;
  locations?: TourLocationItem[];
  memos?: TourMemoItem[];
}

export interface PicComment {
  cmtUid: number;
  pcUid: number;
  usUid: number;
  nickname: string;
  profilePic: string;
  contents: string;
  writeDate: string;
}

export interface PicturePost {
  pcUid: number;
  usUid: number;
  nickname: string;
  profilePic: string;
  title: string;
  contents: string;
  hits: number;
  location: number;
  focus: number;
  withWho: number;
  writeDate: string;
  isDeleted: number;
  images: string[];
  tags: string[];
  likeCnt: number;
  commentCnt: number;
  likedByMe?: boolean;
  comments?: PicComment[];
}

export interface AdminDashboardData {
  totalUsers: number;
  totalPlaces: number;
  totalTours: number;
  totalPictures: number;
  totalReviews: number;
  dailyLogs: { date: string; count: number }[];
  topPlaces: Place[];
  recentTours: Tour[];
  users: User[];
}
