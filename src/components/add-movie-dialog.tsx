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

export const AddMovieDialog = () => {
  const [open, setOpen] = useState(false);

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
                - logika na wysyłanie danych na backend
                - wizualny formularz
                - [optional] walidacja
            */}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
