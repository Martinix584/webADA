"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, DollarSign, HelpCircle, Truck, ShieldCheck, UserPlus, Phone, Home, Droplet, Package, RefreshCw, Wrench, ShoppingCart, MapPin } from "lucide-react";
import Link from "next/link";

interface ChatOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: React.ReactNode;
  isTyping?: boolean;
  options?: ChatOption[];
}

const MENU_PRINCIPAL_OPTIONS: ChatOption[] = [
  { id: "menu_precios", label: "Precios", icon: <DollarSign size={14} /> },
  { id: "menu_faq", label: "Preguntas Frecuentes", icon: <HelpCircle size={14} /> },
  { id: "menu_zona", label: "Zona de Reparto", icon: <Truck size={14} /> },
  { id: "menu_calidad", label: "Calidad y Control", icon: <ShieldCheck size={14} /> },
  { id: "menu_registro", label: "Registro de Cliente", icon: <UserPlus size={14} /> },
  { id: "menu_contacto", label: "Contacto / WhatsApp", icon: <Phone size={14} /> },
];

const PRECIOS_OPTIONS: ChatOption[] = [
  { id: "precio_agua", label: "Agua y Soda", icon: <Droplet size={14} /> },
  { id: "precio_dispensers", label: "Dispensers", icon: <Package size={14} /> },
  { id: "menu_principal", label: "Volver al Menú Principal", icon: <Home size={14} /> },
];

const FAQ_OPTIONS: ChatOption[] = [
  { id: "faq_zonas", label: "Zonas de cobertura", icon: <MapPin size={14} /> },
  { id: "faq_botellones", label: "Sistema de botellones", icon: <RefreshCw size={14} /> },
  { id: "faq_bidon_vs_red", label: "Bidón vs Red", icon: <Droplet size={14} /> },
  { id: "faq_mantenimiento", label: "Mantenimiento alquileres", icon: <Wrench size={14} /> },
  { id: "faq_como_pedir", label: "Cómo pedir", icon: <ShoppingCart size={14} /> },
  { id: "menu_principal", label: "Volver al Menú Principal", icon: <Home size={14} /> },
];

const BACK_TO_MENU_OPTION: ChatOption[] = [
  { id: "menu_principal", label: "Volver al Menú Principal", icon: <Home size={14} /> },
];

// Fallback keyword base
const KNOWLEDGE_BASE = [
  { keywords: ["osmosis", "ósmosis", "tratada", "purificada"], responseId: "menu_calidad" },
  { keywords: ["precio", "precios", "cuanto", "cuánto", "costo", "sale", "salen", "valor"], responseId: "menu_precios" },
  { keywords: ["soda", "sifón", "sifon", "sifones"], responseId: "precio_agua" },
  { keywords: ["envase", "envases", "policarbonato", "plastico", "plástico", "material"], responseId: "faq_botellones" },
  { keywords: ["envio", "envío", "reparto", "domicilio", "llegan", "zona"], responseId: "menu_zona" },
  { keywords: ["bromatologico", "bromatológico", "control", "salud", "higiene", "calidad", "certificacion", "certificación"], responseId: "menu_calidad" },
  { keywords: ["registro", "registrarme", "cuenta", "cliente", "nuevo", "usuario"], responseId: "menu_registro" },
  { keywords: ["hola", "buenas", "buen dia", "buen día", "buenas tardes", "buenas noches", "menu", "menú"], responseId: "menu_principal" },
];

