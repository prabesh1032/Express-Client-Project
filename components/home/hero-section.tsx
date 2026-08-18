import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiShield,
  FiTruck,
} from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative bg-[#f8e8ec]">
      <div className="absolute -right-32 -top-44 h-[32rem] w-[32rem] rounded-full bg-[#e7c2cc]/60" />
      <div className="absolute -bottom-36 left-[42%] h-72 w-72 rounded-full border-[30px] border-white/40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e4b5c2] bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9c3155]">
            <span className="h-2 w-2 rounded-full bg-[#b91c4a]" />
            Rooted in Nepal
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.03] tracking-tight text-[#251b2b] sm:text-6xl lg:text-7xl">
            Small joys, <span className="text-[#b91c4a]">beautifully</span>{" "}
            made.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#756875] sm:text-lg">
            Discover thoughtful products made by Nepal&apos;s finest makers.
            Every purchase carries a story, a skill, and a little piece of home.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 rounded-xl bg-[#b91c4a] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-[#b91c4a]/20 transition hover:-translate-y-0.5 hover:bg-[#8f153a]"
            >
              Explore the collection <FiArrowRight size={18} />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm font-bold text-[#7f153d] hover:text-[#b91c4a]"
            >
              Our story <FiArrowUpRight size={17} />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-7 text-sm text-[#756875]">
            <span className="flex items-center gap-2">
              <FiTruck className="text-[#b91c4a]" />
              Nationwide delivery
            </span>
            <span className="flex items-center gap-2">
              <FiShield className="text-[#b91c4a]" />
              Made with care
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="relative aspect-[0.88] overflow-hidden rounded-[2rem] bg-[#7f153d] shadow-2xl shadow-[#7f153d]/20">
            <Image
              src="/ecommerce/e-commerce - Copy.png"
              alt="A beautiful local collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7f153d] via-[#7f153d]/10 to-black/5" />
            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/30 bg-[#7f153d]/45 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  Curated locally
                </span>
                <button
                  aria-label="Add collection to wishlist"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#b91c4a] shadow-lg transition hover:scale-105"
                >
                  <FiHeart size={19} />
                </button>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                    Featured collection
                  </p>
                  <p className="text-2xl font-black leading-tight text-white sm:text-3xl">
                    Style made personal
                  </p>
                </div>
                <Image
                  src="/logo.png"
                  alt="Nepali Store"
                  width={68}
                  height={68}
                  className="h-14 w-14 shrink-0 rounded-full bg-white/90 object-contain p-1.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
