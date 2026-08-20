"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiFolder } from "react-icons/fi";
import { getCategories } from "@/api/category.api";
import CategoryCard from "./category-card";

export default function CategoriesSection() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const categories = data?.data ?? [];
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mb-9 flex items-end justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b91c4a]">Find your feeling</p><h2 className="text-3xl font-black tracking-tight sm:text-4xl">Shop by collection</h2></div><Link href="/products" className="hidden items-center gap-2 text-sm font-bold text-[#b91c4a] sm:flex">View all <FiArrowRight /></Link></div>{isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-60 animate-pulse rounded-2xl bg-[#f7e8ed]" />)}</div> : isError ? <div className="rounded-2xl border border-[#eadfe2] bg-white p-10 text-center text-sm text-[#756875]">Categories are currently unavailable.</div> : categories.length === 0 ? <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#d9c8ce] bg-white p-10 text-center"><FiFolder size={28} className="text-[#b91c4a]" /><p className="mt-3 font-bold">Categories are coming soon</p></div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <CategoryCard key={category._id} category={category} />)}</div>}</section>;
}
