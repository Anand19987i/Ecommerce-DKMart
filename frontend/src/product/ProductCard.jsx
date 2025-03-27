import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product?._id,
        productName: product?.productName,
        productPrice: product?.productPrice,
        productImage: product?.productImage?.[0],
        quantity,
      })
    );
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="w-full sm:w-60 md:w-72 bg-white rounded-lg shadow-lg p-3 transition hover:shadow-xl">
      {/* Product Image */}
      <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden rounded-md">
        <Link to={`/product/details/${product?._id}`}>
          <img
            src={product?.productImage?.[0]}
            alt={product?.productName}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-2">
        <h2 className="text-sm md:text-base font-semibold text-gray-800 truncate">
          {product?.productName}
        </h2>

        {/* Price Section */}
        <div className="flex gap-3 items-center mt-1">
          {product?.productDiscount > 0 && product?.productPrice < product?.productRealPrice ? (
            <p className="text-black font-bold">
              ₹<del className="text-gray-700">{product?.productRealPrice}</del> ₹{product?.productPrice}
            </p>
          ) : (
            <p className="text-black font-bold">₹{product?.productRealPrice}</p>
          )}
          {product?.productDiscount > 0 && (
            <p className="text-red-500 font-bold text-sm">{product?.productDiscount}% Off</p>
          )}
        </div>

        {/* Quantity Selector & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <button onClick={handleDecrease} className="text-gray-600 p-1 border rounded">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm">{quantity}</span>
            <button onClick={handleIncrease} className="text-gray-600 p-1 border rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600 transition">
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Add to Cart Popup */}
      {showPopup && (
        <div className="fixed bottom-10 right-1/2 translate-x-1/2 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-500">
          <img src="/checked.png" alt="Checked" className="w-4 h-4" />
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
