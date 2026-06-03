import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain, url } = body;

    // Validate the incoming request format
    if (!domain || !url) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    // Authorized domains list checked securely on the server
    const authorizedDomains = [
      "localhost",
      "127.0.0.1",
      "almacendeagua.com",
      "almacendeagua.com.ar",
      "almacen-de-agua-web.vercel.app"
    ];

    if (!authorizedDomains.includes(domain)) {
      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
        console.error("Missing Telegram credentials in environment variables.");
        // Still return 200 so the frontend doesn't suspect anything
        return NextResponse.json({ success: true, message: "Metrics recorded" });
      }

      const message = `🚨 ALERTA DE CLONACIÓN (ALMACÉN DE AGUA) 🚨\n\nDetectamos que el sitio frontend fue desplegado o levantado en un dominio no autorizado.\n\n🌐 Dominio Intruso: ${domain}\n🔗 URL Completa: ${url}\n⏱️ Fecha: ${new Date().toISOString()}`;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
    }

    // Always return a generic success to hide the real purpose from anyone inspecting network traffic
    return NextResponse.json({ success: true, message: "Metrics recorded" });
  } catch (error) {
    // Fail silently on errors
    return NextResponse.json({ success: false, message: "Failed to record metrics" }, { status: 500 });
  }
}
