import axios from 'axios';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERROR,
} from './authConstants';

// Signup action
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const { data } = await axios.post('/api/auth/signup', userData);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response?.data?.error || 'Signup failed',
    });
  }
};

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post('/api/auth/login', credentials);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.error || 'Login failed',
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

// Clear error action
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
