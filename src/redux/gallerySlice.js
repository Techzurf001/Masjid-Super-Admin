import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../services/networkServices";
import { NetworkString } from "../utils/networkString";

// GET Gallery
export const fetchGallery = createAsyncThunk(
  "gallery/gallery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(NetworkString.GALLERY_LIST);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST Gallery
export const createGallery = createAsyncThunk(
  "gallery/addgallery",
  async (galleryData, { rejectWithValue }) => {
    try {
      return await post(NetworkString.GALLERY_CREATE, galleryData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload?.result || [];
      })
      .addCase(fetchGallery.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createGallery.fulfilled, (state, { payload }) => {
        state.data.push(payload?.data);
      })
      .addCase(createGallery.rejected, (state, { payload }) => {
        state.error = payload;
      })
  },
});

export default gallerySlice.reducer;
