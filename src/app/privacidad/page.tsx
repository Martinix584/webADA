"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert, Database, Target, Lock, UserCog } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen py-24 px-6 relative z-10 flex flex-col items-center">
      <div className="max-w-[800px] w-full mx-auto text-left">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-semibold mb-8"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </Link>

        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 font-heading tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            Tu confianza es lo más importante. Conocé cómo resguardamos y tratamos los datos personales de nuestros clientes de Mendoza.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          
          {/* Card 1 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <ShieldAlert className="text-primary" size={20} />
              1. Responsable del Tratamiento
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              El sitio web y los servicios de reparto de bidones y dispensers son operados bajo la denominación comercial de <strong>Almacén de Agua</strong>, con domicilio de operaciones y distribución en Mendoza, Argentina.
            </p>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Nos comprometemos a garantizar la protección, confidencialidad y seguridad de los datos personales de nuestros usuarios y clientes, en total conformidad con la <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Database className="text-primary" size={20} />
              2. Datos que Recolectamos
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              Para poder procesar tus pedidos en línea, gestionar tus contratos de comodato (préstamo de envases/dispensers) y realizar entregas a domicilio sin cargo, solicitamos únicamente la información necesaria:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-secondary mb-4">
              <li>
                <strong>Datos de Identificación:</strong> Nombre y Apellido (o Razón Social en el caso de Empresas).
              </li>
              <li>
                <strong>Datos de Envío y Ruta:</strong> Dirección exacta de entrega, departamento (Mendoza), coordenadas de geolocalización (opcional para facilitar el reparto) y notas o indicaciones específicas para el repartidor.
              </li>
              <li>
                <strong>Datos de Contacto:</strong> Número de teléfono / celular (para coordinación por WhatsApp y llamadas operativas).
              </li>
              <li>
                <strong>Datos de Consumo y Preferencia:</strong> Tipo de cliente (Hogar o Empresa), abono o productos seleccionados en tu pedido y franja horaria preferida de entrega.
              </li>
            </ul>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed italic opacity-85">
              Nota: Este sitio web <strong>no</strong> solicita ni almacena datos de tarjetas de crédito o débito, ya que todos los pagos se efectúan contra entrega en efectivo, transferencia o por los medios coordinados directamente al momento del reparto.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Target className="text-primary" size={20} />
              3. Finalidad del Tratamiento
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              Tus datos personales son recolectados con las siguientes finalidades legítimas y exclusivas:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-secondary mb-4">
              <li>Planificar y optimizar las rutas de distribución de agua y dispensers en los departamentos del Gran Mendoza.</li>
              <li>Coordinar detalles de logística, horarios e imprevistos de entrega mediante mensajes de WhatsApp o llamadas directas.</li>
              <li>Gestionar los comodatos vigentes de envases retornables y dispensers frío-calor asociados a tu nombre.</li>
              <li>Resolver dudas técnicas o reclamos a través del soporte de atención al cliente.</li>
              <li>Enviar información relevante sobre el servicio, días feriados o cambios en el cronograma de reparto.</li>
            </ul>
            <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-4 my-4">
              <p className="text-xs sm:text-sm text-foreground font-semibold flex items-center gap-1.5">
                💧 <span>Compromiso ADA:</span> Tus datos personales NUNCA serán vendidos, alquilados ni transferidos a terceras empresas bajo ningún concepto comercial.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Lock className="text-primary" size={20} />
              4. Almacenamiento Seguro y Conservación
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              Los datos ingresados en el formulario de registro y en el cotizador son almacenados de forma segura utilizando proveedores de infraestructura en la nube con altos estándares de encriptación.
            </p>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Conservaremos tus datos personales únicamente mientras se mantenga activa la relación comercial (servicios de reparto periódicos o comodatos activos) o hasta que solicites expresamente la eliminación o rectificación de los mismos.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <UserCog className="text-primary" size={20} />
              5. Tus Derechos (Acceso, Rectificación y Supresión)
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              De acuerdo con la legislación argentina, tenés pleno derecho a controlar tu información. Podés ejercer tus derechos de:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-secondary mb-4">
              <li><strong>Acceso:</strong> Solicitar información sobre qué datos personales tuyos poseemos.</li>
              <li><strong>Rectificación:</strong> Corregir o actualizar cualquier dato inexacto o incompleto (por ejemplo, si cambiaste de celular o de domicilio).</li>
              <li><strong>Supresión:</strong> Solicitar que eliminemos de manera definitiva tus datos de nuestros registros y bases de datos.</li>
            </ul>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Para hacer valer cualquiera de estos derechos, simplemente podés enviarnos un correo electrónico detallando tu solicitud a:{" "}
              <a href="mailto:contacto@almacendeagua.com.ar" className="text-primary hover:underline font-bold">
                contacto@almacendeagua.com.ar
              </a>
              .
            </p>
          </div>

        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex gap-4 justify-center mt-10">
          <Link
            href="/"
            className="px-6 py-3 bg-secondary hover:bg-secondary/70 border border-DEFAULT text-secondary-foreground hover:text-foreground font-bold text-xs rounded-xl flex items-center justify-center gap-2 duration-300 shadow-sm"
          >
            <ArrowLeft size={14} />
            Volver al Inicio
          </Link>
          <Link
            href="/registro"
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 duration-300 shadow-md shadow-primary/20"
          >
            Ir al Registro <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
