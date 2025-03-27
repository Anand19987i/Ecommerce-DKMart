import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import RelatedProducts from "./RelatedProducts";

const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

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

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: productDetail?._id,
                productName: productDetail?.productName,
                productPrice: productDetail?.productPrice,
                productImage: productDetail?.productImage?.[0],
                quantity,
            })
        );
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div>
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center mt-[10%] h-40">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mt-6 ml-10 font-semibold text-md">
                        <Link to="/">Home</Link>
                        <FaAngleRight />
                        <Link to={`/products/${productDetail?.productType}`}>{productDetail?.productType}</Link>
                        <FaAngleRight />
                        <span className="text-gray-700">{productDetail?.productName}</span>
                    </div>

                    {/* Product Section */}
                    <div className="max-w-6xl mx-auto py-10 px-4 lg:px-6">
                        <div className="bg-white shadow-sm rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">

                            {/* Left - Product Images */}
                            <div className="flex flex-col items-center lg:items-start">
                                <img
                                    src={selectedImage || "/placeholder.jpg"}
                                    alt={productDetail?.productName}
                                    className="w-80 h-96 object-cover rounded-lg"
                                />
                                <div className="flex space-x-2 mt-4">
                                    {productDetail?.productImage?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index}`}
                                            className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-2 border-blue-500" : "hover:border-gray-400"
                                                }`}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right - Product Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{productDetail?.productName}</h1>
                                    <p className="text-gray-600 text-sm mt-1">Category: {productDetail?.productType}</p>

                                    {/* Price Display Logic */}

                                    {/* If there is a discount, show both discounted price & MRP */}
                                    {/* If discount exists, show discounted price & MRP */}
                                    {productDetail?.productDiscount > 0 ? (
                                        <div>
                                            <p className="text-gray-800 text-2xl font-bold mt-3">
                                                ₹{productDetail?.productPrice}
                                                <span className="text-red-500 text-lg ml-2">
                                                    ({productDetail?.productDiscount}% Off)
                                                </span>
                                            </p>
                                            <p className="text-lg font-bold">
                                                M.R.P <del>₹{productDetail?.productRealPrice}</del>
                                            </p>
                                        </div>
                                    ) : (
                                        /* If NO discount, show only MRP without ₹ sign */
                                        <p className="text-lg font-bold mt-3">
                                            M.R.P ₹ {productDetail?.productRealPrice}
                                        </p>
                                    )}



                                    {/* Show MRP only if there's a discount */}
                                   

                                    {/* Product Description */}
                                    <p className="text-gray-700 mt-4 leading-relaxed">
                                        {productDetail?.productDescription || "No description available."}
                                    </p>

                                    {/* Quantity Selector */}
                                    <div className="mt-6 flex items-center gap-4">
                                        <span className="text-lg font-semibold">Quantity:</span>
                                        <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2">
                                            <button onClick={handleDecrease} className="text-gray-600 p-1 cursor-pointer">
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="text-lg font-semibold">{quantity}</span>
                                            <button onClick={handleIncrease} className="text-gray-600 p-1 cursor-pointer">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Buy & Cart Buttons */}
                                <div className="mt-6">
                                    {showPopup && (
                                        <div className="flex gap-2 fixed bottom-10 right-[40%] bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity items-center duration-500">
                                            <img src="/public/checked.png" alt="" className="w-4 h-4 " /> Item added to the cart!
                                        </div>
                                    )}
                                    <button onClick={handleAddToCart} className="w-full text-white sm:w-auto cursor-pointer flex items-center justify-center bg-blue-600 gap-2 border border-gray-400 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                                        <ShoppingCart className="w-5 h-5" /> Add to Cart
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
            <RelatedProducts />
        </div>
    );
};

export default ProductDetail;
