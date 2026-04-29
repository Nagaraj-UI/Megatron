import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from './cartConstants';

// Add item to cart
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

// Remove item from cart
export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

// Update item quantity
export const updateQuantity = (itemId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { itemId, quantity },
});

// Clear entire cart
export const clearCart = () => ({
  type: CLEAR_CART,
});
