"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BrandForm from "@/components/admin/brand-form";
import { getBrand } from "@/api/brand.api";

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrand(id),
    enabled: Boolean(id),
  });
  if (isLoading)
    return <p className="text-sm text-[#756875]">Loading brand...</p>;
  if (isError || !data?.data)
    return <p className="text-sm text-red-500">Unable to load this brand.</p>;
  return <BrandForm brand={data.data} />;
}
