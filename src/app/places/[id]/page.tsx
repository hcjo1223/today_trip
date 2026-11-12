import React from "react";
import { notFound } from "next/navigation";
import { getPlaceById, getReviewsByPlace } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import PlaceDetailClient from "@/components/PlaceDetailClient";

export const dynamic = "force-dynamic";

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const placeUid = Number(id);
  const user = await getCurrentUser();
  const place = getPlaceById(placeUid, user?.usUid ?? 1);

  if (!place) {
    notFound();
  }

  const reviews = getReviewsByPlace(placeUid);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PlaceDetailClient
        initialPlace={place}
        initialReviews={reviews}
        currentUser={user}
      />
    </div>
  );
}
