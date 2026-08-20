"use client";

import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import { deleteProduct, getProducts } from "@/api/product.api";
import { Brand } from "@/types/brand.types";
import { Category } from "@/types/category.types";
import { Product } from "@/types/product.types";
import DataTable, { DataTableColumn } from "@/components/admin/data-table";
import { useToast } from "@/components/common/toast/toast-provider";

const nameOf = (value: Brand | Category | string) =>
  typeof value === "string" ? value : value.name;

export default function ProductsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = data?.data ?? [];
  const remove = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast(response.message, "success");
    },
    onError: (error: { message?: string }) =>
      toast(error.message ?? "Unable to delete product", "error"),
  });
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) remove.mutate(id);
  };
  const columns: DataTableColumn<Product>[] = [
    {
      key: "product",
      header: "Product",
      render: (product) => (
        <div className="flex min-w-64 items-center gap-4">
          <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f7e8ed] text-[#b91c4a]">
            {product.image ? (
              <Image
                src={product.image}
                alt=""
                width={80}
                height={64}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <FiImage size={22} />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold">{product.name}</p>
            <p className="text-sm font-bold text-[#b91c4a]">
              रू {product.price.toLocaleString()}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "classification",
      header: "Brand / Category",
      render: (product) => (
        <span className="block max-w-xs truncate text-sm text-[#756875]">
          {nameOf(product.brand)} · {nameOf(product.category)}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (product) => (
        <span
          className={`text-sm font-bold ${product.stock === 0 ? "text-red-500" : product.stock < 10 ? "text-amber-600" : "text-emerald-600"}`}
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (product) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/products/${product._id}/edit`}
            className="flex items-center gap-2 rounded-lg border border-[#eadfe2] px-3 py-2 text-sm font-bold text-[#756875] hover:border-[#b91c4a] hover:text-[#b91c4a]"
          >
            <FiEdit2 size={15} />
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product._id, product.name)}
            disabled={remove.isPending}
            className="rounded-lg border border-red-100 p-2.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
            aria-label={`Delete ${product.name}`}
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#b91c4a]">
            Catalog
          </p>
          <h2 className="text-3xl font-black tracking-tight">Products</h2>
          <p className="mt-2 text-sm text-[#756875]">
            Manage products, stock, brands, and categories.
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a]"
        >
          <FiPlus />
          Add product
        </Link>
      </div>
      <section className="overflow-hidden rounded-2xl border border-[#eadfe2] bg-white">
        <div className="border-b border-[#f3ece9] px-6 py-4">
          <p className="text-sm font-bold">
            {isLoading
              ? "Loading..."
              : `${products.length} product${products.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {isError ? (
          <div className="p-10 text-center text-sm text-red-500">
            Unable to load products.
          </div>
        ) : !isLoading && products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <FiImage size={30} className="text-[#b91c4a]" />
            <p className="font-bold">No products yet</p>
            <p className="text-sm text-[#756875]">
              Create your first product to get started.
            </p>
          </div>
        ) : (
          <DataTable
            rows={products}
            columns={columns}
            getRowKey={(product) => product._id}
          />
        )}
      </section>
    </div>
  );
}
