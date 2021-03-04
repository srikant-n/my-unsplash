import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './Components/Gallery/gallerySlice';

export default configureStore({
  reducer: {
    gallery: galleryReducer
  },
});
