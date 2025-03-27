import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // ✅ Import Redux action

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Increase Quantity
  const handleIncrease = () => setQuantity(quantity + 1);

  // ✅ Decrease Quantity (minimum = 1)
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // ✅ Add to Cart Function
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
    <div className="w-48 bg-white rounded-md shadow-sm p-2">
      {/* Product Image (Click to View) */}
      <div className="w-full h-44">
        <Link to={`/product/details/${product?._id}`}>
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
          {/* Conditional Price Display */}
          {product?.productDiscount > 0 && product?.productPrice < product?.productRealPrice ? (
            <p className="text-black font-bold mt-1">
              ₹<del className="text-gray-700">{product?.productRealPrice}</del> ₹{product?.productPrice}
            </p>
          ) : (
            <p className="text-black font-bold mt-1">₹{product?.productRealPrice}</p>
          )}

          {/* Show discount percentage only if it's greater than 0 */}
          {product?.productDiscount > 0 && (
            <p className="text-red-500 font-bold mt-1 text-sm">{product?.productDiscount}% Off</p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button onClick={handleDecrease} className="text-gray-600 p-1 border rounded cursor-pointer">
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm">{quantity}</span>
            <button onClick={handleIncrease} className="text-gray-600 p-1 border rounded cursor-pointer">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Popup */}
          {showPopup && (
            <div className="flex gap-2 fixed bottom-10 right-[40%] bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity items-center duration-500">
              <img src="/checked.png" alt="" className="w-4 h-4" /> Item added to the cart!
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer justify-center gap-1 bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition">
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
