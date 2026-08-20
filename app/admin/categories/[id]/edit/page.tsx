"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/api/category.api";
import CategoryForm from "@/components/admin/category-form";
export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: Boolean(id),
  });
  if (isLoading)
    return <p className="text-sm text-[#756875]">Loading category...</p>;
  if (isError || !data?.data)
    return (
      <p className="text-sm text-red-500">Unable to load this category.</p>
    );
  return <CategoryForm category={data.data} />;
}
