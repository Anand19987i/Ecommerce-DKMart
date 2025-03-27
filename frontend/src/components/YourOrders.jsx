import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORDER_API_END_POINT } from "../utils/constant";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const YourOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Get user from Redux store
    const user = useSelector((store) => store.auth.user);
    const userId = user?._id;

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${ORDER_API_END_POINT}/orders/user/${userId}`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    // ✅ Handle Cancel Order
    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.delete(`${ORDER_API_END_POINT}/orders/${orderId}`, { withCredentials: true });

            if (response.data.success) {
                alert("Order canceled successfully!");
                // ✅ Remove the canceled order from the state
                setOrders(orders.filter(order => order._id !== orderId));
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Failed to cancel order. Try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Orders</h1>

                {loading ? (
                    <div className="flex justify-center mt-[10%] items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : !userId ? (
                    <div className="text-center text-lg font-semibold">
                        <p>Please <Link to="/login" className="text-blue-600">log in</Link> to view your orders.</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-lg font-semibold">
                        No orders found. <Link to="/" className="text-blue-600">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order?._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                                {/* Header Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Order ID: <span className="text-blue-600">{order?._id.slice(-8)}</span>
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                                    ${order.orderStatus === "Processing" ? "bg-yellow-100 text-yellow-800"
                                            : order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-800"
                                                : order.orderStatus === "Delivered" ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"}`}>
                                        {order?.orderStatus}
                                    </span>
                                </div>

                                {/* Order Details */}
                                <p className="text-gray-700"><span className="font-semibold">Total Price:</span> ₹{order?.totalPrice}</p>
                                <p className="text-gray-700"><span className="font-semibold">Placed on:</span> {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>

                                {/* Products List */}
                                <div className="mt-4">
                                    <h3 className="text-md font-semibold text-gray-800 mb-2">Products</h3>
                                    <div className="space-y-3">
                                        {order?.products.map((product) => (
                                            <div key={product.productId} className="flex items-center bg-gray-100 p-3 rounded-md">
                                                <img src={product.productImage?.[0]} alt={product.productName} className="w-16 h-16 object-cover rounded-md" />
                                                <div className="ml-4">
                                                    <h4 className="text-md font-semibold">{product.productName}</h4>
                                                    <p className="text-gray-700 text-sm">Qty: {product.quantity}</p>
                                                    <p className="text-gray-700 text-sm">Price: ₹{product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cancel Button */}
                                {
                                    order?.orderStatus === "Pending" && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => cancelOrder(order._id)}
                                                className=" bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition"
                                            >
                                                Cancel Order
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourOrders;
