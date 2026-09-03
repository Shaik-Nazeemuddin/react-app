import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "registeredusers/fetchUsers",
  async () => {
    const response = await fetch(
      "https://node-app-production-8f02.up.railway.app/users"
    );

    return response.json();
  }
);

const RegisteredUserSlice = createSlice({
    name: 'registered',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default RegisteredUserSlice.reducer;


