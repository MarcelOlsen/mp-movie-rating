import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url!);
  const movieId = searchParams.get("id");

  if (!movieId) {
    const movies = await prisma.movie.findMany({}).catch((error) => {
      console.error(error);
    });
    return NextResponse.json({ movies }, { status: 200 });
  }

  const movie = await prisma.movie
    .findUnique({
      where: {
        id: parseInt(movieId),
      },
    })
    .catch((error) => {
      console.error(error);
    });

  return NextResponse.json({ movie }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const newMovie = await prisma.movie
    .create({
      data: {
        title: body.title,
        imgUrl: body.imgUrl ? body.imgUrl : "",
      },
    })
    .catch((error) => {
      console.error(error);
    });

  return NextResponse.json({ newMovie }, { status: 200 });
};
