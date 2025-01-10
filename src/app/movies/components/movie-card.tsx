"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Movie } from "@/types/movie";

export const MovieCard = ({
  title,
  imgUrl,
  description,
  movieId,
}: {
  title: string;
  imgUrl?: string;
  description: string;
  movieId: string;
}) => {
  const [averageRating, setAverageRating] = useState<number>();
  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  const getRatings = async () => {
    const fetchedMovies = await axios
      .get<Movie[]>(`/api/reviews?movieId=${movieId}`)
      .then((data) => data.data.reviews);
    const ratings = fetchedMovies.map((movie) => {
      return movie.rating;
    });
    const averageRating = average(ratings);
    setAverageRating(averageRating);
  };

  useEffect(() => {
    getRatings();
  });

  return (
    <Link href={`/ratings?movieId=${movieId}`}>
      <div className="max-w-lg rounded-md bg-[#f4f5f7] px-4 py-2 grid grid-cols-3 gap-x-4 hover:border hover:border-black hover:opacity-80">
        <div>
          <img
            src={imgUrl}
            alt="movieCover"
            className="size-40 aspect-square"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p>{description}</p>
          <p>{averageRating}</p>
        </div>
      </div>
    </Link>
  );
};
