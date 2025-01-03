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

  console.log({
    title: body.title,
    imgUrl: body.imgUrl ? body.imgUrl : "",
    description: body.description,
  });

  const newMovie = await prisma.movie
    .create({
      data: {
        title: body.title,
        imgUrl: body.imgUrl ? body.imgUrl : "",
        description: body.description,
      },
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log("Error: ", error.stack);
      }
    });

  return NextResponse.json({ newMovie }, { status: 200 });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url!);
  const movieId = searchParams.get("id");

  if (!movieId) {
    return NextResponse.json(
      { message: "Provide movie id to delete." },
      { status: 400 },
    );
  }

  const deletedMovie = await prisma.movie
    .delete({
      where: {
        id: parseInt(movieId),
      },
    })
    .catch((error) => {
      return NextResponse.json(
        { message: "Failed to delete movie", error },
        { status: 500 },
      );
    });

  return NextResponse.json(
    { message: "Movie deleted successfully", deletedMovie },
    { status: 200 },
  );
};
