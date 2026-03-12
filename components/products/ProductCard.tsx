"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
        rating?: {
            rate: number;
            count: number;
        };
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [wishlist, setWishlist] = useState(false);

    const toggleWishlist = () => setWishlist(!wishlist);

    // Generate stars for rating
    const renderStars = () => {
        const stars = [];
        const rate = product.rating?.rate || 0;
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={"full" + i} className="text-yellow-400" />);
        if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={"empty" + i} className="text-yellow-400" />);

        return stars;
    };

    return (
        <div className="relative border-2 border-gray-400 rounded-lg p-4 shadow-xl hover:-translate-y-1 transition-transform duration-300 bg-gray-300 cursor-pointer">

            <button
                onClick={toggleWishlist}
                className="absolute top-2 right-2 hover:text-red-500 transition text-lg z-10 cursor-pointer"
            >
                {wishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>

            <div className="w-full h-48 relative mb-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                />
            </div>

            <h3 className="font-semibold truncate">{product.title}</h3>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mt-1">
                {renderStars()}
                {product.rating && (
                    <span className="text-sm text-gray-700 ml-1">
                        ({product.rating.count})
                    </span>
                )}
            </div>

            <p className="mt-2 font-bold text-[var(--color-primary)]">${product.price}</p>

        </div>
    );
};

export default ProductCard;