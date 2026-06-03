"use client";

import { useCart } from "@/store/useCart";
import { X, Trash2, Plus, Minus, ShoppingBag, Droplet } from "lucide-react";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";

export function CartSidebar() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    deliveryMethod,
    setDeliveryMethod,
    clearCart,
    setCheckoutOpen,
  } = useCart();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((acc, item) => {
    const price = deliveryMethod === "delivery" ? item.priceDelivery : item.priceTakeaway;
    return acc + price * item.quantity;
  }, 0);

  const formatPrice = (price: number) =>
    "$" + price.toLocaleString("es-AR");

  const handleCheckoutOpen = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card border-l border-DEFAULT shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-DEFAULT">
          <div className="flex items-center gap-3 text-foreground font-bold text-xl font-heading">
            <ShoppingBag className="text-primary" size={22} />
            Tu Pedido
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-foreground hover:bg-primary hover:text-white transition-colors duration-200"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Delivery Method Selector */}
        <div className="p-5 border-b border-DEFAULT bg-secondary/20">
          <div className="flex bg-secondary p-1 rounded-xl border border-DEFAULT/50">
            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`flex-grow py-2.5 text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                deliveryMethod === "delivery"
                  ? "bg-white dark:bg-card text-primary shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <i className="fa-solid fa-truck text-[0.75rem]"></i>
              Reparto
            </button>
            <button
              onClick={() => setDeliveryMethod("takeaway")}
              className={`flex-grow py-2.5 text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                deliveryMethod === "takeaway"
                  ? "bg-white dark:bg-card text-success shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <i className="fa-solid fa-store text-[0.75rem]"></i>
              Retiro Local
            </button>
          </div>
        </div>

        {/* Items Container */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted gap-4">
              <ShoppingBag size={48} className="opacity-15 text-primary animate-pulse" />
              <p className="font-semibold text-sm">Tu carrito está vacío</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 px-6 py-2.5 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            items.map((item) => {
              const originalProd = PRODUCTS.find((p) => p.id === item.id);
              const price =
                deliveryMethod === "delivery" ? item.priceDelivery : item.priceTakeaway;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 border border-DEFAULT rounded-xl p-4 bg-secondary/15 hover:bg-secondary/25 transition-colors duration-200 relative group/item"
                >
                  {/* Item Icon */}
                  <div className="w-16 h-16 bg-secondary/35 rounded-lg flex items-center justify-center flex-shrink-0 border border-DEFAULT/50 overflow-hidden relative">
                    {originalProd?.iconType === "svg" ? (
                      <div
                        className="scale-75 opacity-75"
                        dangerouslySetInnerHTML={{ __html: originalProd.iconContent }}
                      />
                    ) : originalProd?.iconContent ? (
                      <div className="relative w-11 h-11">
                        <Image
                          src={originalProd.iconContent}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <Droplet className="text-primary opacity-60" size={24} />
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-bold text-foreground text-xs leading-snug line-clamp-2 pr-5">
                          {item.title}
                        </h4>
                        <div className="text-[0.75rem] text-secondary font-bold mt-1">
                          ${price.toLocaleString("es-AR")} c/u
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted hover:text-danger p-1 absolute top-3 right-3 opacity-60 hover:opacity-100 transition-all duration-200"
                        title="Quitar producto"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="mt-auto flex justify-between items-end pt-2">
                      <div className="flex flex-col">
                        <span className="text-[0.6rem] text-muted font-bold tracking-wider mb-0.5">
                          Subtotal
                        </span>
                        <span className="font-extrabold text-[0.88rem] text-primary">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center bg-white dark:bg-card border border-DEFAULT rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary text-foreground transition-colors"
                          aria-label="Disminuir"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary text-foreground transition-colors"
                          aria-label="Incrementar"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-secondary/50 border-t border-DEFAULT space-y-4">
            <div className="flex justify-between items-center text-foreground font-bold text-lg font-heading">
              <span>Subtotal Estimado:</span>
              <span className="text-primary text-xl">{formatPrice(total)}</span>
            </div>

            <button
              onClick={handleCheckoutOpen}
              className="w-full py-3.5 bg-success text-white font-bold text-sm rounded-xl shadow-lg shadow-success/20 hover:shadow-xl hover:bg-success-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 duration-300"
            >
              <i className="fa-solid fa-truck-ramp-box text-xs"></i>
              Confirmar y Enviar Pedido
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-muted font-semibold hover:text-danger transition-colors text-xs text-center block"
            >
              Vaciar mi carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
