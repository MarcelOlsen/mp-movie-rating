import { z } from "zod"

export const reviewSchema = z.object({
  movieId: z.string().min(1, "This field is required"),
  title: z.string().min(1, "This field is required"),
  content: z.string().min(1, "This field is required"),
  rating: z.number().min(1, "This field is required")
})

export type Review = z.infer<typeof reviewSchema>
