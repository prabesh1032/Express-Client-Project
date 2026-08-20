"use client";

import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiFolder, FiPlus, FiTrash2 } from "react-icons/fi";
import { deleteCategory, getCategories } from "@/api/category.api";
import { useToast } from "@/components/common/toast/toast-provider";
import DataTable, { DataTableColumn } from "@/components/admin/data-table";
import { Category } from "@/types/category.types";

export default function CategoriesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = data?.data ?? [];
  const remove = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast(response.message, "success");
    },
    onError: (error: { message?: string }) =>
      toast(error.message ?? "Unable to delete category", "error"),
  });
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) remove.mutate(id);
  };
  const columns: DataTableColumn<Category>[] = [
    {
      key: "category",
      header: "Category",
      render: (category) => (
        <div className="flex min-w-56 items-center gap-4">
          <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f7e8ed] text-[#b91c4a]">
            {category.image ? (
              <Image
                src={category.image}
                alt=""
                width={96}
                height={64}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <FiFolder size={22} />
            )}
          </div>
          <span className="font-bold">{category.name}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (category) => (
        <span className="block max-w-md truncate text-sm text-[#756875]">
          {category.description || "No description"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (category) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/categories/${category._id}/edit`}
            className="flex items-center gap-2 rounded-lg border border-[#eadfe2] px-3 py-2 text-sm font-bold text-[#756875] hover:border-[#b91c4a] hover:text-[#b91c4a]"
          >
            <FiEdit2 size={15} />
            Edit
          </Link>
          <button
            onClick={() => handleDelete(category._id, category.name)}
            disabled={remove.isPending}
            className="rounded-lg border border-red-100 p-2.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
            aria-label={`Delete ${category.name}`}
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
          <h2 className="text-3xl font-black tracking-tight">Categories</h2>
          <p className="mt-2 text-sm text-[#756875]">
            Organize the products in your store.
          </p>
        </div>
        <Link
          href="/admin/categories/create"
          className="flex w-fit items-center gap-2 rounded-xl bg-[#b91c4a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b91c4a]/20 hover:bg-[#8f153a]"
        >
          <FiPlus />
          Add category
        </Link>
      </div>
      <section className="overflow-hidden rounded-2xl border border-[#eadfe2] bg-white">
        <div className="border-b border-[#f3ece9] px-6 py-4">
          <p className="text-sm font-bold">
            {isLoading
              ? "Loading..."
              : `${categories.length} categor${categories.length === 1 ? "y" : "ies"}`}
          </p>
        </div>
        {isError ? (
          <div className="p-10 text-center text-sm text-red-500">
            Unable to load categories.
          </div>
        ) : !isLoading && categories.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-14 text-center">
            <FiFolder size={30} className="text-[#b91c4a]" />
            <p className="font-bold">No categories yet</p>
            <p className="text-sm text-[#756875]">
              Create your first category to get started.
            </p>
          </div>
        ) : (
          <DataTable
            rows={categories}
            columns={columns}
            getRowKey={(category) => category._id}
          />
        )}
      </section>
    </div>
  );
}
