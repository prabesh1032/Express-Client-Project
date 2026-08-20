import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiImage, FiShoppingBag } from "react-icons/fi";
import { Brand } from "@/types/brand.types";
import { Category } from "@/types/category.types";
import { Product } from "@/types/product.types";

const nameOf = (value: Brand | Category | string) =>
  typeof value === "string" ? value : value.name;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-2xl border border-[#eadfe2] bg-white p-3 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(83,27,47,0.1)]">
      <div className="relative aspect-[1.15] overflow-hidden rounded-xl bg-[#f7e8ed]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={435}
            unoptimized
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#b91c4a]">
            <FiImage size={38} />
          </div>
        )}
        <button
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#756875] hover:text-[#b91c4a]"
        >
          <FiHeart size={17} />
        </button>
      </div>
      <div className="px-2 pb-2 pt-5">
        <p className="mb-2 text-xs font-semibold text-[#a799a0]">
          {nameOf(product.brand)} · {nameOf(product.category)}
        </p>
        <h3 className="font-black">{product.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold text-[#b91c4a]">
            रू {product.price.toLocaleString()}
          </p>
          <Link
            href={`/products/${product._id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7e8ed] text-[#b91c4a] transition hover:bg-[#b91c4a] hover:text-white"
            aria-label={`View ${product.name}`}
          >
            <FiShoppingBag size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
