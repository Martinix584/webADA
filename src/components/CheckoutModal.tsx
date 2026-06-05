"use client";

import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import Link from "next/link";

export function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setCheckoutOpen,
    deliveryMethod,
    setDeliveryMethod,
    clearCart,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const [clientType, setClientType] = useState<"hogar" | "empresa">("hogar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [zone, setZone] = useState("");
  const [schedule, setSchedule] = useState("");
  const [notes, setNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isCheckoutOpen) return null;

  const total = items.reduce((acc, item) => {
    const originalProd = PRODUCTS.find((p) => p.id === item.id);
    let price = item.priceDelivery;
    if (deliveryMethod === "takeaway" && originalProd?.takeAwayPrice) {
      price = originalProd.takeAwayPrice;
    }
    return acc + price * item.quantity;
  }, 0);

  const formatPrice = (p: number) =>
    "$" + p.toLocaleString("es-AR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || (deliveryMethod === "delivery" && !zone) || !schedule || !acceptedTerms) return;

    setLoading(true);

    const WHATSAPP_PHONE = "5492613312121";
    let itemsText = "";

    items.forEach((item) => {
      const originalProd = PRODUCTS.find((p) => p.id === item.id);
      let price = item.priceDelivery;
      if (deliveryMethod === "takeaway" && originalProd?.takeAwayPrice) {
        price = originalProd.takeAwayPrice;
      }
      itemsText += `- ${item.quantity}x ${item.title} ($${price.toLocaleString("es-AR")} c/u)\n`;
    });

    const clientTypeStr = clientType === "empresa" ? "Empresa / Oficina" : "Particular / Hogar";
    const nameLabelStr = clientType === "empresa" ? "Razón Social" : "Nombre";
    const addressLabelStr =
      deliveryMethod === "takeaway"
        ? clientType === "empresa"
          ? "Dirección Comercial (Comodato)"
          : "Dirección Particular (Comodato)"
        : "Dirección";

    let formattedText = "";
    if (deliveryMethod === "takeaway") {
      formattedText = `¡Hola Almacén de Agua! Realicé un pedido a través del sitio web para *RETIRAR EN LOCAL (Take Away)*:\n\n*PRODUCTOS:* \n${itemsText}\n*TOTAL CON DESCUENTO RETIRO:* $${total.toLocaleString(
        "es-AR"
      )} (Pago al retirar en tienda)\n\n*DATOS DE RETIRO:*\n- *Tipo de Cliente:* ${clientTypeStr}\n- *${nameLabelStr}:* ${name}\n- *Teléfono:* ${phone}\n- *${addressLabelStr}:* ${address}${
        apartment ? " (" + apartment + ")" : ""
      }\n- *Horario Estimado de Retiro:* ${schedule}${
        notes ? "\n- *Notas/Aclaraciones:* " + notes : ""
      }\n\nMuchas gracias!`;
    } else {
      formattedText = `¡Hola Almacén de Agua! Realicé un pedido a través del sitio web para *ENVÍO A DOMICILIO*:\n\n*PRODUCTOS:* \n${itemsText}\n*TOTAL ESTIMADO:* $${total.toLocaleString(
        "es-AR"
      )} (Pago contra entrega)\n\n*DATOS DE ENTREGA:*\n- *Tipo de Cliente:* ${clientTypeStr}\n- *${nameLabelStr}:* ${name}\n- *Teléfono:* ${phone}\n- *${addressLabelStr}:* ${address}${
        apartment ? " (" + apartment + ")" : ""
      }\n- *Zona:* ${zone}\n- *Preferencia de Horario:* ${schedule}${
        notes ? "\n- *Notas del Repartidor:* " + notes : ""
      }\n\nMuchas gracias!`;
    }

    // Launch WhatsApp link directly
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
        formattedText
      )}`,
      "_blank"
    );

    // Reset Form & Cart
    setName("");
    setPhone("");
    setAddress("");
    setApartment("");
    setNotes("");
    setZone("");
    setSchedule("");
    clearCart();
    setCheckoutOpen(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setCheckoutOpen(false)}
      />

      {/* Modal Dialog container */}
      <div className="relative w-full max-w-[620px] bg-card border border-DEFAULT rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-DEFAULT bg-secondary/10">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2 font-heading">
            <i className="fa-solid fa-truck-ramp-box text-primary"></i>
            Datos de Entrega / Retiro
          </h3>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-primary hover:text-white transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Delivery Choice */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider block">
              Método de Entrega
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === "delivery"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-DEFAULT hover:bg-secondary/40 text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="hidden"
                />
                <i className="fa-solid fa-truck text-lg"></i>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">A Domicilio</span>
                  <span className="text-[0.7rem] opacity-80">Reparto sin cargo</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === "takeaway"
                    ? "border-success bg-success/5 text-success"
                    : "border-DEFAULT hover:bg-secondary/40 text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="takeaway"
                  checked={deliveryMethod === "takeaway"}
                  onChange={() => setDeliveryMethod("takeaway")}
                  className="hidden"
                />
                <i className="fa-solid fa-store text-lg"></i>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Retiro Local</span>
                  <span className="text-[0.7rem] opacity-80">¡Precios especiales!</span>
                </div>
              </label>
            </div>
          </div>

          {/* Client Type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="chk-client-type" className="text-xs font-bold text-muted uppercase tracking-wider">
              Tipo de Cliente
            </label>
            <select
              id="chk-client-type"
              value={clientType}
              onChange={(e) => setClientType(e.target.value as "hogar" | "empresa")}
              className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="hogar">Particular / Hogar</option>
              <option value="empresa">Empresa / Oficina / Comercio</option>
            </select>
          </div>

          {/* Identity Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="chk-name" className="text-xs font-bold text-muted uppercase tracking-wider">
                {clientType === "empresa" ? "Razón Social o Nombre Comercial" : "Nombre y Apellido"}
              </label>
              <input
                type="text"
                id="chk-name"
                required
                placeholder={clientType === "empresa" ? "Ej: Agua y Soluciones S.A." : "Ej: Carlos Gómez"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="chk-phone" className="text-xs font-bold text-muted uppercase tracking-wider">
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                id="chk-phone"
                required
                placeholder="Ej: 261 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Address Line */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="chk-address" className="text-xs font-bold text-muted uppercase tracking-wider">
                {deliveryMethod === "takeaway"
                  ? clientType === "empresa"
                    ? "Dirección Comercial / Legal (Comodato)"
                    : "Dirección Particular (Comodato)"
                  : clientType === "empresa"
                  ? "Dirección de Entrega (Comercial)"
                  : "Dirección de Entrega"}
              </label>
              <input
                type="text"
                id="chk-address"
                required
                placeholder={
                  clientType === "empresa" ? "Ej: Av. San Martín 1234, Of. 4A" : "Ej: Av. San Martín 1234"
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="chk-apartment" className="text-xs font-bold text-muted uppercase tracking-wider">
                Piso / Dpto / Of.
              </label>
              <input
                type="text"
                id="chk-apartment"
                placeholder="Ej: Piso 2 - Dpto B"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Zone & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliveryMethod === "delivery" ? (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="chk-zone" className="text-xs font-bold text-muted uppercase tracking-wider">
                  Zona (Gran Mendoza)
                </label>
                <select
                  id="chk-zone"
                  required
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Seleccioná tu localidad
                  </option>
                  <option value="Godoy Cruz">Godoy Cruz</option>
                  <option value="Ciudad de Mendoza">Ciudad de Mendoza</option>
                  <option value="Guaymallén">Guaymallén</option>
                  <option value="Maipú">Maipú</option>
                  <option value="Luján de Cuyo">Luján de Cuyo</option>
                  <option value="Las Heras">Las Heras</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Lugar de Retiro
                </label>
                <input
                  type="text"
                  disabled
                  value="Tienda física (Godoy Cruz, Mendoza)"
                  className="w-full p-3 border border-DEFAULT rounded-xl bg-secondary/40 text-secondary-foreground text-sm outline-none cursor-not-allowed font-medium"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="chk-schedule" className="text-xs font-bold text-muted uppercase tracking-wider">
                {deliveryMethod === "takeaway" ? "Horario Estimado de Retiro" : "Franja Horaria Preferencial"}
              </label>
              <select
                id="chk-schedule"
                required
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Seleccioná horario
                </option>
                {deliveryMethod === "takeaway" ? (
                  <>
                    <option value="Mañana (09:00 - 13:00)">Mañana (09:00 - 13:00)</option>
                    <option value="Tarde (13:00 - 19:00)">Tarde (13:00 - 19:00)</option>
                  </>
                ) : (
                  <>
                    <option value="Mañana (09:00 - 13:00)">Mañana (09:00 - 13:00)</option>
                    <option value="Tarde (13:00 - 19:00)">Tarde (13:00 - 19:00)</option>
                    <option value="Indiferente (Cualquier horario comercial)">Cualquier Horario Comercial</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="chk-notes" className="text-xs font-bold text-muted uppercase tracking-wider">
              {deliveryMethod === "takeaway" ? "Notas o Aclaraciones (Opcional)" : "Indicaciones para el Repartidor (Opcional)"}
            </label>
            <textarea
              id="chk-notes"
              rows={2}
              placeholder="Ej: Dejar en portería, portón verde, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Terms & Conditions (Comodato) */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl mt-4">
            <input
              type="checkbox"
              id="chk-terms"
              required
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-primary rounded border-DEFAULT focus:ring-primary accent-primary cursor-pointer shrink-0"
            />
            <label htmlFor="chk-terms" className="text-xs text-foreground cursor-pointer leading-relaxed">
              Acepto las <strong>Condiciones de Comodato</strong>, declarando que los envases y/o equipos entregados en préstamo son propiedad exclusiva de Almacén de Agua y me comprometo a devolverlos en las mismas condiciones o abonar su valor de reposición. Asimismo, declaro estar de acuerdo con los <Link href="/terminos" target="_blank" className="text-primary hover:underline font-bold">Términos de Servicio</Link> y la <Link href="/privacidad" target="_blank" className="text-primary hover:underline font-bold">Política de Privacidad</Link>.
            </label>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-secondary/35 border border-DEFAULT space-y-3">
            <h4 className="font-bold text-xs text-muted uppercase tracking-wider">
              Resumen del Pedido:
            </h4>
            <ul className="divide-y divide-DEFAULT/30 space-y-2">
              {items.map((item) => {
                const originalProd = PRODUCTS.find((p) => p.id === item.id);
                let price = item.priceDelivery;
                if (deliveryMethod === "takeaway" && originalProd?.takeAwayPrice) {
                  price = originalProd.takeAwayPrice;
                }
                return (
                  <li key={item.id} className="flex justify-between items-center text-xs pt-2">
                    <span className="font-medium text-foreground">
                      {item.quantity}x {item.title}
                    </span>
                    <span className={`font-bold ${deliveryMethod === "takeaway" && originalProd?.takeAwayPrice ? "text-success" : "text-primary"}`}>
                      {formatPrice(price * item.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between items-center pt-3 border-t border-DEFAULT/50">
              <span className="font-bold text-sm text-foreground">Total (Pago contra entrega):</span>
              <span className="font-extrabold text-lg text-primary">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="flex-1 py-3 bg-secondary hover:bg-secondary/70 border border-DEFAULT text-foreground font-bold text-xs rounded-xl transition-all"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="flex-1 py-3 bg-success hover:bg-success-hover text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Procesando...
                </>
              ) : (
                <>
                  <i className="fa-brands fa-whatsapp"></i> Confirmar Pedido
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
