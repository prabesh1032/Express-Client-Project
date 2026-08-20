import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiFolder } from "react-icons/fi";
import { Category } from "@/types/category.types";

export default function CategoryCard({ category }: { category: Category }) {
  return <Link href="/products" className="group relative overflow-hidden rounded-2xl bg-[#f4dfe4] p-3 transition hover:-translate-y-1 hover:shadow-xl"><div className="relative mb-5 h-36 overflow-hidden rounded-xl bg-[#f7e8ed]">{category.image ? <Image src={category.image} alt={category.name} width={400} height={240} unoptimized className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center text-[#b91c4a]"><FiFolder size={34} /></div>}<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /></div><div className="px-3 pb-3"><p className="text-lg font-black">{category.name}</p><div className="mt-2 flex items-center justify-between text-xs text-[#756875]"><span className="truncate">{category.description || "Explore this collection"}</span><FiArrowUpRight className="shrink-0 text-[#b91c4a]" size={18} /></div></div></Link>;
}
