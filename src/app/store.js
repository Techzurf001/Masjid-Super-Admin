// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import masjidReducer from "../redux/masjidSlice";
import islamicfeaturesReducer from "../redux/islamiceventsSlice";
import galleryReducer from "../redux/gallerySlice";
import feedbackReducer from "../redux/gallerySlice";

export const store = configureStore({
  reducer: {
    masjid: masjidReducer,
    islamicfeatures: islamicfeaturesReducer,
    gallery: galleryReducer,
    feedback: feedbackReducer
  }
});
