import { Review } from "@/types/review";
import { readReviews, writeReviews } from "@/utils/jsonDB";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url!);
  const movieId = searchParams.get("id");

  if (!movieId) {
    const reviews = await readReviews();

    return NextResponse.json({ reviews }, { status: 200 });
  }

  const reviews = (await readReviews()).filter(
    (review) => review.movieId.toString() == movieId,
  );

  return NextResponse.json({ reviews }, { status: 200 });
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const reviews = await readReviews();

  const newReview: Review = {
    id: body.id,
    movieId: body.movieId,
    title: body.title,
    content: body.content,
    rating: body.rating,
  };

  reviews.push(newReview);
  await writeReviews(reviews);

  return NextResponse.json({ newReview }, { status: 200 });
};
