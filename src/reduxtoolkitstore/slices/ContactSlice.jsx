import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await fetch(
      "https://node-app-production-8f02.up.railway.app/contacts"
    );

    return response.json();
  }
);

const ContactSlice = createSlice({
    name: 'contacts',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ContactSlice.reducer;


