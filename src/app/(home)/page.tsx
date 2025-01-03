"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Review } from "@/types/review";

import { ReviewCard } from "./components/review-card";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    const response = await axios
      .get<Review[]>("/api/reviews")
      .catch((error) => {
        console.log(error);
      });

    setReviews(response.data.reviews);
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
