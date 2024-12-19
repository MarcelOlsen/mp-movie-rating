"use client";

import { useEffect, useState } from "react";

import { Review } from "@/types/review";

import { ReviewCard } from "./components/review-card";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const response = await fetch("/api/movie/review");
    const data = await response.json();
    setReviews(data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      {reviews.map((review, idx) => (
        <ReviewCard review={review} key={idx} />
      ))}
    </>
  );
}
