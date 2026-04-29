import axios from 'axios';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_FEATURED_REQUEST,
  FETCH_FEATURED_SUCCESS,
  FETCH_FEATURED_FAILURE,
  FETCH_NEW_ARRIVALS_REQUEST,
  FETCH_NEW_ARRIVALS_SUCCESS,
  FETCH_NEW_ARRIVALS_FAILURE,
  FETCH_SALE_REQUEST,
  FETCH_SALE_SUCCESS,
  FETCH_SALE_FAILURE,
  SET_QUERY,
  SET_ACTIVE_CATEGORY,
  SET_ACTIVE_SECTION,
} from './itemsConstants';

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Helper to check if cache is still valid
const isCacheValid = (lastFetchTime) => {
  if (!lastFetchTime) return false;
  return Date.now() - lastFetchTime < CACHE_TTL;
};

// Fetch all items with optional search query
export const fetchItems = (query = '', forceRefresh = false) => async (dispatch, getState) => {
  const { items } = getState();
  
  // Check cache - skip if already fetched and cache is valid
  if (!forceRefresh && items.itemsFetched && isCacheValid(items.lastFetchTime.items) && !query) {
    console.log('Using cached items');
    return;
  }

  try {
    dispatch({ type: FETCH_ITEMS_REQUEST });

    const { data } = await axios.get(`/api/items?q=${query}`);

    dispatch({
      type: FETCH_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ITEMS_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Fetch featured items
export const fetchFeaturedItems = (forceRefresh = false) => async (dispatch, getState) => {
  const { items } = getState();
  
  // Check cache
  if (!forceRefresh && items.featuredFetched && isCacheValid(items.lastFetchTime.featured)) {
    console.log('Using cached featured items');
    return;
  }

  try {
    dispatch({ type: FETCH_FEATURED_REQUEST });

    const { data } = await axios.get('/api/items/featured');

    dispatch({
      type: FETCH_FEATURED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_FEATURED_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Fetch new arrivals
export const fetchNewArrivals = (forceRefresh = false) => async (dispatch, getState) => {
  const { items } = getState();
  
  // Check cache
  if (!forceRefresh && items.newArrivalsFetched && isCacheValid(items.lastFetchTime.newArrivals)) {
    console.log('Using cached new arrivals');
    return;
  }

  try {
    dispatch({ type: FETCH_NEW_ARRIVALS_REQUEST });

    const { data } = await axios.get('/api/items/new-arrivals');

    dispatch({
      type: FETCH_NEW_ARRIVALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_NEW_ARRIVALS_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Fetch sale items
export const fetchSaleItems = (forceRefresh = false) => async (dispatch, getState) => {
  const { items } = getState();
  
  // Check cache
  if (!forceRefresh && items.saleFetched && isCacheValid(items.lastFetchTime.sale)) {
    console.log('Using cached sale items');
    return;
  }

  try {
    dispatch({ type: FETCH_SALE_REQUEST });

    const { data } = await axios.get('/api/items/sale');

    dispatch({
      type: FETCH_SALE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SALE_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Set search query
export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: query,
});

// Set active category
export const setActiveCategory = (category) => ({
  type: SET_ACTIVE_CATEGORY,
  payload: category,
});

// Set active section
export const setActiveSection = (section) => ({
  type: SET_ACTIVE_SECTION,
  payload: section,
});
