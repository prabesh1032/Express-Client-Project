"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/common/brand-logo";

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up")
  ) return null;
  return (
    <footer className="border-t border-[#eadfe2] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <BrandLogo className="mb-4" imageClassName="h-12 w-12" />
          <p className="max-w-xs text-sm leading-6 text-[#756875]">
            A thoughtful marketplace for products, people, and stories from
            Nepal.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black text-[#251b2b]">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-[#756875]">
            <Link href="/products" className="hover:text-[#b91c4a]">
              All products
            </Link>
            <Link href="/about-us" className="hover:text-[#b91c4a]">
              About us
            </Link>
            <Link href="/contact-us" className="hover:text-[#b91c4a]">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black text-[#251b2b]">
            Customer care
          </h3>
          <div className="flex flex-col gap-3 text-sm text-[#756875]">
            <span>Shipping & delivery</span>
            <span>Returns & exchange</span>
            <span>Help centre</span>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black text-[#251b2b]">
            Stay in the loop
          </h3>
          <p className="mb-3 text-sm leading-6 text-[#756875]">
            Get updates on new local finds.
          </p>
          <div className="flex overflow-hidden rounded-xl border border-[#eadfe2]">
            <input
              aria-label="Email address"
              placeholder="Your email"
              className="min-w-0 flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[#b91c4a] px-3 text-xs font-bold text-white">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-[#f0e7e5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#9a8e98] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Nepali Store. Made with care.</span>
          <span>Shop local. Live beautifully.</span>
        </div>
      </div>
    </footer>
  );
}
