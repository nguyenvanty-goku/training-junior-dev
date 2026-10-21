import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

