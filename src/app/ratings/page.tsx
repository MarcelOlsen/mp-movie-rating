"use client";

import { Review } from "@/types/review";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ReviewCard } from "@/components/review-card";
import React from "react";

const RatingsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const fetchReviewsByMovieId = async () => {
    const fetchedReviews = await axios
      .get(`/api/reviews?movieId=${movieId}`)
      .catch((error) => {
        console.error(error);
      });

    setReviews(fetchedReviews.data.reviews);
  };

  useEffect(() => {
    fetchReviewsByMovieId();
  }, []);

  return (
    <>
      {reviews.map((review) => {
        return <ReviewCard key={review.id} review={review} />;
      })}
    </>
  );
};

export default RatingsPage;
