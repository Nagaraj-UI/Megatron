import axios from 'axios';
import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILURE,
  CLEAR_TRACKING,
} from './ordersConstants';

// Fetch orders for a specific user
export const fetchUserOrders = (email) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/user/${email}`);

    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Track order by tracking number
export const trackOrder = (trackingNumber) => async (dispatch) => {
  try {
    dispatch({ type: TRACK_ORDER_REQUEST });
    console.log('Tracking order with number:', trackingNumber);

    const { data } = await axios.get(`/api/orders/track/${trackingNumber}`);

    dispatch({
      type: TRACK_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRACK_ORDER_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Clear tracking data
export const clearTracking = () => ({
  type: CLEAR_TRACKING,
});
