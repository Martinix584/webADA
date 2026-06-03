import React from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductosCatalog } from "@/components/ProductosCatalog";

export const metadata = {
  title: "Catálogo de Productos | Almacén de Agua Mendoza",
  description:
    "Comprá bidones de agua purificada de 20L y 12L, sodas en sifón y dispensers frío/calor o naturales para tu hogar o empresa. Envío sin cargo en Mendoza.",
};

export default function ProductosPage() {
  return <ProductosCatalog products={PRODUCTS} />;
}
