import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import cartReducer from './cartSlice';
import authReducer from './auth/authReducer';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
