import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import ProductCard from "./ProductCard";
import Navbar from "../components/Navbar";


const SearchProduct = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query"); // ✅ Get search query from URL
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                try {
                    const response = await axios.get(`${PRODUCT_API_END_POINT}/search?query=${query}`);
                    if (response.data.success) {
                        setSearchResults(response.data.products);
                    }
                } catch (error) {
                    console.error("Search Error:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">

                </h1>

                {loading ? (
                    <div className="flex justify-center mt-[10%] items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No products found for "{query}".</p>
                )}
            </div>
        </>
    );
};

export default SearchProduct;
