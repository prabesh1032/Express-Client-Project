"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiImage } from "react-icons/fi";
import { getProducts } from "@/api/product.api";
import ProductCard from "./product-card";

export default function ProductsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = (data?.data ?? []).slice(0, 6);
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
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-3">
            <div className="h-96 animate-pulse rounded-2xl bg-[#f7e8ed]" />
            <div className="h-96 animate-pulse rounded-2xl bg-[#f7e8ed]" />
            <div className="h-96 animate-pulse rounded-2xl bg-[#f7e8ed]" />
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-[#eadfe2] bg-white p-10 text-center text-sm text-[#756875]">
            Products are currently unavailable.
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#d9c8ce] bg-white p-10 text-center">
            <FiImage size={28} className="text-[#b91c4a]" />
            <p className="mt-3 font-bold">Products are coming soon</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
