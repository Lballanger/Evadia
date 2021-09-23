import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import citySlice from '../features/city/citySlice';

export default configureStore({
  reducer: {
    city: citySlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializable: false,
  }),
});
