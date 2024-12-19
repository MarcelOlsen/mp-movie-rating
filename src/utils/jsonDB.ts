import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { promises as fs } from "fs";
import path from "path";

const moviesPath = path.join(process.cwd(), "data", "movies.json");
const reviewsPath = path.join(process.cwd(), "data", "reviews.json");

const ensureDbExists = async () => {
  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });

    try {
      await fs.access(moviesPath);
      await fs.access(reviewsPath);
    } catch {
      await fs.writeFile(moviesPath, JSON.stringify([]));
      await fs.writeFile(reviewsPath, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
    throw error;
  }
};

export const readMovies = async (): Promise<Movie[]> => {
  await ensureDbExists();
  const data = await fs.readFile(moviesPath, "utf-8");

  return JSON.parse(data);
};

export const readReviews = async (): Promise<Review[]> => {
  await ensureDbExists();
  const data = await fs.readFile(reviewsPath, "utf-8");

  return JSON.parse(data);
};

export const writeMovies = async (movies: Movie[]): Promise<void> => {
  await ensureDbExists();
  await fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));
};

export const writeReviews = async (reviews: Review[]): Promise<void> => {
  await ensureDbExists();
  await fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2));
};
