import React, { useEffect, useState } from "react";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa6";
import AdminNav from "./AdminNav";

const AdminProductDetail = () => {
    const [productDetail, setProductDetail] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`${PRODUCT_API_END_POINT}/product/details/${id}`, { withCredentials: true });
                if (response.data.success) {
                    setProductDetail(response.data.productDetail);
                    setSelectedImage(response.data.productDetail?.productImage?.[0]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id]);

    // Handle Product Update
    const handleUpdate = () => {
        navigate(`/admin/update-product/${id}`); // Navigate to update page
    };

    // Handle Product Delete
    const handleDelete = async () => {
        try {
            await axios.delete(`${PRODUCT_API_END_POINT}/delete/product/${id}`, { withCredentials: true });
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete the product.");
        }
    };

    return (
        <div>
            <AdminNav />
            {loading ? (
                <div className="flex justify-center items-center mt-[10%] h-40">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Breadcrumb Navigation */}
                    <div className="flex items-center gap-2 mt-6 ml-10 font-semibold text-md">
                        <Link to="/admin/dashboard">Home</Link>
                        <FaAngleRight />
                        <Link to={`/products-admin/${productDetail?.productType}`}>{productDetail?.productType}</Link>
                        <FaAngleRight />
                        <span className="text-gray-700">{productDetail?.productName}</span>
                    </div>

                    {/* Product Detail Section */}
                    <div className="max-w-6xl mx-auto py-10 px-4 lg:px-6">
                        <div className="bg-white shadow-sm rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">

                            {/* Left Section - Product Images */}
                            <div className="flex flex-col items-center lg:items-start">
                                <img
                                    src={selectedImage || "/placeholder.jpg"}
                                    alt={productDetail?.productName}
                                    className="w-80 h-96 object-cover rounded-lg"
                                />
                                {/* Thumbnail Slider */}
                                <div className="flex space-x-2 mt-4">
                                    {productDetail?.productImage?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                                                selectedImage === img ? "border-2 border-blue-500" : "hover:border-gray-400"
                                            }`}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right Section - Product Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{productDetail?.productName}</h1>
                                    <p className="text-gray-600 text-sm mt-1">Category: {productDetail?.productType}</p>
                                    <p className="text-gray-800 text-2xl font-bold mt-3">
                                        ₹{productDetail?.productPrice}
                                        {productDetail?.productDiscount > 0 && (
                                            <span className="text-red-500 text-lg ml-2">
                                                ({productDetail?.productDiscount}% Off)
                                            </span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="font-bold text-lg">
                                            M.R.P <del>₹{productDetail?.productRealPrice}</del>
                                        </span>
                                        <span className="ml-2 font-semibold">(Incl. of all taxes)</span>
                                    </p>

                                    {/* Product Description */}
                                    <p className="text-gray-700 mt-4 leading-relaxed">
                                        {productDetail?.productDescription || "No description available."}
                                    </p>
                                </div>

                                {/* Update & Delete Buttons */}
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* Extra Info */}
                                <div className="mt-6 text-sm text-gray-600">
                                    <p>📦 Fast delivery available</p>
                                    <p>🔄 7-day return policy</p>
                                    <p>💳 Secure payment options</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminProductDetail;
