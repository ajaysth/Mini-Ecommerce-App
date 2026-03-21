"use client"

import { useSelector } from "react-redux"
import CartItem from "./CartItem"

export default function CartList() {
    const items = useSelector((state: any) => state.cart.items)

    return (
        <div>
            {items.map((item: any) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    )
}