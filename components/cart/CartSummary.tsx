"use client"

import { useSelector } from "react-redux"
import { getTotalPrice, getTotalItems } from "@/lib/utils/cartHelper"

export default function CartSummary() {
    const items = useSelector((state: any) => state.cart.items)

    const total = getTotalPrice(items)
    const totalItems = getTotalItems(items)

    return (
        <div className="w-full max-w-md ml-auto mt-6 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
            </h2>

            {/* Items */}
            <div className="flex justify-between text-gray-600 mb-2">
                <span>Items ({totalItems})</span>
                <span>${total.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-gray-600 mb-4">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Total */}
            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 hover:shadow-lg active:scale-95 transition-all duration-300">
                Proceed to Checkout
            </button>



        </div>
    )
}