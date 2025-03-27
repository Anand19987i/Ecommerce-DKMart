import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userDetail: null,
  product: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    }
  },
});

export const { 
  setUser, setUserDetail, 
} = authSlice.actions;

export default authSlice.reducer;