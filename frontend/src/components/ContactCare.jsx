import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const ContactCare = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Phone */}
      <div className="flex items-center gap-2">
        <Phone className="text-blue-600 w-6 h-6" />
        <a href="tel:+911234567890" className="text-gray-700 hover:text-blue-600 font-medium transition">
          +91 97699 65187
        </a>
      </div>

      {/* Email */}
      <div className="flex items-center gap-2">
        <Mail className="text-blue-600 w-6 h-6" />
        <a href="mailto:support@dkmart.com" className="text-gray-700 hover:text-blue-600 font-medium transition">
          support@dkmart.com
        </a>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center gap-2">
        <MessageCircle className="text-green-600 w-6 h-6" />
        <a
          href="https://wa.me/911234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactCare;
