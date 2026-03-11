import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import categoryReducer from "./categorySlice";
import categoryProductsReducer from "./categoryProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
    categoryProducts: categoryProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
