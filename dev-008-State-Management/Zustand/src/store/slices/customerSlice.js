export const initialCustomerState = {
  fullName: 'Nguyễn Văn A',
  phone: '0987654321',
  address: 'Số 123 Đường Cầu Giấy, Hà Nội',
  paymentMethod: 'cod',
  note: 'Giao giờ hành chính giúp em',
};

export const createCustomerSlice = (set) => ({
  customer: initialCustomerState,

  updateCustomer: (fields) => {
    set((state) => ({
      customer: {
        ...state.customer,
        ...fields,
      },
    }));
  },

  resetCustomer: () => {
    set({ customer: initialCustomerState });
  },
});

