"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "@/api/product.api";
import { getBrands } from "@/api/brand.api";
import { getCategories } from "@/api/category.api";
import { Brand } from "@/types/brand.types";
import { Category } from "@/types/category.types";
import { Product, ProductInput } from "@/types/product.types";
import { useToast } from "@/components/common/toast/toast-provider";

const referenceId = (reference: Brand | Category | string) =>
  typeof reference === "string" ? reference : reference._id;

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: brandsData, isLoading: brandsLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const brands = brandsData?.data ?? [];
  const categories = categoriesData?.data ?? [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      brand: product ? referenceId(product.brand) : "",
      category: product ? referenceId(product.category) : "",
    },
  });
  useEffect(() => {
    if (product)
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        brand: referenceId(product.brand),
        category: referenceId(product.category),
      });
  }, [product, reset]);
  const mutation = useMutation({
    mutationFn: (data: ProductInput) =>
      product ? updateProduct({ id: product._id, data }) : createProduct(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast(response.message, "success");
      router.push("/admin/products");
    },
    onError: (error: { message?: string }) =>
      toast(error.message ?? "Something went wrong", "error"),
  });
  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-[#fffdfb] px-4 py-3 text-sm outline-none focus:border-[#b91c4a] focus:ring-4 focus:ring-[#b91c4a]/10 ${hasError ? "border-red-400" : "border-[#eadfe2]"}`;
  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-4xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="rounded-xl border border-[#eadfe2] bg-white p-3 text-[#756875] hover:text-[#b91c4a]"
        >
          <FiArrowLeft />
        </Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b91c4a]">
            Catalog
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            {product ? "Edit product" : "Create product"}
          </h2>
        </div>
      </div>
      <div className="space-y-5 rounded-2xl border border-[#eadfe2] bg-white p-6 sm:p-8">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold">
            Product name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Product name is required",
              minLength: { value: 3, message: "Use at least 3 characters" },
            })}
            placeholder="e.g. Handmade wool scarf"
            className={fieldClass(Boolean(errors.name))}
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
              required: "Description is required",
              minLength: { value: 10, message: "Use at least 10 characters" },
            })}
            placeholder="Describe this product"
            className={`${fieldClass(Boolean(errors.description))} resize-none`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-bold">
              Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price cannot be negative" },
              })}
              className={fieldClass(Boolean(errors.price))}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="stock" className="mb-2 block text-sm font-bold">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              {...register("stock", {
                required: "Stock is required",
                valueAsNumber: true,
                min: { value: 0, message: "Stock cannot be negative" },
              })}
              className={fieldClass(Boolean(errors.stock))}
            />
            {errors.stock && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="brand" className="mb-2 block text-sm font-bold">
              Brand
            </label>
            <select
              id="brand"
              {...register("brand", { required: "Brand is required" })}
              disabled={brandsLoading}
              className={fieldClass(Boolean(errors.brand))}
            >
              <option value="">
                {brandsLoading ? "Loading brands..." : "Select a brand"}
              </option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="mt-1 text-xs text-red-500">
                {errors.brand.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-bold">
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              disabled={categoriesLoading}
              className={fieldClass(Boolean(errors.category))}
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-bold">
            Product image{" "}
            <span className="font-normal text-[#a799a0]">
              (optional, max 5MB)
            </span>
          </label>
          {product?.image && (
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={product.image}
                alt={`${product.name} current image`}
                width={96}
                height={64}
                unoptimized
                className="h-16 w-24 rounded-xl border border-[#eadfe2] object-cover p-1"
              />
              <span className="text-xs text-[#756875]">
                Upload a new image to replace the current image.
              </span>
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            {...register("image")}
            className="w-full rounded-xl border border-dashed border-[#d9c8ce] bg-[#fffdfb] px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#f7e8ed] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#b91c4a]"
          />
        </div>
        <div className="flex justify-end gap-3 border-t border-[#f3ece9] pt-5">
          <Link
            href="/admin/products"
            className="rounded-xl border border-[#eadfe2] px-5 py-3 text-sm font-bold text-[#756875] hover:bg-[#fbf7f2]"
          >
            Cancel
          </Link>
          <button
            disabled={mutation.isPending || brandsLoading || categoriesLoading}
            className="flex items-center gap-2 rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {mutation.isPending
              ? "Saving..."
              : product
                ? "Save changes"
                : "Create product"}
          </button>
        </div>
      </div>
    </form>
  );
}
