import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import ProductCard from "./ProductCard";
import Navbar from "../components/Navbar";

const ViewProduct = () => {
    const { type } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setProducts([]);
                const response = await axios.get(
                    `${PRODUCT_API_END_POINT}/products/${type}`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type]);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 capitalize text-center">
                    {type.replace("-", " ")} Products
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </>
    );
};

export default ViewProduct;
