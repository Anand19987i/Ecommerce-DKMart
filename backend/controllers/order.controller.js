import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

/**
 * ✅ Create a new order
 */
export const createOrder = async (req, res) => {
    try {
        const { userId, products, totalPrice } = req.body;

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create new order
        const order = await Order.create({
            userId,
            userName: user.name,
            mobile: user.mobile,
            address: user.address,
            products,
            totalPrice
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Get all orders for a specific user
 */
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        // ✅ Check if userId is valid before querying
        if (!userId || userId === "undefined") {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        return res.status(200).json({ success: true, orders });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Get order details by order ID
 */
export const getOrderDetail = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order });

    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Get all orders (Admin)
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name mobile address").sort({ createdAt: -1 });

        return res.status(200).json({ success: true, orders });

    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Update order status
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body; // Fix: Ensure we fetch 'status' instead of 'orderStatus'

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = status; // Fix: Assign the correct field
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


/**
 * ✅ Delete order (Admin)
 */
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
