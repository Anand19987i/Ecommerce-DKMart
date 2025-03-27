import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* DKMart Info Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">DKMart</h2>
          <p className="text-gray-400 mt-3">
            Your one-stop shop for all your daily needs. Enjoy fast delivery and amazing deals!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">Shop</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-500 transition">Contact</a></li>
          </ul>
        </div>

    

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold text-white-400">Contact Us</h3>
          <div className="mt-3 space-y-3 text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="text-blue-500 w-5 h-5" />
              <a href="tel:+911234567890" className="hover:text-blue-500 transition">
                +91 12345 67890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-blue-500 w-5 h-5" />
              <a href="mailto:support@dkmart.com" className="hover:text-blue-500 transition">
                support@dkmart.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="text-green-500 w-5 h-5" />
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} DKMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
    