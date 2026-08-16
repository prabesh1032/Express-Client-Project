"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import BrandLogo from "@/components/common/brand-logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/login") || pathname.startsWith("/sign-up") || pathname.startsWith("/admin"))
    return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfe2]/80 bg-[#fffaf5]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <div onClick={() => setOpen(false)}><BrandLogo imageClassName="h-14 w-14" /></div>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition ${pathname === link.href ? "text-[#b91c4a]" : "text-[#756875] hover:text-[#b91c4a]"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-[#443442]">
          <button
            aria-label="Search"
            className="hidden rounded-full p-2.5 transition hover:bg-[#f7e8ed] hover:text-[#b91c4a] sm:block"
          >
            <FiSearch size={19} />
          </button>
          <Link
            href="/login"
            aria-label="Account"
            className="rounded-full p-2.5 transition hover:bg-[#f7e8ed] hover:text-[#b91c4a]"
          >
            <FiUser size={19} />
          </Link>
          <button
            aria-label="Wishlist"
            className="hidden rounded-full p-2.5 transition hover:bg-[#f7e8ed] hover:text-[#b91c4a] sm:block"
          >
            <FiHeart size={19} />
          </button>
          <button
            aria-label="Shopping bag"
            className="relative rounded-full p-2.5 transition hover:bg-[#f7e8ed] hover:text-[#b91c4a]"
          >
            <FiShoppingBag size={19} />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b91c4a] px-1 text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="ml-1 rounded-full p-2.5 hover:bg-[#f7e8ed] md:hidden"
          >
            {open ? <FiX size={21} /> : <FiMenu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[#eadfe2] bg-white px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${pathname === link.href ? "bg-[#f7e8ed] text-[#b91c4a]" : "text-[#756875]"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
