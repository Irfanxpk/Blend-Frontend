import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.adminData = action.payload;
    },
    clearAdmin: (state) => {
      state.adminData = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
