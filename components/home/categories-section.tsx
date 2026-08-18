import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { categories } from "./home.data";
export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mb-9 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b91c4a]">
            Find your feeling
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Shop by collection
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-2 text-sm font-bold text-[#b91c4a] sm:flex"
        >
          View all <FiArrowRight />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            href="/products"
            key={category.name}
            className={`group relative overflow-hidden rounded-2xl ${category.color} p-3 transition hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative mb-5 h-36 overflow-hidden rounded-xl">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="px-3 pb-3">
              <p className="text-lg font-black">{category.name}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-[#756875]">
                <span>{category.count}</span>
                <FiArrowUpRight className="text-[#b91c4a]" size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
