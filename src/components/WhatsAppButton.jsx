import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const WhatsAppButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "923102991736";

  const message = "Hello! I want to know more about your Charsadda Chappal.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <>
      {show && (
        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            fixed bottom-5 right-5 z-50
            flex items-center justify-center
            w-14 h-14 sm:w-16 sm:h-16
            rounded-full shadow-xl
            bg-[#25D366] hover:bg-[#1ebe5d]
            text-white
            transition-all duration-300
            animate-bounce
          "
        >
          <Phone size={24} />

          {/* glow effect */}
          <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        </a>
      )}
    </>
  );
};

export default WhatsAppButton;
