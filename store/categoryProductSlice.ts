import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/index";

interface CategoryProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}
const initialState: CategoryProductState = {
  items: [],
  loading: false,
  error: null,
};

const categoryProductSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {
    setCategoryProducts(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCategoryProducts, setLoading, setError } =
  categoryProductSlice.actions;
export default categoryProductSlice.reducer;
