// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import masjidReducer from "../redux/masjidSlice";
import islamicfeaturesReducer from "../redux/islamiceventsSlice"

export const store = configureStore({
  reducer: {
    masjid: masjidReducer,
    islamicfeatures: islamicfeaturesReducer
  }
});
