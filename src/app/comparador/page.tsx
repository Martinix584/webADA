"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/lib/products";
import { useCart } from "@/store/useCart";
import { CheckCircle2, ShoppingCart, Scale, X } from "lucide-react";

export default function ComparadorPage() {
  const { addItem, setCartOpen } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter only dispensers
  const dispensers = PRODUCTS.filter((p) => p.category === "dispenser");

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selId) => selId !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedProducts = selectedIds.map(id => dispensers.find(d => d.id === id) as Product);

  // Get a unique list of all spec labels across the selected products
  const allSpecLabels = Array.from(
    new Set(
      selectedProducts.flatMap(p => p.specs?.map(s => s.label) || [])
    )
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-4">
            <Scale size={16} />
            Herramienta
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4 tracking-tight">
            Comparador de Dispensers
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Seleccioná hasta 3 equipos de nuestro catálogo para comparar sus características técnicas, rendimiento y precios lado a lado.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">Catálogo de Equipos</h2>
            <div className="text-sm font-semibold bg-glass-bg border border-glass px-4 py-1.5 rounded-full">
              <span className={selectedIds.length === 3 ? "text-red-400" : "text-primary"}>
                {selectedIds.length}
              </span>
              <span className="text-secondary"> / 3 seleccionados</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dispensers.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const isDisabled = !isSelected && selectedIds.length >= 3;

              return (
                <button
                  key={product.id}
                  onClick={() => handleToggleSelect(product.id)}
                  disabled={isDisabled}
                  className={`relative flex flex-col text-left p-4 rounded-2xl transition-all duration-300 border ${
                    isSelected 
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[1.02]" 
                      : isDisabled
                        ? "bg-glass-bg/30 border-glass opacity-50 cursor-not-allowed"
                        : "bg-glass-bg border-glass hover:border-primary/50 hover:bg-glass-bg/80"
                  }`}
                >
                  {/* Checkmark badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5 shadow-md z-20 animate-in zoom-in">
                      <CheckCircle2 size={16} />
                    </div>
                  )}

                  <div className="relative w-full aspect-square mb-3 bg-white/5 dark:bg-white/5 rounded-xl flex items-center justify-center p-2">
                    {product.iconType === "img" && (
                      <Image
                        src={product.iconContent}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain h-full w-full drop-shadow-xl"
                      />
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="font-heading font-bold text-sm leading-tight text-foreground line-clamp-2 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-primary font-black text-sm">
                      ${product.price.toLocaleString("es-AR")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedIds.length > 0 && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
              <Scale className="text-primary" /> 
              Tabla Comparativa
            </h2>
            
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[600px] border border-glass rounded-2xl bg-glass-bg/50 backdrop-blur-md overflow-hidden shadow-xl">
                
                {/* Header Row (Images & Basic Info) */}
                <div className="flex border-b border-glass bg-black/5 dark:bg-white/5">
                  {/* Left empty column for labels */}
                  <div className="w-1/4 min-w-[150px] p-6 flex flex-col justify-end border-r border-glass">
                    <span className="font-bold text-secondary uppercase tracking-widest text-xs">Especificación</span>
                  </div>
                  
                  {/* Product Columns */}
                  {selectedProducts.map(product => (
                    <div key={`header-${product.id}`} className="flex-1 p-6 flex flex-col items-center text-center relative border-r border-glass last:border-r-0">
                      <button 
                        onClick={() => handleToggleSelect(product.id)}
                        className="absolute top-4 right-4 text-muted hover:text-red-500 transition-colors"
                        title="Quitar"
                      >
                        <X size={18} />
                      </button>
                      <div className="relative w-24 h-24 mb-4">
                        {product.iconType === "img" && (
                          <Image
                            src={product.iconContent}
                            alt={product.title}
                            fill
                            className="object-contain drop-shadow-md"
                          />
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-base leading-tight mb-2 h-10">{product.title}</h3>
                      <div className="text-xl font-black text-primary mb-4">
                        ${product.price.toLocaleString("es-AR")}
                      </div>
                      <button
                        onClick={() => {
                          addItem({
                            id: product.id,
                            title: product.title,
                            priceDelivery: product.price,
                            priceTakeaway: product.takeAwayPrice || product.price,
                            image: product.iconContent,
                          });
                          setCartOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md"
                      >
                        <ShoppingCart size={16} />
                        Agregar
                      </button>
                    </div>
                  ))}
                </div>

                {/* Specs Rows */}
                <div className="divide-y divide-glass/50">
                  {allSpecLabels.map((specLabel, idx) => (
                    <div key={specLabel} className={`flex transition-colors hover:bg-white/5 ${idx % 2 === 0 ? 'bg-black/5 dark:bg-white/[0.02]' : ''}`}>
                      <div className="w-1/4 min-w-[150px] p-4 font-bold text-sm text-foreground border-r border-glass flex items-center">
                        {specLabel}
                      </div>
                      {selectedProducts.map(product => {
                        const specValue = product.specs?.find(s => s.label === specLabel)?.value || "-";
                        return (
                          <div key={`${product.id}-${specLabel}`} className="flex-1 p-4 text-sm text-secondary border-r border-glass last:border-r-0 flex items-center justify-center text-center">
                            {specValue}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Desc Row */}
                <div className="flex border-t border-glass bg-black/10 dark:bg-white/5">
                  <div className="w-1/4 min-w-[150px] p-4 font-bold text-sm text-foreground border-r border-glass flex items-start pt-6">
                    Descripción Breve
                  </div>
                  {selectedProducts.map(product => (
                    <div key={`desc-${product.id}`} className="flex-1 p-6 text-xs leading-relaxed text-secondary border-r border-glass last:border-r-0 text-center">
                      {product.desc}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
