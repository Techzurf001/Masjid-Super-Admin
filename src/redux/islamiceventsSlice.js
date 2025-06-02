import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NetworkString } from "../utils/networkString";
import { get, post } from "../services/networkServices";

// GET Islamic Features
export const fetchIslamicFeatures = createAsyncThunk(
  "islamicevents/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(NetworkString.ISLAMICFEATURES_LIST);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST Islamic Features
export const createIslamicFeatures = createAsyncThunk(
  "islamicevents/add",
  async (islamicFeaturesData, { rejectWithValue }) => {
    try {
      return await post(
        NetworkString.ISLAMICFEATURES_CREATE,
        islamicFeaturesData
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const islamicfeaturesSlice = createSlice({
  name: "islamicFeatures",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIslamicFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIslamicFeatures.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload?.result || [];
      })
      .addCase(fetchIslamicFeatures.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createIslamicFeatures.fulfilled, (state, { payload }) => {
        const newItem = {
          eventDetails: {
            eventName: payload?.data?.eventName,
            date: payload?.data?.date,
            description: payload?.data?.description,
            reference: payload?.data?.reference,
          },
          status: payload?.data?.status,
          _id: payload?.data?._id,
        };

        state.data.push(newItem);
      })

      .addCase(createIslamicFeatures.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default islamicfeaturesSlice.reducer;
