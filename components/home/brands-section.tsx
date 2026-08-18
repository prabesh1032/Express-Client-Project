"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { getBrands } from "@/api/brand.api";
import BrandCard from "./brand-card";

export default function BrandsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  const brands = data?.data ?? [];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mb-9 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b91c4a]">
            Meet the makers
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Shop trusted brands
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#756875]">
            Discover the people and labels behind the products you love.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-2 text-sm font-bold text-[#b91c4a] sm:flex"
        >
          Explore products <FiArrowRight />
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div className="h-44 animate-pulse rounded-2xl bg-[#f7e8ed]" />
          <div className="h-44 animate-pulse rounded-2xl bg-[#f7e8ed]" />
          <div className="hidden h-44 animate-pulse rounded-2xl bg-[#f7e8ed] sm:block" />
          <div className="hidden h-44 animate-pulse rounded-2xl bg-[#f7e8ed] lg:block" />
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-[#eadfe2] bg-white p-10 text-center text-sm text-[#756875]">
          Brands are currently unavailable.
        </div>
      ) : brands.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#d9c8ce] bg-white p-10 text-center">
          <FiTag size={28} className="text-[#b91c4a]" />
          <p className="mt-3 font-bold">Brands are coming soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </section>
  );
}
