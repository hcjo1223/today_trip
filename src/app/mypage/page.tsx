import React from "react";
import { getCurrentUser } from "@/lib/auth";
import {
  getAdminDashboardData,
  getPictures,
  getPlaces,
  getTours,
} from "@/lib/db";
import MyPageClient from "@/components/MyPageClient";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const sessionUser = await getCurrentUser();
  const allUsers = getAdminDashboardData().users;
  const user = sessionUser || allUsers[0];

  const myTours = getTours({ currentUserId: user.usUid }).filter(
    (t) => t.usUid === user.usUid
  );
  const myPictures = getPictures({ currentUserId: user.usUid }).filter(
    (p) => p.usUid === user.usUid
  );
  const likedPlaces = getPlaces({ currentUserId: user.usUid }).filter(
    (pl) => pl.likedByMe
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MyPageClient
        user={user}
        myTours={myTours}
        myPictures={myPictures}
        likedPlaces={likedPlaces}
      />
    </div>
  );
}
