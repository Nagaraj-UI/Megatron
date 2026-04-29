import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from './cartConstants';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(i => i._id === action.payload._id);
      
      if (existingItem) {
        // Item already in cart, increase quantity
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      } else {
        // New item, add to cart with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(i => i._id !== action.payload),
      };

    case UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter(i => i._id !== itemId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(i =>
          i._id === itemId ? { ...i, quantity } : i
        ),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
