"use client";

import React, { useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ShieldCheck, Truck, Sparkles, ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";

interface ProductosCatalogProps {
  products: Product[];
}

export function ProductosCatalog({ products }: ProductosCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "agua-y-soda" | "dispenser">("all");

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8s]"></div>
      <div className="absolute bottom-1/4 left-0 w-[35vw] h-[35vw] bg-success/5 rounded-full blur-3xl -z-10 animate-pulse duration-[10s]"></div>

      {/* Catalog Hero Banner */}
      <div className="relative pt-28 pb-16 border-b border-DEFAULT/40 bg-secondary/15 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-muted hover:text-foreground bg-secondary/40 hover:bg-secondary/70 border border-DEFAULT rounded-xl transition-all duration-300"
            >
              <ArrowLeft size={12} />
              Volver al inicio
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={12} /> Catálogo Oficial V2
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 font-heading leading-tight">
                Hidratación Premium <br />
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  para Hogares y Empresas
                </span>
              </h1>
              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-xl mb-6">
                Elegí entre nuestra variedad de agua purificada, sodas y dispensers de última tecnología. 
                Añadí al carrito tus productos y finalizá tu pedido por WhatsApp con envío sin cargo en Mendoza.
              </p>
              
              <Link
                href="/comparador"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
              >
                <Scale size={18} />
                Abrir Comparador de Dispensers
              </Link>
            </div>

            {/* Right Column: Key Stats / Value props */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-DEFAULT shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Truck size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wide">Reparto Sin Cargo</h3>
                  <p className="text-[0.68rem] text-secondary">Zonas seleccionadas de Mendoza</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-DEFAULT shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wide">Comodato Oficial</h3>
                  <p className="text-[0.68rem] text-secondary">Envases seguros e higienizados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid and Filters Area */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 bg-secondary/35 p-1.5 rounded-2xl w-fit mx-auto border border-DEFAULT/50 max-w-full backdrop-blur-md">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-3 rounded-xl font-extrabold text-xs transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-white dark:bg-card text-primary shadow-md shadow-primary/5"
                : "text-muted hover:text-foreground"
            }`}
          >
            Todos los Productos ({products.length})
          </button>
          <button
            onClick={() => setActiveCategory("agua-y-soda")}
            className={`px-6 py-3 rounded-xl font-extrabold text-xs transition-all duration-300 ${
              activeCategory === "agua-y-soda"
                ? "bg-white dark:bg-card text-primary shadow-md shadow-primary/5"
                : "text-muted hover:text-foreground"
            }`}
          >
            Agua y Soda
          </button>
          <button
            onClick={() => setActiveCategory("dispenser")}
            className={`px-6 py-3 rounded-xl font-extrabold text-xs transition-all duration-300 ${
              activeCategory === "dispenser"
                ? "bg-white dark:bg-card text-primary shadow-md shadow-primary/5"
                : "text-muted hover:text-foreground"
            }`}
          >
            Dispensers de Agua
          </button>
        </div>

        {/* Dynamic Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-secondary text-sm">No se encontraron productos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
