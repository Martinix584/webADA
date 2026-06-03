"use client";

import { useState } from "react";
import Link from "next/link";
import { User, MapPin, FileText, Check, ArrowLeft, Loader2, ShoppingCart, Home } from "lucide-react";

export default function RegistroPage() {
  const [clientType, setClientType] = useState<"hogar" | "empresa">("hogar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [apt, setApt] = useState("");
  const [reference, setReference] = useState("");
  const [comodatoAccepted, setComodatoAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientType || !name || !phone || !address || !locality || !comodatoAccepted) return;

    setLoading(true);

    const typeStr = clientType === "empresa" ? "Empresa / Oficina / Comercio" : "Particular / Hogar";
    const nameLabelStr = clientType === "empresa" ? "Razón Social" : "Nombre";
    const WHATSAPP_PHONE = "5492613312121";

    // Build WhatsApp message
    let msg = `💧 *ALTA DE NUEVO CLIENTE — Almacén de Agua*\n\n`;
    msg += `*Tipo de Cliente:* ${typeStr}\n`;
    msg += `*${nameLabelStr}:* ${name}\n`;
    msg += `*Teléfono:* ${phone}\n`;
    if (email) msg += `*Email:* ${email}\n`;
    msg += `\n*📍 DIRECCIÓN DE ENTREGA:*\n`;
    msg += `*Dirección:* ${address}${apt ? ", " + apt : ""}\n`;
    msg += `*Localidad:* ${locality}\n`;
    if (reference) msg += `*Referencia:* ${reference}\n`;
    msg += `\n✅ _El cliente aceptó los términos de Comodato de Envases._\n`;
    msg += `\n_Registro generado desde el sitio web de Almacén de Agua._`;

    try {
      // POST registration details to DB
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_type: clientType,
          name,
          phone,
          email: email || null,
          address,
          locality,
          apt: apt || null,
          ref: reference || null,
        }),
      });
    } catch (err) {
      console.error("DB registration error:", err);
    }

    // Launch WhatsApp
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    // Save state & show success
    setRegisteredName(name);
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-24 px-6 relative z-10 flex flex-col items-center">
      <div className="max-w-[680px] w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-semibold mb-8 text-left self-start"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </Link>

        {/* Hero Segment */}
        {!success && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold w-fit mb-5 shadow-sm">
              <i className="fa-solid fa-droplet animate-pulse"></i>
              Alta de Clientes
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 font-heading leading-tight">
              Registrate como cliente 💧
            </h1>
            <p className="text-secondary text-sm max-w-[500px] mx-auto leading-relaxed">
              Completá el formulario y empezá a disfrutar de agua purificada fresca en tu hogar u oficina, con reparto sin cargo en el Gran Mendoza.
            </p>
          </div>
        )}

        {/* SUCCESS SCREEN */}
        {success ? (
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-gradient-to-tr from-primary to-success rounded-full flex items-center justify-center text-white text-3xl mb-8 shadow-xl shadow-success/20 animate-bounce">
              <Check size={38} strokeWidth={3} />
            </div>
            
            <h2 className="text-2xl font-black text-foreground mb-3 font-heading">
              ¡Registro enviado! 🎉
            </h2>
            <p className="text-secondary text-sm max-w-[400px] leading-relaxed mb-6">
              Tu solicitud de alta fue enviada correctamente por WhatsApp. Un asesor de{" "}
              <strong>Almacén de Agua</strong> se pondrá en contacto con vos a la brevedad para confirmar tu registro.
            </p>

            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/10 rounded-full px-4 py-2 text-xs font-extrabold mb-8 shadow-sm">
              <i className="fa-solid fa-user-check"></i>
              {registeredName}
            </span>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-secondary hover:bg-secondary/70 border border-DEFAULT text-secondary-foreground hover:text-foreground font-bold text-xs rounded-xl flex items-center justify-center gap-2 duration-300 shadow-sm"
              >
                <Home size={15} />
                Volver al inicio
              </Link>
              <Link
                href="/#catalogo"
                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 duration-300 shadow-md shadow-primary/20"
              >
                <ShoppingCart size={15} />
                Ver productos
              </Link>
            </div>
          </div>
        ) : (
          /* FORM BODY */
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-left text-[0.72rem] text-muted flex items-center gap-1">
              <span className="text-primary font-bold text-base -mt-0.5">*</span> Los campos marcados son obligatorios.
            </p>

            {/* BLOCK 1: Who you are */}
            <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-DEFAULT pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <User size={18} />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-foreground font-heading">¿Quién sos?</h2>
                  <p className="text-[0.7rem] text-muted">Tus datos de contacto principales</p>
                </div>
              </div>

              {/* Client Type Choice */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-type" className="text-xs font-bold text-secondary">
                  Tipo de cliente <span className="text-primary">*</span>
                </label>
                <select
                  id="reg-type"
                  required
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value as "hogar" | "empresa")}
                  className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-medium"
                >
                  <option value="hogar">Particular / Hogar</option>
                  <option value="empresa">Empresa / Oficina / Comercio</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-name" className="text-xs font-bold text-secondary">
                    {clientType === "empresa" ? "Razón Social / Nombre Comercial" : "Nombre y Apellido"}{" "}
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="reg-name"
                    required
                    placeholder={clientType === "empresa" ? "Ej: Agua y Soluciones S.A." : "Ej: Carlos Gómez"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-phone" className="text-xs font-bold text-secondary">
                    Teléfono de Contacto <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="reg-phone"
                    required
                    placeholder="Ej: 261 555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-email" className="text-xs font-bold text-secondary inline-flex items-center gap-1.5">
                  Email <span className="text-[0.7rem] text-muted font-normal">(Opcional)</span>
                </label>
                <input
                  type="email"
                  id="reg-email"
                  placeholder="Ej: carlos@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* BLOCK 2: Where we deliver */}
            <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-DEFAULT pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-foreground font-heading">¿Dónde entregamos?</h2>
                  <p className="text-[0.7rem] text-muted">Dirección de entrega y referencia</p>
                </div>
              </div>

              {/* Address & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-address" className="text-xs font-bold text-secondary">
                    {clientType === "empresa" ? "Dirección Comercial / Legal" : "Dirección"}{" "}
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="reg-address"
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
                  <label htmlFor="reg-locality" className="text-xs font-bold text-secondary">
                    Localidad / Municipio <span className="text-primary">*</span>
                  </label>
                  <select
                    id="reg-locality"
                    required
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-medium"
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
              </div>

              {/* Apartment & Ref */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-apt" className="text-xs font-bold text-secondary">
                    {clientType === "empresa" ? "Piso / Oficina / Local" : "Piso / Dpto"}{" "}
                    <span className="text-[0.7rem] text-muted font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="reg-apt"
                    placeholder="Ej: Piso 3 - Dpto B"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-ref" className="text-xs font-bold text-secondary">
                    Referencia / Indicaciones{" "}
                    <span className="text-[0.7rem] text-muted font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="reg-ref"
                    placeholder="Ej: Casa con portón verde"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full p-3 border border-DEFAULT rounded-xl bg-card text-foreground text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* BLOCK 3: Terms and Confirmation */}
            <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-DEFAULT pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-foreground font-heading">Confirmación</h2>
                  <p className="text-[0.7rem] text-muted">Aceptación de condiciones de comodato</p>
                </div>
              </div>

              {/* Comodato Checkbox wrapper */}
              <label
                htmlFor="reg-comodato"
                className="flex items-start gap-4 p-4 border border-primary/20 bg-primary/5 rounded-xl cursor-pointer hover:bg-primary/10 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  id="reg-comodato"
                  required
                  checked={comodatoAccepted}
                  onChange={(e) => setComodatoAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary border-DEFAULT rounded cursor-pointer accent-primary focus:ring-primary/20 shrink-0"
                />
                <div className="text-xs leading-relaxed text-secondary select-none">
                  Acepto que los <strong>envases y bidones</strong> son propiedad de <strong>Almacén de Agua</strong> (entregados en comodato). Me comprometo a cuidarlos y devolverlos si discontinuo el servicio, entendiendo que su pérdida o daño puede generar cargos de reposición.
                </div>
              </label>

              <p className="text-[0.7rem] text-muted text-center max-w-[500px] mx-auto leading-relaxed">
                Tus datos personales están seguros. Al registrarte, aceptás nuestros{" "}
                <Link href="/terminos" target="_blank" className="text-primary hover:underline font-bold">
                  Términos de Servicio
                </Link>{" "}
                y el tratamiento de tu información según la{" "}
                <Link href="/privacidad" target="_blank" className="text-primary hover:underline font-bold">
                  Política de Privacidad
                </Link>
                .
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !comodatoAccepted}
                className="w-full py-4 bg-primary text-white hover:bg-primary-hover font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                    Registrarme y confirmar por WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
