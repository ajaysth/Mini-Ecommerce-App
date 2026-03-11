import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/index";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

interface ProductActionProps {
  payload: Product[];
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: ProductActionProps) {
      state.items = action.payload;
    },
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    setError(state, action: { payload: string | null }) {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
