"use client"

import { useDispatch } from "react-redux"
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
} from "@/store/cartSlice"
import Image from "next/image"
import { CartItem as CartItemType } from "@/types";

export default function CartItem({ item }: { item: CartItemType }) {
    const dispatch = useDispatch()

    return (
        <div className="flex gap-6 items-center border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-white">

            {/* Image */}
            <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-3">

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {item.title}
                </h3>

                {/* Price */}
                <p className="text-gray-600 font-medium">
                    ${item.price.toFixed(2)}
                </p>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between">

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">

                        <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-lg font-bold hover:bg-gray-100 active:scale-95 transition"
                        >
                            −
                        </button>

                        <span className="text-lg font-semibold w-6 text-center">
                            {item.quantity}
                        </span>

                        <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white text-lg font-bold hover:bg-gray-800 active:scale-95 transition"
                        >
                            +
                        </button>

                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="cursor-pointer hover:scale-105 transition-all duration-300 text-sm text-red-500 hover:text-red-600 font-medium"
                    >
                        Remove
                    </button>

                </div>
            </div>
        </div>
    )
}