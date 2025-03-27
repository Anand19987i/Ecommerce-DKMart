import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { PRODUCT_API_END_POINT } from "../utils/constant";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomeCareProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchHomeCareProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${PRODUCT_API_END_POINT}/homecare/products/Detergents%20&%20Soaps`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching home care products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeCareProducts();
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
            <h2 className="text-xl md:text-2xl font-bold mb-4  md:text-left">Home Care Products</h2>

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
                            <div 
                                key={product?._id} 
                                className="flex-shrink-0 w-[40%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] min-w-[140px] md:min-w-[180px] lg:min-w-[220px]"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <ProductCard product={product} />
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
                <p className="text-gray-500 text-center">No home care products available.</p>
            )}
        </div>
    );
};

export default HomeCareProducts;
