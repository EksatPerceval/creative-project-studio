export const SITE = {
  name: "Tenun PutriMas",
  tagline: "Tenun Songket Jembrana Bali",
  whatsappDisplay: "+62 819-9785-4765",
  whatsappNumber: "6281997854765",
  email: "info@putrimas.com",
  address: "Jl. Cendrawasih No.3, Kelurahan Pendem, Kec. Jembrana, Kab. Jembrana, Bali 82211",
  hours: "Senin – Sabtu, 08.00 – 17.00 WITA",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pendem%2C+Jembrana%2C+Bali",
} as const;

/** Opens a WhatsApp chat with the studio, optionally with a pre-filled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
