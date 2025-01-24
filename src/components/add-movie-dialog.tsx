"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface AddMovieFormValues {
  title: string;
  description: string;
}

export const AddMovieDialog = () => {
  const { register, handleSubmit } = useForm<AddMovieFormValues>();
  const [imageBase64, setImageBase64] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<AddMovieFormValues> = async (data) => {
    const processedData = {
      title: data.title,
      description: data.description,
      imgUrl: imageBase64,
    };

    await axios
      .post("/api/movies", processedData)
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        console.log(response);
      });
  };

  const onFileChange = async (file: File | null) => {
    const fileBuffer = await file?.arrayBuffer();
    if (!fileBuffer) {
      console.error("Failed to get array buffer from file");
      return;
    }
    setImageBase64(arrayBufferToBase64(fileBuffer));
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-emerald-600">Add Movie</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
        <DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none   data-[state=open]:animate-contentShow">
          <DialogTitle className="text-xl font-semibold mb-2">
            Add Movie
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
                placeholder="Movie title..."
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="description" className="text-sm text-gray-800">
                Description
              </label>
              <textarea
                {...register("description")}
                className="border rounded-md border-black min-h-[200px] w-full px-2 py-1"
                placeholder="Movie description..."
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="imgUrl" className="text-sm text-gray-800">
                Movie cover image
              </label>
              <input
                type="file"
                className="w-full px-2 py-1"
                placeholder="Movie cover image..."
                accept="image/png, image/jpeg"
                onChange={(event) => onFileChange(event.target.files![0])}
              />
            </div>
            <button type="submit">submit</button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
