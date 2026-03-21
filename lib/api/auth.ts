import { fetcher } from "./fetcher";

export const loginAPI = async (credentials: any) => {
  return fetcher("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
