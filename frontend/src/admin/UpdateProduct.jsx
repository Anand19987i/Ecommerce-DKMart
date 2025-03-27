import React, { useEffect, useState } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const UpdateProduct = () => {
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
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch product details when the component mounts
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${PRODUCT_API_END_POINT}/product/details/${id}`, { withCredentials: true });
                if (response.data.success) {
                    const product = response.data.productDetail;
                    setFormData({
                        productName: product.productName,
                        productDescription: product.productDescription,
                        productPrice: product.productPrice,
                        productRealPrice: product.productRealPrice,
                        productDiscount: product.productDiscount,
                        productType: product.productType,
                        productImage: [], // Reset to allow new uploads
                    });
                    setPreviewImages(product.productImage || []);
                }
            } catch (error) {
                setError("Failed to fetch product details.");
            }
        };

        fetchProductDetails();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle multiple image selection & preview
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, productImage: files });

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.productName || !formData.productPrice || !formData.productType) {
            setError("All fields are required.");
            return;
        }

        const newFormData = new FormData();
        newFormData.append("productName", formData.productName);
        newFormData.append("productDescription", formData.productDescription);
        newFormData.append("productPrice", formData.productPrice);
        newFormData.append("productRealPrice", formData.productRealPrice);
        newFormData.append("productDiscount", formData.productDiscount);
        newFormData.append("productType", formData.productType);

        formData.productImage.forEach((file) => {
            newFormData.append("productImage", file); // Must match Multer field name
        });

        try {
            setLoading(true);
            const response = await axios.put(`${PRODUCT_API_END_POINT}/update/product/${id}`, newFormData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.data.success) {
                setSuccess("Product updated successfully!");
                setTimeout(() => navigate("/admin/dashboard"), 2000); // Redirect after 2 sec
            }
        } catch (error) {
            setError("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNav />
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 my-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Product : {formData.productName}</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-blue-500 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Product Name</label>
                        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Product Description</label>
                        <input type="text" name="productDescription" value={formData.productDescription} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Market Price</label>
                        <input type="number" name="productRealPrice" value={formData.productRealPrice} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Discount Price</label>
                        <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Discount (%)</label>
                        <input type="number" name="productDiscount" value={formData.productDiscount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
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
                            "Update Product"
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateProduct;
