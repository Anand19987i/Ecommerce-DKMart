import React, { useState } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import Navbar from "../components/Navbar";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productRealPrice: "",
        productDiscount: "",
        productType: "",
        productImage: [],
    });
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Multiple Image Selection & Preview
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, productImage: files });

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        

        const newFormData = new FormData();
        newFormData.append("productName", formData.productName);
        newFormData.append("productDescription", formData.productDescription);
        newFormData.append("productPrice", formData.productPrice);
        newFormData.append("productRealPrice", formData.productRealPrice);
        newFormData.append("productDiscount", formData.productDiscount);
        newFormData.append("productType", formData.productType);

        formData.productImage.forEach((file) => {
            newFormData.append("productImage", file);  // Must match Multer field name
        });

        try {
            setLoading(true);
            const response = await axios.post(`${PRODUCT_API_END_POINT}/create/product`, newFormData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccess("Product Created Successfully!");
                setFormData({
                    productName: "",
                    productDescription: "",
                    productPrice: "",
                    productRealPrice: "",
                    productDiscount: "",
                    productType: "",
                    productImage: [],
                });
                setPreviewImages([]);
            }
        } catch (error) {
            setError("Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
        <Navbar/>
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 my-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Product</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-blue-500 text-center">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Product Name</label>
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Product Descirption</label>
                    <input type="text" name="productDescription" value={formData.productDescription} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" />
                </div>


                <div>
                    <label className="block text-gray-700 mb-2">Product Market Price</label>
                    <input type="number" name="productRealPrice" value={formData.productRealPrice} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter Market price" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Product Discount Price</label>
                    <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter Discount price" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Product Discount (%)</label>
                    <input type="number" name="productDiscount" value={formData.productDiscount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter discount (optional)" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Product Type</label>
                    <select name="productType" value={formData.productType} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Type</option>
                        <option value="Biscuits">Biscuits</option>
                        <option value="Chips and Namkeen">Chips and Namkeen</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Maggie and Pasta">Maggie and Pasta</option>
                        <option value="Cadbury and Chocolates">Cadbury and Chocolates</option>
                        <option value="Atta and Rice">Atta and Rice</option>
                        <option value="Oil & Ghee">Oil & Ghee</option>
                        <option value="Sauces & Spreads">Sauces & Spreads</option>
                        <option value="Spices">Spices</option>
                        <option value="Soaps & Shampoo">Soaps & Shampoo</option>
                        <option value="Pulses and Cereals">Pulses and Cereals</option>
                        <option value="Hair oils">Hair oils</option>
                        <option value="Detergents & Soaps">Detergents & Soaps</option>
                        <option value="Oral care">Oral care</option>
                        <option value="Stationary">Stationary</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Product Images</label>
                    <input type="file" name="productImage" multiple accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {previewImages.map((image, index) => (
                            <img key={index} src={image} alt={`Preview ${index + 1}`} className="h-32 w-32 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                )}

                <button type="submit" className={`w-full cursor-pointer bg-blue-500 text-white font-semibold py-3 flex items-center justify-center rounded-lg transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} disabled={loading}>
                    {loading ? (
                        <>
                            <svg className="flex items-center justify-center animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                        </>
                    ) : (
                        "Create Product"
                    )}
                </button>
            </form>
        </div>
        </>
    );
};

export default CreateProduct;