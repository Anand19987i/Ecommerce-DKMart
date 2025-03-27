import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type:String,
           
        },
        mobile: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product", 
                    required: true,
                },
                productName: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
                productImage: {
                    type: [String],
                    default: "",
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Delivered", "Cancelled"],
            default: "Pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
