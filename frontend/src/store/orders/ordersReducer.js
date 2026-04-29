import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILURE,
  CLEAR_TRACKING,
} from './ordersConstants';

const initialState = {
  userOrders: [],
  trackedOrder: null,
  loading: false,
  trackingLoading: false,
  error: null,
  trackingError: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload,
      };
    case FETCH_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TRACK_ORDER_REQUEST:
      return {
        ...state,
        trackingLoading: true,
        trackingError: null,
      };
    case TRACK_ORDER_SUCCESS:
      return {
        ...state,
        trackingLoading: false,
        trackedOrder: action.payload,
      };
    case TRACK_ORDER_FAILURE:
      return {
        ...state,
        trackingLoading: false,
        trackingError: action.payload,
      };

    case CLEAR_TRACKING:
      return {
        ...state,
        trackedOrder: null,
        trackingError: null,
      };

    default:
      return state;
  }
};

export default ordersReducer;
