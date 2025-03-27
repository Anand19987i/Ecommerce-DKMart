import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCT_API_END_POINT } from '../utils/constant';
import ProductCard from './ProductCard';

const RelatedProducts = () => {
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get(`${PRODUCT_API_END_POINT}/related/products/${id}`, { withCredentials: true });
                if (response.data.success) {
                    setRelatedProducts(response.data.relatedProducts);
                }
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };
        fetchRelatedProducts();
    }, [id]);

    return (
        <div className="px-4 sm:px-10 mt-10">
            <h2 className="text-xl font-bold mb-4">Similar Products</h2>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((product) => (
                        <div className="w-56 sm:w-64 md:w-72 lg:w-80" key={product._id} >
                            <ProductCard key={product._id} product={product} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No related products found.</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
