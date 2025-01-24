"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { Review } from "@/types/review";

import { AddReviewDialog } from "@/components/add-reveiw-dialog";
import { ReviewCard } from "../../components/review-card";

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
      <AddReviewDialog />
      {reviews.map((review, idx) => (
        <ReviewCard review={review} key={idx} />
      ))}
    </>
  );
}
