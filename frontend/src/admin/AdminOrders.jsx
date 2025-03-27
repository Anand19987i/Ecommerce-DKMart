import React, { useEffect, useState } from "react";
import axios from "axios";
import { ORDER_API_END_POINT } from "../utils/constant";
import AdminNav from "./AdminNav";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${ORDER_API_END_POINT}/orders`, { withCredentials: true });

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
    }, []);

    // ✅ Update Order Status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `${ORDER_API_END_POINT}/${orderId}/status`,
                { status: newStatus },  // Fix: Send the correct field
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
    
            if (response.data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };
    
    // ✅ Cancel Order
    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.delete(`${ORDER_API_END_POINT}/orders/${orderId}`, { withCredentials: true });

            if (response.data.success) {
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            }
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">All Orders</h1>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-center text-lg font-semibold">No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100 text-gray-800">
                                <tr>
                                    <th className="py-3 px-4 border-b">Order ID</th>
                                    <th className="py-3 px-4 border-b">Customer</th>
                                    <th className="py-3 px-4 border-b">Mobile</th>
                                    <th className="py-3 px-4 border-b">Total Price</th>
                                    <th className="py-3 px-4 border-b">Placed On</th>
                                    <th className="py-3 px-4 border-b">Status</th>
                                    <th className="py-3 px-4 border-b">Products</th>
                                    <th className="py-3 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{order._id.slice(-8)}</td>
                                        <td className="py-3 px-4">{order.userId?.name}</td>
                                        <td className="py-3 px-4">{order.userId?.mobile}</td>
                                        <td className="py-3 px-4 font-bold text-gray-900">₹{order.totalPrice}</td>
                                        <td className="py-3 px-4">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="py-3 px-4">
                                            <select
                                                className="px-2 py-1 border rounded-md"
                                                value={order.orderStatus}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col space-y-2">
                                                {order.products.map((product) => (
                                                    <div key={product.productId} className="flex items-center space-x-2">
                                                        <img
                                                            src={product.productImage?.[0]}
                                                            alt={product.productName}
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-semibold">{product.productName}</p>
                                                            <p className="text-sm text-gray-700">Qty: {product.quantity}</p>
                                                            <p className="text-sm text-black font-semibold">₹ {product.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => cancelOrder(order._id)}
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
