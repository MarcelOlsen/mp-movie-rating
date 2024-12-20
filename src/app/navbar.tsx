import Image from "next/image";
import Link from "next/link";
import { NavbarLink } from "./navbar-link";

export const Navbar = () => {
  return (
    <nav className="w-screen fixed top-0 left-0 h-16 flex items-center justify-between px-6 py-6 border border-b-black bg-white z-20">
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={120} height={36} />
        </Link>
      </div>
      <div className="flex gap-x-4">
        <NavbarLink title="Review" href="/reviews" />
        <NavbarLink title="Movies" href="/movies" />
      </div>
    </nav>
  );
};
