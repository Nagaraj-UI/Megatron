import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async (query = '') => {
  const res = await axios.get(`/api/items?q=${query}`);
  return res.data;
});

export const fetchFeaturedItems = createAsyncThunk('items/fetchFeaturedItems', async () => {
  const res = await axios.get('/api/items/featured');
  return res.data;
});

export const fetchNewArrivals = createAsyncThunk('items/fetchNewArrivals', async () => {
  const res = await axios.get('/api/items/new-arrivals');
  return res.data;
});

export const fetchSaleItems = createAsyncThunk('items/fetchSaleItems', async () => {
  const res = await axios.get('/api/items/sale');
  return res.data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    featuredItems: [],
    newArrivals: [],
    saleItems: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    featuredStatus: 'idle',
    newArrivalsStatus: 'idle',
    saleStatus: 'idle',
    error: null,
    query: '',
    activeCategory: 'All',
    activeSection: 'all', // 'all' | 'featured' | 'new' | 'sale'
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Regular items
      .addCase(fetchItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Featured items
      .addCase(fetchFeaturedItems.pending, (state) => { state.featuredStatus = 'loading'; })
      .addCase(fetchFeaturedItems.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded';
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedItems.rejected, (state, action) => {
        state.featuredStatus = 'failed';
        state.error = action.error.message;
      })
      // New arrivals
      .addCase(fetchNewArrivals.pending, (state) => { state.newArrivalsStatus = 'loading'; })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.newArrivalsStatus = 'succeeded';
        state.newArrivals = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.newArrivalsStatus = 'failed';
        state.error = action.error.message;
      })
      // Sale items
      .addCase(fetchSaleItems.pending, (state) => { state.saleStatus = 'loading'; })
      .addCase(fetchSaleItems.fulfilled, (state, action) => {
        state.saleStatus = 'succeeded';
        state.saleItems = action.payload;
      })
      .addCase(fetchSaleItems.rejected, (state, action) => {
        state.saleStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setQuery, setActiveCategory, setActiveSection } = itemsSlice.actions;
export default itemsSlice.reducer;
