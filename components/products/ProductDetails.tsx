"use client";

import { Product } from "../../types";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTag } from "react-icons/fa";

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300 w-5 h-5" />);
            }
        }
        return stars;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                
                {/* Left Side: Product Image */}
                <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-8">
                    <div className="aspect-square w-full bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 flex items-center justify-center overflow-hidden relative group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                        {/* Soft background glow based on aesthetic preferences */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-50"></div>
                        
                        {/* Image */}
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </div>
                </div>

                {/* Right Side: Product Information */}
                <div className="mt-10 px-2 sm:px-0 lg:mt-0 lg:py-4">
                    
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-100">
                            <FaTag className="w-3 h-3" />
                            {product.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        {product.title}
                    </h1>

                    {/* Reviews / Ratings */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-1">
                            {renderStars(product.rating.rate)}
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            {product.rating.rate} out of 5 ({product.rating.count} reviews)
                        </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through font-medium">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>

                    {/* Description Section */}
                    <div className="mb-10 space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">
                            Product Details
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                        <button 
                            className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                            onClick={() => alert(`Added ${product.title} to cart!`)}
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
