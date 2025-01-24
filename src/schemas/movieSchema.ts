import { z } from "zod"

export const movieSchema = z.object({
  id: z.string().min(1, "This field is required"),
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  imgUrl: z.string().optional(),
})

export type Movie = z.infer<typeof movieSchema>
