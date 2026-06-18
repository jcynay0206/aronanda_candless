import { IconWhatsApp } from "./Icons";
import { WHATSAPP_LINK } from "../data/content";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK("Hola, me gustaría conocer más sobre las velas Aronanda ✨")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-espresso/30 transition-transform duration-300 hover:scale-105"
    >
      <IconWhatsApp className="w-6 h-6" />
    </a>
  );
}
