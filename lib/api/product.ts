import { fetcher } from "./fetcher";

export const getAllProducts = async () => {
  const url = "https://fakestoreapi.com/products";
  return fetcher(url);
};

export const getProductById = async (id: string | number) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  return fetcher(url);
};
