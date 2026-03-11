import { fetcher } from "./fetcher";

export const getCatProducts = async (category: string) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  return fetcher(url);
};
