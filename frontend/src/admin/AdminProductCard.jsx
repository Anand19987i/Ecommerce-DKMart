import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // ✅ Import Redux action

const AdminProductCard = ({ product }) => {
  return (
    <div className="w-48 bg-white rounded-md shadow-sm p-2">
      {/* Product Image (Click to View Details) */}
      <div className="w-full h-44">
        <Link to={`/product-admin/details/${product?._id}`}>
          <img
            src={product?.productImage?.[0]}
            alt={product?.productName}
            className="w-full h-full object-cover rounded-t-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-2">
        <h2 className="text-sm font-medium text-gray-800 truncate">{product?.productName}</h2>
        <div className="flex gap-5 items-center">
          <p className="text-black font-bold mt-1">₹<del className="text-gray-700">{product?.productRealPrice}</del> ₹{product?.productPrice}</p>
          <p className="text-red-500 font-bold mt-1 text-sm">
            {product?.productDiscount ? `${product?.productDiscount}% Off` : ""}
          </p>
        </div>

        {/* Quantity Selector */}
       </div>
    </div>
  );
};

export default AdminProductCard;
