import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, ShoppingBag, Users, Package } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const AdminNav = () => {
  const navigate = useNavigate();
  const logout  = async () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  }
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 top-0 left-0 w-full shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Admin Branding */}
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-blue-400 transition">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-blue-400 transition">
            <ShoppingBag className="w-5 h-5" /> Orders
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:text-blue-400 transition">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-400 transition">
            <Users className="w-5 h-5" /> Users
          </Link>
        </div>

        {/* Logout Button */}
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2" onClick={logout}>
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
