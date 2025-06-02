// src/redux/masjidSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../services/networkServices";
import { NetworkString } from "../utils/networkString";

// GET Masjids
export const fetchMasjids = createAsyncThunk(
  "masjid/get",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      return await get(NetworkString.MASJID_LIST, token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST Masjid
export const createMasjid = createAsyncThunk(
  "masjid/create",
  async (masjidData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      return await post(NetworkString.MASJID_CREATE, token, masjidData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const masjidSlice = createSlice({
  name: "masjid",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasjids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasjids.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload?.result || [];
      })

      .addCase(fetchMasjids.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createMasjid.fulfilled, (state, { payload }) => {
        state.data.push(payload?.data);
      })
      .addCase(createMasjid.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default masjidSlice.reducer;
