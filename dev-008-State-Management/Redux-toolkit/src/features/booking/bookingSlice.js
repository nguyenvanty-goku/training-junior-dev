import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AVAILABLE_ROOMS, VALID_PROMO_CODES } from '../../data/hotelData';

export const submitBooking = createAsyncThunk(
  'booking/submitBooking',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().booking;
      
      if (!state.customer.fullName || !state.customer.phone) {
        return rejectWithValue('Vui lòng điền họ tên và số điện thoại người đặt!');
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const bookingCode = `BK-${Date.now().toString().slice(-6)}`;
      return {
        bookingId: bookingCode,
        createdAt: new Date().toISOString(),
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Đã có lỗi xảy ra khi gửi đơn đặt');
    }
  }
);

const initialState = {
  selectedRoom: AVAILABLE_ROOMS[0],
  nights: 2,
  guests: {
    adults: 2,
    children: 0,
  },
  selectedServices: [],
  promo: {
    code: '',
    discountPercent: 0,
    isApplied: false,
    errorMessage: '',
  },
  customer: {
    fullName: 'Trần Minh Quân',
    phone: '0912345678',
    email: 'minhquan@example.com',
    specialRequest: 'Phòng tầng cao, view thoáng đãng',
  },
  status: 'idle',
  bookingId: null,
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setNights: (state, action) => {
      state.nights = Math.max(1, action.payload);
    },
    updateGuests: (state, action) => {
      state.guests = { ...state.guests, ...action.payload };
    },
    toggleService: (state, action) => {
      const serviceId = action.payload;
      const index = state.selectedServices.indexOf(serviceId);
      if (index >= 0) {
        state.selectedServices.splice(index, 1);
      } else {
        state.selectedServices.push(serviceId);
      }
    },
    applyPromoCode: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      if (VALID_PROMO_CODES[code]) {
        state.promo = {
          code,
          discountPercent: VALID_PROMO_CODES[code],
          isApplied: true,
          errorMessage: '',
        };
      } else {
        state.promo.errorMessage = 'Mã ưu đãi không hợp lệ (Thử: GIAMGIA10 hoặc RESORT20)';
        state.promo.isApplied = false;
        state.promo.discountPercent = 0;
      }
    },
    removePromoCode: (state) => {
      state.promo = {
        code: '',
        discountPercent: 0,
        isApplied: false,
        errorMessage: '',
      };
    },
    updateCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    resetBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookingId = action.payload.bookingId;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Không thể tạo đơn đặt phòng';
      });
  },
});

export const {
  selectRoom,
  setNights,
  updateGuests,
  toggleService,
  applyPromoCode,
  removePromoCode,
  updateCustomer,
  resetBooking,
} = bookingSlice.actions;

export const selectBooking = (state) => state.booking;

export const selectRoomSubtotal = (state) => {
  const { selectedRoom, nights } = state.booking;
  return (selectedRoom?.pricePerNight || 0) * nights;
};

export const selectBookingTotal = (state) => {
  const { selectedRoom, nights, selectedServices, promo } = state.booking;
  const roomCost = (selectedRoom?.pricePerNight || 0) * nights;
  const servicesCost = selectedServices.length * 350000;
  const rawTotal = roomCost + servicesCost;

  if (promo.isApplied && promo.discountPercent > 0) {
    const discountAmount = (rawTotal * promo.discountPercent) / 100;
    return {
      subtotal: rawTotal,
      discountAmount,
      finalTotal: rawTotal - discountAmount,
    };
  }

  return {
    subtotal: rawTotal,
    discountAmount: 0,
    finalTotal: rawTotal,
  };
};

export default bookingSlice.reducer;

