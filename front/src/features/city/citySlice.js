/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import API from '../../api';

export const getRandomCity = createAsyncThunk(
  'city/random',
  async (_, thunkAPI) => {
    try {
      return await API.getRandomCity();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getOneCity = createAsyncThunk(
  'city/oneCity',
  async (params, thunkAPI) => {
    try {
      return await API.getCity(params);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: {},
    cities: [],
    loading: false,
  },
  reducers: {
    // getRandom: async (state) => {
    //   const data = await API.getRandomCity();
    //   state.city = JSON.parse(data);
    // },
    // getOne: async (state, action) => {
    //   state.city = await API.getCity(action.payload);
    // },
    // getAll: async (state, action) => {
    //   state.cities = await API.getCityWithCriteria(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getRandomCity.pending, (state) => {
      state.city = {};
      state.loading = true;
    });
    builder.addCase(getRandomCity.fulfilled, (state, { payload }) => {
      state.city = payload;
      state.loading = false;
    });
    builder.addCase(getRandomCity.rejected, (state, action) => {
      state.city = {};
      state.loading = false;
    });
    builder.addCase(getOneCity.pending, (state) => {
      state.city = {};
      state.loading = true;
    });
    builder.addCase(getOneCity.fulfilled, (state, { payload }) => {
      state.city = payload;
      state.loading = false;
    });
    builder.addCase(getOneCity.rejected, (state, action) => {
      state.city = {};
      state.loading = false;
    });
  },
});

export const randomCity = createSelector(
  (state) => ({
    city: state.city,
    loading: state.loading,
  }),
  (state) => state
);

export default citySlice;
