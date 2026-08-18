import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
export default function CtaSection() {
  return (
    <section className="bg-[#f6e8c8]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
        <div>
          <p className="text-2xl font-black tracking-tight text-[#251b2b]">
            Good things are waiting.
          </p>
          <p className="mt-2 text-sm text-[#756875]">
            Take a slower look around. You might find your new favourite.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-3 rounded-xl bg-[#251b2b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#b91c4a]"
        >
          Start exploring <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
