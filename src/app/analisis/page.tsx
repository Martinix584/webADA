import Link from "next/link";
import { FileText, ArrowLeft, Download } from "lucide-react";

export default function AnalisisPage() {
  return (
    <div className="min-h-screen relative z-10 flex flex-col items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] dark:bg-primary/10" />
      </div>

      <section className="w-full pt-32 pb-20 px-6 text-center relative overflow-hidden flex flex-col items-center">
        <div className="max-w-[800px] w-full mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative w-full">
            <div className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 flex justify-center md:justify-start w-full md:w-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-semibold"
              >
                <ArrowLeft size={16} />
                Volver al Inicio
              </Link>
            </div>
            <div className="flex justify-center w-full">
              <span className="font-heading font-bold text-primary text-xs uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full dark:bg-primary/20">
                Transparencia
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-4 mb-6 font-heading tracking-tight">
            Control <span className="text-primary">Bromatológico</span>
          </h1>
          <p className="text-secondary text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            Te compartimos los últimos resultados de nuestros análisis de calidad de agua, para que tengas la tranquilidad de consumir lo mejor.
          </p>
        </div>
      </section>

      <section className="max-w-[800px] w-full mx-auto pb-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/assets/Mayo.BACT.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 bg-glass-bg border border-glass rounded-[2rem] p-8 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-foreground font-heading mb-2">Análisis Bacteriológico</h3>
              <p className="text-secondary text-sm mb-4">Certificación de pureza bacteriológica.</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Download size={16} />
              Ver PDF
            </div>
          </a>

          <a
            href="/assets/Mayo.QCO.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 bg-glass-bg border border-glass rounded-[2rem] p-8 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 text-center group"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-foreground font-heading mb-2">Análisis Físico-Químico</h3>
              <p className="text-secondary text-sm mb-4">Composición química del agua.</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Download size={16} />
              Ver PDF
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
