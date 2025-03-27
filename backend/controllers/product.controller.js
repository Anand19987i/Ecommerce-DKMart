import getDataUri from "../config/datauri.js";
import { Product } from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice, productRealPrice, productDiscount, productType } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded!" });
        }

        // Initialize an array to store uploaded image URLs
        const uploadedImages = [];

        // Upload images to Cloudinary one by one
        for (const file of req.files) {
            const productImageUri = getDataUri(file); // Using getDataUri function
            const cloudPIResponse = await cloudinary.uploader.upload(productImageUri, { folder: "products" });
            uploadedImages.push(cloudPIResponse.secure_url);
        }

        // Save product with images array
        const product = await Product.create({
            productName,
            productDescription,
            productPrice,
            productRealPrice,
            productType,
            productDiscount,
            productImage: uploadedImages, // Ensure it matches the schema field
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {
        console.error("Error fetching products by type:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const fetchProductsByType = async (req, res) => {
    try {
        const { type } = req.params;
        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Product type is required",
            });
        }

        const products = await Product.find({ productType: type });
        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No products found for type: ${type}`,
            });
        }

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error fetching products by type:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const fetchProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const productDetail = await Product.findById({ _id: id });
        if (!productDetail) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            productDetail,
            message: "product detail fetch successfully"
        })
    } catch (error) {
        console.error("Error fetching products by type:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req. params;
        const currentProduct = await Product.findById({_id: id});

        if (!currentProduct) {
            return res.status(404).json({
                success: false, 
                message: "Product not found" 
            })
        }
        
        const relatedProducts = await Product.find({
            productType: currentProduct.productType,
            _id: { $ne: id }
        }).limit(5);
        res.status(200).json({
            success: true,
            relatedProducts,
        })   
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
}

export const searchProduct = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({productName: { $regex: query, $options: "i"}});
        res.status(200).json({ success: true, products});
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const beveragesProducts = async (req, res) => {
    try {
        const { type } = req.params
        if (!type) {
            return res.status(400).json({ success: false, message: "Product type is required" });
        }

        const products = await Product.find({ productType: type });

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const homeCareProducts = async (req, res) => {
    try {
        const { type } = req.params;
        const products = await Product.find({ productType: type });
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const chipsProducts = async (req, res) => {
    try {
        const { type } = req.params;
        const products = await Product.find({ productType: type });
        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productDescription, productPrice, productRealPrice, productDiscount, productType } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, productDescription, productPrice, productRealPrice, productDiscount, productType },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
