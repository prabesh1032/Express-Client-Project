"use client";

import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiPlus, FiTag, FiTrash2 } from "react-icons/fi";
import { deleteBrand, getBrands } from "@/api/brand.api";
import { useToast } from "@/components/common/toast/toast-provider";

export default function BrandsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  const remove = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast(response.message, "success");
    },
    onError: (error: { message?: string }) =>
      toast(error.message ?? "Unable to delete brand", "error"),
  });
  const brands = data?.data ?? [];
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) remove.mutate(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#b91c4a]">
            Catalog
          </p>
          <h2 className="text-3xl font-black tracking-tight">Brands</h2>
          <p className="mt-2 text-sm text-[#756875]">
            Manage the brands available in your store.
          </p>
        </div>
        <Link
          href="/admin/brands/create"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a]"
        >
          <FiPlus />
          Add brand
        </Link>
      </div>
      <section className="overflow-hidden rounded-2xl border border-[#eadfe2] bg-white">
        <div className="border-b border-[#f3ece9] px-6 py-4">
          <p className="text-sm font-bold">
            {isLoading
              ? "Loading..."
              : `${brands.length} brand${brands.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {isError ? (
          <div className="p-10 text-center text-sm text-red-500">
            Unable to load brands.
          </div>
        ) : !isLoading && brands.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <FiTag size={30} className="text-[#b91c4a]" />
            <p className="font-bold">No brands yet</p>
            <p className="text-sm text-[#756875]">
              Create your first brand to get started.
            </p>
            <Link
              href="/admin/brands/create"
              className="mt-2 text-sm font-bold text-[#b91c4a]"
            >
              Create a brand →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#f3ece9]">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f7e8ed] text-[#b91c4a]">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt=""
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FiTag size={20} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold">{brand.name}</p>
                    <p className="truncate text-sm text-[#756875]">
                      {brand.description || "No description"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:pl-4">
                  <Link
                    href={`/admin/brands/${brand._id}/edit`}
                    className="flex items-center gap-2 rounded-lg border border-[#eadfe2] px-3 py-2 text-sm font-bold text-[#756875] hover:border-[#b91c4a] hover:text-[#b91c4a]"
                  >
                    <FiEdit2 size={15} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(brand._id, brand.name)}
                    disabled={remove.isPending}
                    className="rounded-lg border border-red-100 p-2.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
                    aria-label={`Delete ${brand.name}`}
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
