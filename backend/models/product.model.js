import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    productImage: {
        type: [String],
        default: "",
    },
    productName: {
        type: String,
        default: "",
    },
    productDescription: {
        type: String,
        default: "",
    },
    productType: {
        type: String,
        default: "",
    },
    productPrice: {
        type: Number,
        default: "",
    },
    productRealPrice: {
        type: Number,
        default: "",
    },
    
    productDiscount: {
        type: Number,
        default: "",
    },
}, {timestamps: true})

export const Product = mongoose.model("Product", productSchema);

