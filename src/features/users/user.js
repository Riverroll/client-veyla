import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    User: [],
  },
  reducers: {
    // Reducer untuk mengatur data pengguna
    setUser: (state, action) => {
      state.User = action.payload; // Mengupdate state User dengan payload dari action
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
