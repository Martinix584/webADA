import { useCart } from "./useCart";

export function useWhatsApp() {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);

  const generateOrderMessage = (formData: any) => {
    const { items, deliveryMethod } = useCart.getState();
    const isDelivery = deliveryMethod === "delivery";
    
    let message = `💧 *Nuevo Pedido - Almacén de Agua*\n\n`;
    
    message += `*Cliente:* ${formData.name}\n`;
    message += `*Teléfono:* ${formData.phone}\n`;
    message += `*Modalidad:* ${isDelivery ? "🚚 Envío a Domicilio" : "🏪 Retiro en Local"}\n`;
    
    if (isDelivery) {
      message += `*Dirección:* ${formData.address}\n`;
      message += `*Zona:* ${formData.zone}\n`;
      message += `*Horario:* ${formData.schedule}\n`;
      if (formData.notes) message += `*Notas:* ${formData.notes}\n`;
    }
    
    message += `\n*Detalle del Pedido:*\n`;
    let total = 0;
    
    items.forEach(item => {
      const price = isDelivery ? item.priceDelivery : item.priceTakeaway;
      const subtotal = price * item.quantity;
      total += subtotal;
      message += `- ${item.quantity}x ${item.title} (${formatPrice(price)} c/u) = ${formatPrice(subtotal)}\n`;
    });
    
    message += `\n*Total a pagar: ${formatPrice(total)}*\n`;
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/5492613312121?text=${encodedMessage}`;
  };

  const generateRegistrationMessage = (formData: any) => {
    let message = `💧 *Nuevo Registro de Cliente*\n\n`;
    
    message += `*Tipo:* ${formData.clientType === "empresa" ? "🏢 Empresa" : "🏠 Particular"}\n`;
    message += `*Nombre:* ${formData.name}\n`;
    message += `*Teléfono:* ${formData.phone}\n`;
    if (formData.email) message += `*Email:* ${formData.email}\n`;
    
    message += `\n*Dirección de Entrega:*\n`;
    message += `*Calle:* ${formData.address}\n`;
    if (formData.apt) message += `*Piso/Dpto:* ${formData.apt}\n`;
    message += `*Localidad:* ${formData.locality}\n`;
    if (formData.ref) message += `*Referencia:* ${formData.ref}\n`;
    
    message += `\n✅ *Términos de comodato aceptados*`;
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/5492613312121?text=${encodedMessage}`;
  };

  return { generateOrderMessage, generateRegistrationMessage };
}
