"use client";

import ReactStars from "react-stars";

import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="w-[450px] bg-[#f4f5f7] border rounded-md px-4 py-2">
      <p className="text-xl font-bold truncate w-full">{review.title}</p>
      <p className="mt-2 w-full">{review.content}</p>
      <ReactStars
        count={5}
        size={24}
        value={review.rating}
        edit={false}
        color1={"#D3D3D3"}
        color2={"#FFD700"}
        className="mt-4"
      />
    </div>
  );
};
