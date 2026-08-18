import Image from "next/image";
import { FiTag } from "react-icons/fi";
import { Brand } from "@/types/brand.types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="group flex min-h-44 flex-col items-center justify-center rounded-2xl border border-[#eadfe2] bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#e4b5c2] hover:shadow-[0_18px_45px_rgba(83,27,47,0.1)]">
      <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#f7e8ed] text-[#b91c4a] transition group-hover:bg-[#f4dfe4]">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={80}
            height={80}
            unoptimized
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <FiTag size={28} />
        )}
      </div>
      <h3 className="font-black">{brand.name}</h3>
      {brand.description && (
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#756875]">
          {brand.description}
        </p>
      )}
    </article>
  );
}
