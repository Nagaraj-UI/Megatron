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

const initialState = {
  list: [],
  featuredItems: [],
  newArrivals: [],
  saleItems: [],
  loading: false,
  featuredLoading: false,
  newArrivalsLoading: false,
  saleLoading: false,
  error: null,
  query: '',
  activeCategory: 'All',
  activeSection: 'all', // 'all' | 'featured' | 'new' | 'sale'
  // Cache flags to prevent duplicate API calls
  itemsFetched: false,
  featuredFetched: false,
  newArrivalsFetched: false,
  saleFetched: false,
  lastFetchTime: {
    items: null,
    featured: null,
    newArrivals: null,
    sale: null,
  },
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all items
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        itemsFetched: true,
        lastFetchTime: {
          ...state.lastFetchTime,
          items: Date.now(),
        },
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Fetch featured items
    case FETCH_FEATURED_REQUEST:
      return {
        ...state,
        featuredLoading: true,
        error: null,
      };
    case FETCH_FEATURED_SUCCESS:
      return {
        ...state,
        featuredLoading: false,
        featuredItems: action.payload,
        featuredFetched: true,
        lastFetchTime: {
          ...state.lastFetchTime,
          featured: Date.now(),
        },
      };
    case FETCH_FEATURED_FAILURE:
      return {
        ...state,
        featuredLoading: false,
        error: action.payload,
      };

    // Fetch new arrivals
    case FETCH_NEW_ARRIVALS_REQUEST:
      return {
        ...state,
        newArrivalsLoading: true,
        error: null,
      };
    case FETCH_NEW_ARRIVALS_SUCCESS:
      return {
        ...state,
        newArrivalsLoading: false,
        newArrivals: action.payload,
        newArrivalsFetched: true,
        lastFetchTime: {
          ...state.lastFetchTime,
          newArrivals: Date.now(),
        },
      };
    case FETCH_NEW_ARRIVALS_FAILURE:
      return {
        ...state,
        newArrivalsLoading: false,
        error: action.payload,
      };

    // Fetch sale items
    case FETCH_SALE_REQUEST:
      return {
        ...state,
        saleLoading: true,
        error: null,
      };
    case FETCH_SALE_SUCCESS:
      return {
        ...state,
        saleLoading: false,
        saleItems: action.payload,
        saleFetched: true,
        lastFetchTime: {
          ...state.lastFetchTime,
          sale: Date.now(),
        },
      };
    case FETCH_SALE_FAILURE:
      return {
        ...state,
        saleLoading: false,
        error: action.payload,
      };

    // UI state
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    default:
      return state;
  }
};

export default itemsReducer;
