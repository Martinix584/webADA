"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingCart, HelpCircle, Check, ArrowLeft, Truck, Store, ShieldCheck, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { Product, ProductColor } from "@/lib/products";
import { useCart } from "@/store/useCart";

interface ProductDetailContentProps {
  product: Product;
  onBack?: () => void;
  isModal?: boolean;
}

export function ProductDetailContent({ product, onBack, isModal = false }: ProductDetailContentProps) {
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

  const handleAction = () => {
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
    <div className="w-full text-foreground">
      {/* Back button (only shown if onBack is provided, typically on dynamic page) */}
      {onBack && !isModal && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground bg-secondary/35 hover:bg-secondary/70 border border-DEFAULT rounded-xl transition-all duration-300 backdrop-blur-md"
        >
          <ArrowLeft size={14} />
          Volver al catálogo
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side: Product Image / SVG Container */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-secondary/15 to-primary/5 border border-DEFAULT/40 p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          {/* Decorative Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-success/5 rounded-full blur-3xl opacity-50"></div>

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            {!product.inStock ? (
              <span className="bg-danger/90 text-white text-[0.7rem] font-bold px-3.5 py-1.5 rounded-full shadow-md">
                Agotado
              </span>
            ) : product.isRent ? (
              <span className="bg-[#00d2ff] text-white text-[0.7rem] font-bold px-3.5 py-1.5 rounded-full shadow-md">
                Alquiler
              </span>
            ) : product.takeAwayPrice ? (
              <span className="bg-success text-white text-[0.7rem] font-bold px-3.5 py-1.5 rounded-full shadow-md">
                {discountPct}% OFF Retiro
              </span>
            ) : (
              <span className="bg-primary text-white text-[0.7rem] font-bold px-3.5 py-1.5 rounded-full shadow-md">
                En Stock
              </span>
            )}
          </div>

          {/* Product Icon Box */}
          <div className="relative z-10 max-w-[240px] w-full aspect-square flex items-center justify-center drop-shadow-xl transition-transform duration-500 hover:scale-105">
            {product.iconType === "svg" ? (
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: currentIcon }}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={currentIcon}
                  alt={currentTitle}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary">
                {product.categoryLabel}
              </span>
              {product.badge && (
                <span className={`text-[0.65rem] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${
                  product.badge === "Conexion a Red"
                    ? "bg-blue-500/10 text-blue-500 border-blue-500/25"
                    : "bg-cyan-500/10 text-cyan-500 border-cyan-500/25"
                }`}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-4">
              {currentTitle}
            </h1>

            {/* Description */}
            <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
              {product.desc}
            </p>

            {/* Color Selector */}
            {product.colors && (
              <div className="mb-6">
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
                  Color Seleccionado: <strong className="text-foreground">{selectedColor?.label}</strong>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor?.id === color.id ? "border-primary scale-110 shadow-md shadow-primary/20" : "border-transparent hover:scale-105 shadow-sm"
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        borderColor: selectedColor?.id === color.id ? "var(--primary)" : (color.hex === "#ffffff" ? "#d1d5db" : "transparent")
                      }}
                      title={color.label}
                    >
                      {selectedColor?.id === color.id && (
                        <Check size={14} className={color.hex === "#ffffff" ? "text-black" : "text-white"} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Seals */}
            <div className="grid grid-cols-2 gap-4 border-y border-DEFAULT/40 py-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Garantía Certificada</h4>
                  <p className="text-[0.68rem] text-secondary">Calidad asegurada</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Comodato Oficial</h4>
                  <p className="text-[0.68rem] text-secondary">Bidones retornables</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications (Ficha Técnica) */}
            {product.specs && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-sliders text-primary"></i>
                  Especificaciones Técnicas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 bg-secondary/15 rounded-2xl p-4.5 border border-DEFAULT/40">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-DEFAULT/25 last:border-b-0">
                      <span className="text-[0.7rem] font-bold text-muted uppercase tracking-wide">{spec.label}</span>
                      <span className="text-[0.72rem] font-semibold text-foreground text-right pl-3">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Checkout Block */}
          <div className="bg-secondary/20 border border-DEFAULT/40 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex justify-between items-end mb-5">
              {product.isRent ? (
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider mb-1">
                    Abono Mensual
                  </span>
                  <div className="font-extrabold text-2xl text-foreground">
                    {formatPrice(product.price)}
                    <span className="text-sm font-semibold text-muted"> / mes</span>
                  </div>
                </div>
              ) : product.takeAwayPrice ? (
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] text-muted uppercase font-bold tracking-wider mb-1 inline-flex items-center gap-1.5">
                      <Truck size={13} className="text-primary" /> En Reparto
                    </span>
                    <span className="font-extrabold text-xl md:text-2xl text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-DEFAULT/40 pl-6">
                    <span className="text-[0.7rem] text-success uppercase font-bold tracking-wider mb-1 inline-flex items-center gap-1.5">
                      <Store size={13} className="text-success" /> Retiro en Local
                    </span>
                    <span className="font-extrabold text-xl md:text-2xl text-success">
                      {formatPrice(product.takeAwayPrice)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider mb-1">
                    Precio Final
                  </span>
                  <span className="font-extrabold text-2xl text-foreground">
                    {formatPrice(product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div>
              {!product.inStock ? (
                <button
                  onClick={handleAction}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-secondary text-foreground hover:text-danger hover:border-danger border border-DEFAULT font-bold text-sm rounded-xl shadow-sm hover:shadow transition-all"
                >
                  <HelpCircle size={17} />
                  Consultar Disponibilidad en WhatsApp
                </button>
              ) : product.isRent ? (
                <button
                  onClick={handleAction}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:bg-primary-hover hover:shadow-lg transition-all duration-300"
                >
                  <i className="fa-solid fa-file-signature text-sm"></i>
                  Solicitar Plan por WhatsApp
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:bg-primary-hover hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart size={17} />
                  Añadir al Carrito de Compra
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-card border border-DEFAULT rounded-xl p-1">
                    <button
                      onClick={handleRemove}
                      className="w-11 h-11 flex items-center justify-center rounded-lg bg-secondary text-foreground shadow-sm hover:text-danger hover:border-danger border border-transparent transition-all"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-base text-foreground leading-none">
                        {quantity}
                      </span>
                      <span className="text-[0.62rem] text-muted uppercase font-bold tracking-wider mt-0.5">
                        En el Carrito
                      </span>
                    </div>
                    <button
                      onClick={handleAdd}
                      className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm hover:bg-primary-hover transition-colors"
                      aria-label="Incrementar cantidad"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-center text-[0.7rem] text-muted font-medium">
                    Puedes seguir agregando items o abrir el carrito desde el menú superior para finalizar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
