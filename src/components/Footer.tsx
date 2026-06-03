import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-DEFAULT pt-16 pb-8 relative z-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 block w-[240px] h-[72px] hover:scale-105 transition-transform duration-300 shrink-0 relative">
              <Image
                src="/assets/LOGOFINAL-removebg-preview.png"
                alt="Logo Almacén de Agua"
                fill
                sizes="240px"
                className="object-contain"
              />
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Desde 2015, brindamos soluciones de hidratación pura y segura en toda la provincia de Mendoza. Cuidando la salud de tu familia, la de tu comercio y el medio ambiente.
            </p>
            <div className="flex gap-4 text-secondary">
              <a href="https://www.facebook.com/ALMACENDEAGUAMZA/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook text-xl"></i>
              </a>
              <a href="https://www.instagram.com/almacendeaguamza/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a href="https://wa.me/5492613312121" className="hover:text-primary transition-colors" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-[0.8rem] tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="text-secondary hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="text-secondary hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#catalogo" className="text-secondary hover:text-primary transition-colors">
                  Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link href="/#cotizador" className="text-secondary hover:text-primary transition-colors">
                  Calculadora de Planes
                </Link>
              </li>
              <li>
                <Link href="/#eco" className="text-secondary hover:text-primary transition-colors">
                  Sustentabilidad
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="text-secondary hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-[0.8rem] tracking-wider">Nuestros Servicios</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/#catalogo" className="text-secondary hover:text-primary transition-colors">
                  Alquiler de Dispensers
                </Link>
              </li>
              {/* <li>
                <Link href="/#catalogo" className="text-secondary hover:text-primary transition-colors">
                  Venta de Purificadores
                </Link>
              </li> */}
              <li>
                <Link href="/#catalogo" className="text-secondary hover:text-primary transition-colors">
                  Reparto de Bidones y Soda
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-secondary hover:text-primary transition-colors">
                  Servicio Técnico Oficial
                </Link>
              </li>
              <li>
                <Link
                  href="/analisis"
                  className="text-secondary hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <FileText size={16} className="text-primary" />
                  Análisis de Agua (PDF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase text-[0.8rem] tracking-wider">Contacto Local</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-secondary">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Beltr%C3%A1n+Sur+423%2C+Godoy+Cruz%2C+Mendoza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors leading-relaxed"
                >
                  Beltrán Sur 423, Godoy Cruz, Mendoza
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-secondary flex-wrap">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+542614226402" className="hover:text-primary transition-colors">
                  4226402
                </a>
                <span className="text-muted mx-1">|</span>
                <i className="fa-brands fa-whatsapp text-lg text-primary shrink-0"></i>
                <a
                  href="https://wa.me/5492613312121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  261 331 2121
                </a>
              </li>
              <li className="flex items-center gap-3 text-secondary">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:contacto@almacendeagua.com.ar" className="hover:text-primary transition-colors">
                  contacto@almacendeagua.com.ar
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-DEFAULT flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted leading-relaxed">
            &copy; {new Date().getFullYear()} Almacén de Agua. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/privacidad" className="hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <span>|</span>
            <Link href="/terminos" className="hover:text-primary transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-DEFAULT/50 text-center text-xs text-muted">
          <p>
            Diseñado y desarrollado por{" "}
            <span className="font-medium">
              Martín Porollán
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
