"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Movie } from "@/types/movie";
import { MovieCard } from "./components/movie-card";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    const fetchedMovies = await axios
      .get<Movie>("/api/movies")
      .catch((error) => {
        console.error(error);
      });

    setMovies(fetchedMovies.data.movies);
    console.log(movies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      {movies.map((movie, idx) => (
        <MovieCard
          key={idx}
          title={movie.title}
          description={movie.description}
          movieId={movie.id}
        />
      ))}
    </div>
  );
};

export default MoviesPage;
