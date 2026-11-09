import { CartItem, Product } from '../types';

/**
 * Clean phone number to ensure digits only with optional leading plus
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Format Nigerian Naira currency
 */
export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Generates the prewritten WhatsApp message and direct link for single product ordering
 */
export function generateProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  whatsappNumber: string
): { url: string; message: string } {
  const cleanNumber = sanitizePhoneNumber(whatsappNumber);
  const formattedPrice = formatNaira(product.price);
  const totalPrice = formatNaira(product.price * quantity);

  const message = [
    `*VELVET PLEASURE HOUSE — ORDER INQUIRY*`,
    ``,
    `Hello Velvet Concierge, I would like to order:`,
    `• *Product:* ${product.name}`,
    `• *Category:* ${product.category.toUpperCase()}`,
    `• *Price:* ${formattedPrice} each`,
    `• *Quantity:* ${quantity}`,
    `• *Total:* ${totalPrice}`,
    `• *Product Ref SKU:* ${product.id}`,
    ``,
    `*Delivery Preference:*`,
    `[ ] Lagos (Express / Same Day)`,
    `[ ] Abuja (Standard)`,
    `[ ] Nationwide Nigeria Delivery`,
    ``,
    `*Packaging:* Please confirm 100% plain, unmarked discreet packaging.`,
    `Please confirm stock availability and send payment / transfer instructions.`
  ].join('\n');

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${cleanNumber}?text=${encoded}`;

  return { url, message };
}

/**
 * Generates composite WhatsApp order message for multiple items in bag
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  whatsappNumber: string
): { url: string; message: string; totalAmount: number } {
  const cleanNumber = sanitizePhoneNumber(whatsappNumber);
  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const itemLines = items.map((item, idx) => {
    return `${idx + 1}. *${item.product.name}*\n   Qty: ${item.quantity} × ${formatNaira(item.product.price)} = ${formatNaira(item.product.price * item.quantity)} (Ref: ${item.product.id})`;
  });

  const message = [
    `*VELVET PLEASURE HOUSE — MULTI-ITEM BAG ORDER*`,
    ``,
    `Hello Velvet Concierge, I would like to order the following items:`,
    ``,
    ...itemLines,
    ``,
    `*Order Total: ${formatNaira(totalAmount)}* (${items.reduce((acc, i) => acc + i.quantity, 0)} items)`,
    ``,
    `*Delivery Preference:*`,
    `[ ] Lagos (Express Delivery)`,
    `[ ] Abuja`,
    `[ ] Interstate / Nationwide`,
    ``,
    `*Discretion:* Please confirm plain unmarked courier packaging with zero product labelling.`,
    `Kindly confirm stock and share the account details for bank transfer confirmation.`
  ].join('\n');

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${cleanNumber}?text=${encoded}`;

  return { url, message, totalAmount };
}

/**
 * General contact inquiry link
 */
export function generateGeneralInquiryWhatsAppUrl(
  topic: string,
  whatsappNumber: string
): string {
  const cleanNumber = sanitizePhoneNumber(whatsappNumber);
  const message = [
    `*VELVET PLEASURE HOUSE — CONFIDENTIAL INQUIRY*`,
    ``,
    `Hello Velvet Concierge,`,
    `I have a discreet question regarding: *${topic}*.`,
    `Could you assist me with guidance without judgement? Thank you.`
  ].join('\n');

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
