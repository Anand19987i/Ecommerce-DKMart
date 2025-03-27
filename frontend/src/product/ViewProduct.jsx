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
            <div className="max-w-6xl mx-auto p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 capitalize text-center">
                    {type.replace("-", " ")} Products
                </h2>

                {loading ? (
                    <div className="flex justify-center mt-[10%] items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="flex flex-wrap  gap-1">
                        {products.map((product) => (
                            <div
                                key={product?._id}
                                className="w-[45%] sm:w-[48%] md:w-[23%] lg:w-[22%] xl:w-[18%]"
                            >
                                <ProductCard product={product} />
                            </div>

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
