import { CartItem } from "@/types"

export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
}

export const getTotalItems = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0)
}