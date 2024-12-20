"use client";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type ReviewFormValues = {
  title: string;
  content: string;
  rating: number;
  movieId: number;
};

const ReviewPage = () => {
  const { register, handleSubmit } = useForm<ReviewFormValues>();
  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    await axios
      .post("/api/reviews", {
        movieId: parseInt(data.movieId.toString()),
        title: data.title,
        content: data.content,
        rating: parseInt(data.rating.toString()),
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-[400px]">
      <h1 className="text-2xl font-semibold">Review Page</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 items-center justify-center w-full"
      >
        <div className="flex flex-col items-start w-full">
          <label htmlFor="rating" className="text-sm text-gray-800">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="border rounded-md border-black px-2 py-1"
            placeholder="Title your review..."
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="content" className="text-sm text-gray-800">
            Content
          </label>
          <textarea
            {...register("content")}
            className="border rounded-md border-black min-h-[200px] w-full px-2 py-1"
            placeholder="Tell us more..."
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="rating" className="text-sm text-gray-800">
            Rating
          </label>
          <input
            type="text"
            {...register("rating")}
            className="border rounded-md border-black px-2 py-1"
            placeholder="Leave a rating..."
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="rating" className="text-sm text-gray-800">
            Movie ID
          </label>
          <input
            type="text"
            {...register("movieId")}
            className="border rounded-md border-black px-2 py-1"
            placeholder="Choose movie ID..."
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="border border-black rounded-md py-2 w-[150px] hover:border-gray-400 hover:text-gray-400"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPage;
