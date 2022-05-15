import { configureStore } from '@reduxjs/toolkit';
import productReducer  from '../features/ProductSlice'

// pembuatan store dari nilai slice
export const store = configureStore({
  reducer: {
    product: productReducer
  },
});
