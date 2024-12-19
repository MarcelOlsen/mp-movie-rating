"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface NavbarLinkProps {
  title: string;
  href: string;
}

export const NavbarLink = ({ title, href }: NavbarLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={twMerge(
          "hover:text-gray-500",
          isActive && "font-semibold hover:text-black",
        )}
      >
        {title}
      </span>
    </Link>
  );
};
