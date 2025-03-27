import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Minus, Plus, Trash } from "lucide-react";
import { addToCart, clearCart, removeFromCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ORDER_API_END_POINT, PRODUCT_API_END_POINT } from "../utils/constant";

const CartSection = () => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user details from localStorage or Redux store (Assuming user is stored in Redux)
  const { user } = useSelector(store => store.auth); // Ensure user data is stored

  // ✅ Increase Quantity
  const handleIncrease = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  // ✅ Decrease Quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    }
  };

  // ✅ Remove Item from Cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  // ✅ Handle Checkout
  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to proceed with checkout!");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      products: cart.map((item) => ({
        productId: item.id,
        productName: item.productName,
        productImage: item.productImage,
        productType: item.productType,
        quantity: item.quantity,
        price: item.productPrice,
      })),
      totalPrice,
    };

    try {
      const response = await axios.post(`${ORDER_API_END_POINT}/create`, orderData, {
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        navigate(`/orders/${user?.name}/${user?._id}`);
        dispatch(clearCart()); // ✅ Clears the cart // Redirect to orders page
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <img src="/cart.png" alt="Empty Cart" className="w-40 h-40 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mt-1">Start shopping now!</p>
            <Link to="/" className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
                  <Link to={`/product/details/${item.id}`}>
                    <img src={item.productImage} alt={item.productName} className="w-20 h-20 object-cover rounded-md" />
                  </Link>
                  <div className="flex-1 px-4">
                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                    <p className="text-gray-600 text-sm">Price: ₹{item.productPrice}</p>
                  </div>
                  <div className="flex items-center border border-gray-400 rounded-lg px-3 py-1">
                    <button onClick={() => handleDecrease(item)} className="p-1">
                      <Minus className="w-5 h-5 cursor-pointer" />
                    </button>
                    <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)} className="p-1">
                      <Plus className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 ml-4">
                    <Trash className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold border-b pb-3 mb-3">Order Summary</h2>
              <div className="flex flex-col space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.productName} × {item.quantity}</span>
                    <span className="font-semibold">₹{(item.productPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-lg font-medium mt-4">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSection;
