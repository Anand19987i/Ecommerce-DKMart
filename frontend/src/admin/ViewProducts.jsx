import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCT_API_END_POINT } from "../utils/constant";

import AdminNav from "./AdminNav";
import AdminProductCard from "./AdminProductCard";

const ViewProducts = () => {
    const { type } = useParams(); // ✅ Get the product type from URL
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

        fetchProducts(); // ✅ Call the function inside useEffect
    }, [type]); 

    return (
        <>
            <AdminNav />
            <div className="max-w-6xl mx-auto p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 capitalize">
                    {type.replace("-", " ")} Products
                </h2>

                {loading ? (
                    <div className="flex justify-center mt-[10%] items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products.map((product) => (
                            
                            <AdminProductCard key={product?._id} product={product} />
                            
                        ))}
                        
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </>
    );
};

export default ViewProducts;
