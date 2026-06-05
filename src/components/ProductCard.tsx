"use client";

import { Plus, Minus, ShoppingCart, HelpCircle, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductColor } from "@/lib/products";
import { useCart } from "@/store/useCart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const currentId = selectedColor ? `${product.id}-${selectedColor.id}` : product.id;
  const currentTitle = selectedColor ? `${product.title} - ${selectedColor.label}` : product.title;
  const currentIcon = selectedColor ? selectedColor.iconContent : product.iconContent;

  const quantity = items.find((i) => i.id === currentId)?.quantity || 0;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(p);

  const discountPct = product.takeAwayPrice
    ? Math.round(((product.price - product.takeAwayPrice) / product.price) * 100)
    : 0;

  // Handle WhatsApp interactions for Rentals and Out-of-Stock items
  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const WHATSAPP_PHONE = "5492613312121";

    if (!product.inStock) {
      const text = encodeURIComponent(
        `Hola Almacén de Agua! Quería consultar por stock y disponibilidad del producto: "${currentTitle}". Muchas gracias!`
      );
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`, "_blank");
      return;
    }

    if (product.isRent) {
      const text = encodeURIComponent(
        `Hola Almacén de Agua! Estoy interesado en contratar el "${
          currentTitle
        }" por ${formatPrice(product.price)}/mes. ¿Me darían más información sobre los requisitos?`
      );
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`, "_blank");
      return;
    }

    handleAdd();
  };

  const handleAdd = () => {
    addItem({
      id: currentId,
      title: currentTitle,
      priceDelivery: product.price,
      priceTakeaway: product.takeAwayPrice || product.price,
      image: currentIcon,
    });
  };

  const handleRemove = () => {
    updateQuantity(currentId, quantity - 1);
  };

  return (
    <Link href={`/productos/${product.id}`} className="block h-full group">
      <article className="bg-card border border-DEFAULT rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative">
        {/* Product Badges */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          {!product.inStock ? (
            <span className="bg-danger/95 text-white text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-sm">
              Agotado
            </span>
          ) : product.isRent ? (
            <span className="bg-[#00d2ff] text-white text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-sm">
              Alquiler
            </span>
          ) : product.takeAwayPrice ? (
            <span className="bg-success text-white text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-sm">
              {discountPct}% OFF Retiro
            </span>
          ) : (
            <span className="bg-primary/95 text-white text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-sm">
              En Stock
            </span>
          )}
        </div>

        {/* Product Icon Box */}
        <div className="relative h-48 w-full bg-secondary/20 p-6 flex items-center justify-center overflow-hidden">
          {/* Decorative blur orb */}
          <div className="w-28 h-28 bg-primary/10 rounded-full blur-2xl absolute opacity-60 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {product.iconType === "svg" ? (
              <div
                className="flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: currentIcon }}
              />
            ) : (
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Image
                  src={currentIcon}
                  alt={currentTitle}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Hover overlay with 'Ver Detalle' */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
            <span className="bg-white/90 dark:bg-card/90 backdrop-blur-md text-primary border border-primary/20 text-[0.7rem] font-extrabold px-4 py-2 rounded-xl shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
              Ver Detalle <ArrowRight size={13} />
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col flex-grow border-t border-DEFAULT relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[0.68rem] uppercase font-bold tracking-widest text-primary">
              {product.categoryLabel}
            </span>
            {product.badge && (
              <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full border ${
                product.badge === "Conexion a Red"
                  ? "bg-blue-500/10 text-blue-500 border-blue-500/25"
                  : "bg-cyan-500/10 text-cyan-500 border-cyan-500/25"
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          <h3 className="font-bold text-[1.05rem] text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {currentTitle}
          </h3>
          <p className="text-secondary text-[0.8rem] leading-relaxed line-clamp-3 mb-3">
            {product.desc}
          </p>
          <div className="text-[0.72rem] font-bold text-primary/80 group-hover:text-primary transition-colors flex items-center gap-1 mb-4">
            Ver detalles técnicos <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>

          {/* Color Selector */}
          {product.colors && (
            <div className="flex items-center gap-2 mb-4 relative z-20">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColor?.id === color.id ? "border-primary scale-110" : "border-transparent hover:scale-105 shadow-sm"
                  }`}
                  style={{ backgroundColor: color.hex, borderColor: selectedColor?.id === color.id ? "var(--primary)" : (color.hex === "#ffffff" ? "#e5e7eb" : "transparent") }}
                  title={color.label}
                >
                  {selectedColor?.id === color.id && (
                    <Check size={12} className={color.hex === "#ffffff" ? "text-black" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Pricing & Checkout Buttons */}
          <div className="mt-auto space-y-4 pt-3 border-t border-DEFAULT/50 relative z-20">
            <div className="flex justify-between items-end">
              {product.isRent ? (
                <div className="flex flex-col">
                  <span className="text-[0.62rem] text-muted uppercase font-bold tracking-wider mb-0.5">
                    Abono Mensual
                  </span>
                  <div className="font-extrabold text-[1.2rem] text-foreground">
                    {formatPrice(product.price)}
                    <span className="text-xs font-semibold text-muted"> / mes</span>
                  </div>
                </div>
              ) : product.takeAwayPrice ? (
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col">
                    <span className="text-[0.62rem] text-muted uppercase font-bold tracking-wider mb-0.5 inline-flex items-center gap-1">
                      <i className="fa-solid fa-truck text-[0.6rem]"></i> Reparto
                    </span>
                    <span className="font-extrabold text-[1rem] text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[0.62rem] text-success uppercase font-bold tracking-wider mb-0.5 inline-flex items-center gap-1 justify-end">
                      <i className="fa-solid fa-store text-[0.6rem]"></i> Retiro
                    </span>
                    <span className="font-extrabold text-[1rem] text-success">
                      {formatPrice(product.takeAwayPrice)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-[0.62rem] text-muted uppercase font-bold tracking-wider mb-0.5">
                    Precio
                  </span>
                  <span className="font-extrabold text-[1.2rem] text-foreground">
                    {formatPrice(product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Checkout/Counter Button */}
            <div>
              {!product.inStock ? (
                <button
                  onClick={handleAction}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-foreground border border-DEFAULT hover:border-danger hover:text-danger font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all"
                >
                  <HelpCircle size={15} />
                  Consultar Disponibilidad
                </button>
              ) : product.isRent ? (
                <button
                  onClick={handleAction}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-DEFAULT hover:border-primary font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all"
                >
                  <i className="fa-solid fa-file-signature text-xs"></i>
                  Solicitar Plan
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-white hover:shadow-md transition-all duration-300"
                >
                  <ShoppingCart size={15} />
                  Añadir al Carrito
                </button>
              ) : (
                <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-0.5 border border-DEFAULT" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-card text-foreground shadow-sm hover:text-danger hover:border-danger border border-transparent transition-all"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-extrabold text-sm w-12 text-center text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAdd();
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:bg-primary-hover transition-colors"
                    aria-label="Incrementar cantidad"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
