"use client"

import { reviewSchema } from "@/schemas/reviewSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Review } from "@prisma/client"
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const AddReviewDialog = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
  })
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    //TODO: implement posting review
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-emerald-600">Add Review</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
        <DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none   data-[state=open]:animate-contentShow">
          <DialogTitle className="text-xl font-semibold mb-2">
            Add Review
          </DialogTitle>
          <Separator
            orientation="horizontal"
            className=" bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px mb-4"
          />
          {/* TODO: formularz na dodawanie filmu:
                - api endpoint na dodawanie filmu [done]
                - wizualny formularz [done]
                - logika na wysyłanie danych na backend [in progress]
                - [optional] walidacja
            */}
          <form
            className="size-full flex items-center justify-center flex-col gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-start w-full">
              <label htmlFor="title" className="text-sm text-gray-800">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="border rounded-md border-black px-2 py-1"
                placeholder="Review title..."
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="content" className="text-sm text-gray-800">
                Content
              </label>
              <p className="text-red-600 text-sm">{errors.content?.message}</p>
              <textarea
                {...register("content")}
                className={`border rounded-md border-black min-h-[200px] w-full px-2 py-1 ${errors.content ? "border-red-600" : ""} focus:ring-0`}
                placeholder="Review content..."
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="rating" className="text-sm text-gray-800">
                Rating
              </label>
              <input
                type="number"
                {...register("rating")}
                className="border rounded-md border-black w-full px-2 py-1"
                placeholder="Review rating..."
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="movieId" className="text-sm text-gray-800">
                Movie id
              </label>
              <input
                type="number"
                {...register("movieId")}
                className="border rounded-md border-black  w-full px-2 py-1"
                placeholder="Movie ID..."
              />
            </div>
            <button type="submit">submit</button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
