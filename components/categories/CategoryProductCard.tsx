"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
    };
}

const CatProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [wishlist, setWishlist] = useState(false);

    const toggleWishlist = () => setWishlist(!wishlist);

    return (
        <div className="relative border-2 border-gray-400 rounded-lg p-4 shadow-xl  hover:-translate-y-1 transition-transform  duration-300 bg-gray-300 cursor-pointer">

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
            <p className="mt-1 font-bold text-[var(--color-primary)]">${product.price}</p>


        </div>
    );
};

export default CatProductCard;