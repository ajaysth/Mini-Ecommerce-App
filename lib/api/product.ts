import { fetcher } from "./fetcher";

export const getAllProducts = async () => {
  const url = "https://fakestoreapi.com/products";
  return fetcher(url);
};
