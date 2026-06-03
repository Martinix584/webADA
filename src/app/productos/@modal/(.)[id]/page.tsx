"use client";

import React, { use } from "react";
import { getProductById } from "@/lib/products";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { ProductDetailContent } from "@/components/ProductDetailContent";
import { useRouter } from "next/navigation";

interface InterceptedProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function InterceptedProductPage({ params }: InterceptedProductPageProps) {
  const resolvedParams = use(Promise.resolve(params));
  const router = useRouter();
  const product = getProductById(resolvedParams.id);

  if (!product) {
    // If product is not found, close modal
    router.back();
    return null;
  }

  return (
    <ProductDetailModal>
      <ProductDetailContent product={product} isModal={true} />
    </ProductDetailModal>
  );
}
