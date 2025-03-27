import express from "express";
import { createOrder, getUserOrders, getOrderDetail, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();
router.post("/create", createOrder);
router.get("/orders/user/:userId", getUserOrders);
router.get("/orders", getAllOrders);  // ✅ This should come first
router.get("/:orderId", getOrderDetail);
router.put("/:orderId/status", updateOrderStatus);
router.delete("/orders/:orderId", deleteOrder);

export default router;
