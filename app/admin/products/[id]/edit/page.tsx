"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/product.api";
import ProductForm from "@/components/admin/product-form";
export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
  if (isLoading)
    return <p className="text-sm text-[#756875]">Loading product...</p>;
  if (isError || !data?.data)
    return <p className="text-sm text-red-500">Unable to load this product.</p>;
  return <ProductForm product={data.data} />;
}
