import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url!);
  const movieId = searchParams.get("id");

  if (!movieId) {
    const reviews = await prisma.review.findMany({});

    return NextResponse.json({ reviews }, { status: 200 });
  }

  const reviews = await prisma.review.findMany({
    where: {
      id: parseInt(movieId),
    },
  });

  return NextResponse.json({ reviews }, { status: 200 });
};

export const POST = async (req: Request) => {
  const body = await req.json();

  console.log(body);

  const newReview = await prisma.review.create({
    data: {
      movieId: parseInt(body.movieId),
      title: body.title,
      content: body.content,
      rating: body.rating,
    },
  });

  return NextResponse.json({ newReview }, { status: 200 });
};
