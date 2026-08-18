import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { featuredProducts } from "./home.data";
export default function FeaturedProductsSection() {
  return (
    <section className="bg-[#fffaf5]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-9 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b91c4a]">
              Made for keeping
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              A few good things
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-bold text-[#b91c4a] sm:flex"
          >
            Shop all products <FiArrowRight />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.name}
              className="group rounded-2xl border border-[#eadfe2] bg-white p-3 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(83,27,47,0.1)]"
            >
              <div
                className={`relative aspect-[1.15] overflow-hidden rounded-xl ${product.color}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#756875] hover:text-[#b91c4a]"
                >
                  <FiHeart size={17} />
                </button>
              </div>
              <div className="px-2 pb-2 pt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#a799a0]">
                    {product.maker}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#9d7620]">
                    <FiStar size={13} fill="currentColor" />
                    {product.rating}
                  </span>
                </div>
                <h3 className="font-black">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold text-[#b91c4a]">{product.price}</p>
                  <Link
                    href="/products"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7e8ed] text-[#b91c4a] transition hover:bg-[#b91c4a] hover:text-white"
                    aria-label={`View ${product.name}`}
                  >
                    <FiShoppingBag size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
