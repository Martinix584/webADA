"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Truck, Coins, RefreshCw, Globe, AlertTriangle, FileEdit, Scale } from "lucide-react";

export default function TerminosPage() {
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
          <span className="text-primary uppercase font-bold tracking-widest text-[0.65rem] mb-2 block">
            Última actualización: Junio de 2026
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 font-heading tracking-tight">
            Términos y Condiciones
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            Bienvenido a Almacén de Agua. Al navegar por nuestro sitio web, registrarte como cliente o solicitar nuestros servicios, aceptás cumplir estos términos.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          
          {/* Card 1 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <BookOpen className="text-primary" size={20} />
              1. Objeto del Servicio
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Almacén de Agua, con domicilio operativo en Beltrán Sur 423, Godoy Cruz, Mendoza, brinda servicios de venta y distribución de agua purificada, sodas y equipamiento de hidratación (como dispensers frío/calor o naturales) tanto para la modalidad de Hogares como de Empresas en la provincia de Mendoza.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Truck className="text-primary" size={20} />
              2. Zona de Cobertura y Entregas
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-xs sm:text-sm text-secondary">
              <li>
                <strong>Zona de Reparto:</strong> Las entregas a domicilio sin cargo se limitan estrictamente a las zonas y departamentos de la provincia de Mendoza que integran nuestra ruta comercial activa. Almacén de Agua se reserva el derecho de rechazar pedidos que se encuentren fuera de nuestra zona de cobertura o que presenten dificultades logísticas insalvables.
              </li>
              <li>
                <strong>Coordinación de Logística:</strong> Las entregas se coordinan previamente fijando una franja horaria estimada. El cliente se compromete a garantizar que habrá una persona mayor de edad en el domicilio para recibir el pedido.
              </li>
              <li>
                <strong>Modificaciones en la Ruta:</strong> Nos reservamos el derecho de modificar los días y horarios de reparto debido a feriados, condiciones climáticas adversas o fuerza mayor, notificando al cliente a la brevedad.
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Coins className="text-primary" size={20} />
              3. Precios y Formas de Pago
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-xs sm:text-sm text-secondary">
              <li>
                <strong>Transparencia de Precios:</strong> Todos los precios publicados en el sitio web o informados por nuestros canales oficiales corresponden a la moneda de curso legal en Argentina (Pesos Argentinos) y están sujetos a modificaciones sin previo aviso debido a condiciones del mercado.
              </li>
              <li>
                <strong>Modalidad de Pago:</strong> Tal como se detalla en nuestra Política de Privacidad, este sitio web no almacena ni procesa datos de tarjetas de crédito o débito. Todos los pagos se realizan de forma directa contra entrega, mediante efectivo, transferencias digitales (como Mercado Pago) o los medios acordados previamente con el personal de reparto.
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <RefreshCw className="text-primary" size={20} />
              4. Política de Envases Retornables y Comodatos
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-xs sm:text-sm text-secondary">
              <li>
                <strong>Propiedad de los Envases:</strong> Los bidones retornables de 12 y 20 litros, así como los cajones de soda, son propiedad exclusiva de Almacén de Agua (o en su defecto, de la marca distribuida Puragua). El cliente abona por el líquido contenido y el servicio de distribución, no por el envase en sí.
              </li>
              <li>
                <strong>Cuidado del Material:</strong> El cliente es responsable del cuidado y la correcta conservación de los envases retornables mientras permanezcan en su domicilio o comercio. No se permite rellenar los envases con ningún otro líquido ajeno al provisto por la empresa.
              </li>
              <li>
                <strong>Contratos de Comodato:</strong> La provisión de dispensers frío/calor o estructuras de soporte se rige bajo la modalidad de comodato (préstamo de uso gratuito u oneroso según el abono contratado). El cliente se compromete a devolver el equipamiento en las mismas condiciones higiénicas y de funcionamiento en las que fue entregado al momento de finalizar la relación comercial.
              </li>
            </ul>
          </div>

          {/* Card 5 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Globe className="text-primary" size={20} />
              5. Uso Aceptable del Sitio Web
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
              El usuario se compromete a utilizar el sitio web (formularios de registro, cotizadores, etc.) de manera legítima. Queda estrictamente prohibido:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-xs sm:text-sm text-secondary">
              <li>
                Introducir información falsa, inexacta o que suplante la identidad de terceros.
              </li>
              <li>
                Utilizar el sitio para enviar malware, realizar ataques informáticos o interferir con el correcto funcionamiento de los servidores de Almacén de Agua.
              </li>
            </ul>
          </div>

          {/* Card 6 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <AlertTriangle className="text-primary" size={20} />
              6. Limitación de Responsabilidad
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Almacén de Agua trabaja bajo estrictos controles bromatológicos y de calidad. No obstante, la empresa no se hace responsable por inconvenientes derivados del mal uso, almacenamiento inadecuado (por ejemplo, exponer los bidones a la luz solar directa prolongada o fuentes de calor) o manipulación deficiente de los productos y dispensers por parte del cliente una vez entregados.
            </p>
          </div>

          {/* Card 7 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <FileEdit className="text-primary" size={20} />
              7. Modificación de los Términos
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de estos Términos de Servicio en cualquier momento. Es responsabilidad del usuario revisar esta página periódicamente para verificar cambios.
            </p>
          </div>

          {/* Card 8 */}
          <div className="bg-glass-bg border border-glass rounded-[2rem] p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-extrabold text-foreground mb-4 font-heading border-b border-DEFAULT pb-3 flex items-center gap-2.5">
              <Scale className="text-primary" size={20} />
              8. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Estos Términos de Servicio se rigen e interpretan de acuerdo con las leyes de la República Argentina, incluyendo el Código Civil y Comercial de la Nación (especialmente en lo regulado para los contratos de comodato) y la Ley N° 24.240 de Defensa del Consumidor. Para todas las cuestiones judiciales o extrajudiciales que pudieran derivarse de la interpretación, cumplimiento o ejecución de estos Términos, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Provincia de Mendoza, renunciando a cualquier otro fuero o jurisdicción.
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
