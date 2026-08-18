"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, updateBrand } from "@/api/brand.api";
import { Brand, BrandInput } from "@/types/brand.types";
import { useToast } from "@/components/common/toast/toast-provider";

export default function BrandForm({ brand }: { brand?: Brand }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandInput>({
    defaultValues: {
      name: brand?.name ?? "",
      description: brand?.description ?? "",
    },
  });

  useEffect(() => {
    if (brand)
      reset({ name: brand.name, description: brand.description ?? "" });
  }, [brand, reset]);

  const mutation = useMutation({
    mutationFn: (data: BrandInput) =>
      brand ? updateBrand({ id: brand._id, data }) : createBrand(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast(response.message, "success");
      router.push("/admin/brands");
    },
    onError: (error: { message?: string }) =>
      toast(error.message ?? "Something went wrong", "error"),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-3xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <Link
          href="/admin/brands"
          className="rounded-xl border border-[#eadfe2] bg-white p-3 text-[#756875] hover:text-[#b91c4a]"
        >
          <FiArrowLeft />
        </Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b91c4a]">
            Brands
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            {brand ? "Edit brand" : "Create brand"}
          </h2>
        </div>
      </div>
      <div className="space-y-5 rounded-2xl border border-[#eadfe2] bg-white p-6 sm:p-8">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold">
            Brand name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Brand name is required",
              minLength: { value: 3, message: "Use at least 3 characters" },
            })}
            placeholder="e.g. Goldstar"
            className={`w-full rounded-xl border bg-[#fffdfb] px-4 py-3 text-sm outline-none focus:border-[#b91c4a] focus:ring-4 focus:ring-[#b91c4a]/10 ${errors.name ? "border-red-400" : "border-[#eadfe2]"}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-bold">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description", {
              minLength: { value: 10, message: "Use at least 10 characters" },
            })}
            placeholder="A short description of this brand"
            className={`w-full resize-none rounded-xl border bg-[#fffdfb] px-4 py-3 text-sm outline-none focus:border-[#b91c4a] focus:ring-4 focus:ring-[#b91c4a]/10 ${errors.description ? "border-red-400" : "border-[#eadfe2]"}`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="logo" className="mb-2 block text-sm font-bold">
            Brand logo{" "}
            <span className="font-normal text-[#a799a0]">
              (optional, max 5MB)
            </span>
          </label>
          {brand?.logo && (
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={brand.logo}
                alt={`${brand.name} current logo`}
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 rounded-xl border border-[#eadfe2] object-contain p-1"
              />
              <span className="text-xs text-[#756875]">
                Upload a new image to replace the current logo.
              </span>
            </div>
          )}
          <input
            id="logo"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            {...register("logo")}
            className="w-full rounded-xl border border-dashed border-[#d9c8ce] bg-[#fffdfb] px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#f7e8ed] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#b91c4a]"
          />
        </div>
        <div className="flex justify-end gap-3 border-t border-[#f3ece9] pt-5">
          <Link
            href="/admin/brands"
            className="rounded-xl border border-[#eadfe2] px-5 py-3 text-sm font-bold text-[#756875] hover:bg-[#fbf7f2]"
          >
            Cancel
          </Link>
          <button
            disabled={mutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {mutation.isPending
              ? "Saving..."
              : brand
                ? "Save changes"
                : "Create brand"}
          </button>
        </div>
      </div>
    </form>
  );
}