export const ChatbotBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! Soy la asistente virtual de Almacén de Agua 💧. ¿En qué te puedo ayudar hoy?",
      options: MENU_PRINCIPAL_OPTIONS,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: React.ReactNode, options?: ChatOption[], delay = 600) => {
    const typingId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: typingId, sender: "bot", text: "...", isTyping: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== typingId));
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text,
        options,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, delay);
  };

  const handleAction = (actionId: string, userText?: string) => {
    if (userText) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text: userText },
      ]);
    }

    switch (actionId) {
      case "menu_principal":
        addBotMessage("Aquí tenés el menú principal. ¿Qué te gustaría consultar?", MENU_PRINCIPAL_OPTIONS);
        break;
      case "menu_precios":
        addBotMessage("Genial, ¿qué precios te gustaría ver?", PRECIOS_OPTIONS);
        break;
      case "precio_agua":
        addBotMessage(
          <div>
            <p>Nuestros precios actuales:</p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li><strong>Bidón 20L:</strong> $7.500 ($5.500 retiro en fábrica)</li>
              <li><strong>Bidón 12L:</strong> $5.500 ($4.000 retiro en fábrica)</li>
              <li><strong>Soda 1.5L:</strong> $1.200 ($1.000 retiro en fábrica)</li>
            </ul>
            <div className="mt-3">
              <Link href="/productos" className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-200 transition">
                📦 Ver catálogo completo
              </Link>
            </div>
          </div>,
          BACK_TO_MENU_OPTION
        );
        break;
      case "precio_dispensers":
        addBotMessage(
          <div>
            <p>Tenemos gran variedad de dispensers según tu necesidad:</p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li><strong>Natural (soporte):</strong> $10.000</li>
              <li><strong>Frío/Calor Básicos:</strong> Desde $260.000 (Monocasco)</li>
              <li><strong>Premium con Heladera/Hielo:</strong> Hasta $580.000 (Platinum Digital con Hielo)</li>
            </ul>
            <div className="mt-3">
              <Link href="/productos" className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-200 transition">
                📦 Ver catálogo completo
              </Link>
            </div>
          </div>,
          BACK_TO_MENU_OPTION
        );
        break;
      case "menu_faq":
        addBotMessage("Seleccioná la pregunta frecuente que quieras leer:", FAQ_OPTIONS);
        break;
      case "faq_zonas":
        addBotMessage("Nuestra zona de reparto cubre todo el Gran Mendoza: Ciudad de Mendoza, Godoy Cruz, Maipú, Luján de Cuyo, Guaymallén y Las Heras. El envío a domicilio es 100% gratuito si cumplís con la entrega programada de tu zona semanal.", BACK_TO_MENU_OPTION);
        break;
      case "faq_botellones":
        addBotMessage("En tu primera compra abonás el envase como comodato o depósito inicial por única vez (si ya tenés envases de otra marca similares en perfecto estado, los recibimos previa inspección sin cargo adicional). En las siguientes visitas del repartidor, solo pagás el contenido de agua y nos entregás tus envases vacíos.", BACK_TO_MENU_OPTION);
        break;
      case "faq_bidon_vs_red":
        addBotMessage("El dispenser a bidón requiere recambio manual y es ideal para lugares sin toma de agua. El dispenser a red se conecta directo a la cañería, cuenta con filtrado interno (sedimentos/carbón activado) y brinda agua ilimitada, ideal para comercios u oficinas.", BACK_TO_MENU_OPTION);
        break;
      case "faq_mantenimiento":
        addBotMessage("¡Sí, absolutamente! Todos nuestros abonos de alquiler mensual incluyen el servicio técnico oficial, la higienización programada semestral y el cambio periódico de filtros purificadores anuales sin ningún costo adicional.", BACK_TO_MENU_OPTION);
        break;
      case "faq_como_pedir":
        addBotMessage("Es súper fácil: podés agregar productos al carrito desde nuestro catálogo, completar tus datos de envío y confirmar. Automáticamente se abrirá WhatsApp con un mensaje pre-armado para agendar tu pedido de inmediato.", BACK_TO_MENU_OPTION);
        break;
      case "menu_zona":
        addBotMessage("Realizamos reparto a domicilio exclusivamente en todo el Gran Mendoza. Si tu domicilio está en esta zona, el envío a domicilio es 100% gratuito según la programación semanal.", BACK_TO_MENU_OPTION);
        break;
      case "menu_calidad":
        addBotMessage("Nuestra agua es tratada por ósmosis inversa y ozonizada, un doble proceso único en Mendoza. Además, contamos con un estricto control bromatológico permanente y certificaciones RNE/RNPA, garantizando máxima pureza y bajo contenido de sodio.", BACK_TO_MENU_OPTION);
        break;
      case "menu_registro":
        addBotMessage("¡Podés registrarte como cliente en nuestra página web! Crear una cuenta te permite agilizar tus pedidos futuros, guardar tu dirección de reparto en el Gran Mendoza y llevar el control de tus consumos.", BACK_TO_MENU_OPTION);
        break;
      case "menu_contacto":
        addBotMessage(
          <div>
            <p>Podés contactarnos directamente a través de nuestro WhatsApp oficial para atención rápida:</p>
            <div className="mt-3">
              <a href="https://wa.me/5492611234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#128C7E] transition">
                <Phone size={14} /> Abrir WhatsApp
              </a>
            </div>
          </div>,
          BACK_TO_MENU_OPTION
        );
        break;
      default:
        addBotMessage("Interesante. Por el momento soy un asistente en desarrollo, pero podés navegar por las opciones del menú o contactarnos.", BACK_TO_MENU_OPTION);
        break;
    }
  };

  const handleSendText = () => {
    const text = inputValue.trim();
    if (!text) return;

    setInputValue("");
    
    // Keyword matching fallback
    const lowerInput = text.toLowerCase();
    let foundId = "";
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.keywords.some((kw) => lowerInput.includes(kw))) {
        foundId = entry.responseId;
        break;
      }
    }

    if (foundId) {
      handleAction(foundId, text);
    } else if (
      lowerInput.includes("desarrollador") ||
      lowerInput.includes("programador") ||
      lowerInput.includes("creador") ||
      lowerInput.includes("quien hizo") ||
      lowerInput.includes("quien creo")
    ) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text },
      ]);
      addBotMessage(
        "Esta web fue desarrollada, diseñada y programada íntegramente por Martín Porollan. Un crack. 🚀",
        BACK_TO_MENU_OPTION
      );
    } else {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text },
      ]);
      addBotMessage("No entendí exactamente tu consulta, pero podés seleccionar una de las siguientes opciones o reformular tu pregunta:", MENU_PRINCIPAL_OPTIONS);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendText();
    }
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 group"
          aria-label="Abrir chat con IA"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping"></div>
          <Bot size={32} className="relative z-10" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out origin-bottom-right overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-50 translate-y-10 pointer-events-none"
        }`}
        style={{ height: "550px", maxHeight: "calc(100vh - 6rem)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <Bot size={22} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">AguaBot IA</h3>
              <p className="text-xs text-blue-100 opacity-90">Asistente Virtual</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cerrar chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-slate-700">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="max-w-[85%] flex items-end gap-2">
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot size={14} className="text-blue-600 dark:text-blue-300" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700"
                  }`}
                >
                  {msg.isTyping ? (
                    <div className="flex space-x-1 items-center h-4 px-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  ) : (
                    <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              </div>
              
              {/* Options Cards/Chips with stagger animation */}
              {msg.options && !msg.isTyping && (
                <div className="mt-2 ml-8 flex flex-wrap gap-2 max-w-[90%]">
                  {msg.options.map((opt, i) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAction(opt.id, opt.label)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all shadow-sm hover:shadow active:scale-95 animate-in fade-in slide-in-from-left-2"
                      style={{ animationDelay: `${i * 75}ms`, animationFillMode: "both" }}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe o seleccioná una opción..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-4 py-2 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={handleSendText}
              disabled={!inputValue.trim()}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide uppercase">
              Impulsado por IA
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
