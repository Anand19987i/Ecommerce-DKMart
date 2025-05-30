import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FoodProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchFoodProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${PRODUCT_API_END_POINT}/chips/products/Chips and Namkeen`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching beverages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodProducts();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 relative">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:text-left">Chips and Namkeen</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="relative">
                    <button 
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 md:p-3 rounded-full z-10 hover:bg-gray-200 transition hidden sm:block"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-gray-600" />
                    </button>

                    <div 
                        ref={scrollContainerRef} 
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-2"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {products.map((product) => (
                             <div className="w-56 sm:w-64 md:w-72 lg:w-80" key={product._id} >
                             <ProductCard key={product._id} product={product} />
                         </div>
                        ))}
                    </div>

                    <button 
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 md:p-3 rounded-full z-10 hover:bg-gray-200 transition hidden sm:block"
                        onClick={scrollRight}
                    >
                        <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-gray-600" />
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 text-center">No products available.</p>
            )}
        </div>
    );
};

export default FoodProducts;
