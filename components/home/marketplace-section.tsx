import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
export default function MarketplaceSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="grid overflow-hidden rounded-[2rem] bg-[#7f153d] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-72 overflow-hidden p-8 sm:p-12">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[26px] border-[#d9a441]/30" />
          <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-[#b91c4a]" />
          <div className="relative flex h-full items-center justify-center">
            <span className="text-[9rem] drop-shadow-2xl">ðŸ§µ</span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#f5d58a]">
            More than a marketplace
          </p>
          <h2 className="max-w-lg text-3xl font-black leading-tight sm:text-4xl">
            Every purchase helps a local story continue.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
            We bring together independent makers, family workshops, and creative
            minds from across Nepal. Find something meaningful, and help keep
            their craft alive.
          </p>
          <Link
            href="/about-us"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#7f153d] transition hover:bg-[#f5d58a]"
          >
            Meet the makers <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
