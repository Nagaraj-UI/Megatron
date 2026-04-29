import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items/itemsReducer';
import cartReducer from './cart/cartReducer';
import authReducer from './auth/authReducer';
import ordersReducer from './orders/ordersReducer';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});
