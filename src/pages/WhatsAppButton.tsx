import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9680034960"  // Replace with your WhatsApp number link
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 hover:bg-green-600 z-50"
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow
      }}
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
