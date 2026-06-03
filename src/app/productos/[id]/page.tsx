import React from "react";
import { getProductById, PRODUCTS } from "@/lib/products";
import { ProductDetailContent } from "@/components/ProductDetailContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Generate static params for all products (Static Site Generation)
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// Generate dynamic metadata for SEO and link sharing (WhatsApp, Facebook, etc.)
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: "Producto no encontrado | Almacén de Agua",
      description: "El producto solicitado no está disponible en nuestro catálogo.",
    };
  }

  return {
    title: `${product.title} | Almacén de Agua Mendoza`,
    description: `${product.desc} - Compra segura con entrega programada sin cargo en Mendoza.`,
    openGraph: {
      title: `${product.title} | Almacén de Agua`,
      description: product.desc,
      images: [
        {
          url: product.iconContent.startsWith("/") ? product.iconContent : "/assets/bidon-20l.avif",
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-32 pb-24">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-[35vw] h-[35vw] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8s]"></div>
      <div className="absolute bottom-0 right-1/4 w-[35vw] h-[35vw] bg-success/5 rounded-full blur-3xl -z-10 animate-pulse duration-[10s]"></div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Breadcrumb / Back Button */}
        <div className="mb-8 animate-in fade-in slide-in-from-left duration-500">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground bg-secondary/35 hover:bg-secondary/70 border border-DEFAULT hover:border-primary/45 rounded-xl transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            Volver al catálogo
          </Link>
        </div>

        {/* Detailed Product Card Wrapper */}
        <div className="bg-glass-bg border border-glass rounded-[2rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
          <ProductDetailContent product={product} />
        </div>
      </div>
    </div>
  );
}
