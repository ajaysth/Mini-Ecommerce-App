export type ProductCategory =
  | "men's clothing"
  | "women's clothing"
  | "jewelery"
  | "electronics";

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: ProductRating;
}
