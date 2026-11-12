import React from "react";
import { notFound } from "next/navigation";
import { getTourById } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import TourDetailClient from "@/components/TourDetailClient";

export const dynamic = "force-dynamic";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tuUid = Number(id);
  const user = await getCurrentUser();
  const tour = getTourById(tuUid, user?.usUid ?? 1);

  if (!tour) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TourDetailClient initialTour={tour} />
    </div>
  );
}
