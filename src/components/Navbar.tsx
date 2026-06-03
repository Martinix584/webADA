"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Sun, Moon, Scale } from "lucide-react";
import { useCart } from "@/store/useCart";
import Image from "next/image";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((s) => s.items);
  const setCartOpen = useCart((s) => s.setCartOpen);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-DEFAULT backdrop-blur-md ${
        scrolled
          ? "h-[105px] bg-header/95 shadow-md"
          : "h-[145px] bg-header"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className={`relative transition-all duration-300 flex items-center justify-center group-hover:scale-105 ${
            scrolled ? "w-[160px] h-[50px] md:w-[200px] md:h-[60px]" : "w-[180px] h-[55px] md:w-[260px] md:h-[80px]"
          }`}>
            <Image
              src="/assets/LOGOFINAL-removebg-preview.png"
              alt="Logo Almacén de Agua"
              fill
              sizes="(max-width: 768px) 200px, 260px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desk Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 h-full">
          <Link
            href="/"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#servicios"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/productos"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Productos
          </Link>

          <Link
            href="/#cotizador"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Planes
          </Link>
          <Link
            href="/#eco"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Sustentabilidad
          </Link>
          <Link
            href="/#nosotros"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/#contacto"
            className="px-3 py-2 rounded-lg font-semibold text-[0.88rem] text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Contacto
          </Link>

          <Link
            href="/registro"
            className="ml-2 mr-4 px-5 py-2 border-2 border-primary rounded-full font-bold text-[0.82rem] text-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Quiero ser cliente
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-DEFAULT bg-glass-bg shadow-sm text-foreground hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
              aria-label="Cambiar tema"
              title="Alternar Modo Claro/Oscuro"
            >
              {theme === "dark" ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
            </button>
          )}

          <button
            onClick={() => setCartOpen(true)}
            className="relative w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-DEFAULT bg-glass-bg shadow-sm text-foreground hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
            aria-label="Ver carrito"
            title="Ver Carrito"
          >
            <ShoppingCart size={16} className="md:w-[18px] md:h-[18px]" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[0.6rem] md:text-[0.65rem] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-DEFAULT bg-glass-bg shadow-sm text-foreground hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-card border-b border-DEFAULT shadow-lg z-40 animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/#servicios"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="/productos"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Productos
            </Link>

            <Link
              href="/#cotizador"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Planes
            </Link>
            <Link
              href="/#eco"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Sustentabilidad
            </Link>
            <Link
              href="/#nosotros"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Contacto
            </Link>

            <Link
              href="/registro"
              onClick={() => setMobileOpen(false)}
              className="mx-4 mt-2 px-5 py-2.5 border-2 border-primary rounded-full font-bold text-sm text-primary hover:bg-primary hover:text-white transition-colors text-center"
            >
              Quiero ser cliente
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
