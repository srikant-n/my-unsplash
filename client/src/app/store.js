import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import galleryReducer from '../home/gallerySlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    gallery: galleryReducer
  },
});
