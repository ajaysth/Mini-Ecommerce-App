"use client"

import { useSelector } from "react-redux"
import CartList from "@/components/cart/CartList"
import CartSummary from "@/components/cart/CartSummary"
import EmptyCart from "@/components/cart/EmptyCart"

export default function CartPage() {
    const items = useSelector((state: any) => state.cart.items)

    if (items.length === 0) return <EmptyCart />

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Your Cart</h1>

            <CartList />
            <CartSummary />
        </div>
    )
}