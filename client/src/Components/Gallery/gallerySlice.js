import { createSlice } from "@reduxjs/toolkit";
import { images as dummyImages } from "../dummy";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    value: [],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    replace: (state, action) => {
      // Replace whole gallery
      state.value = action.payload;
    },
    shiftNewImage: (state, action) => {
      // Add a new image to the start of the gallery
      state.value.unshift(action.payload);
    },
    addNewPage: (state, action) => {
      // Add images at the end for infinite scrolling
      state.value.concat(action.payload);
    },
    removeImage: (state, action) => {
      console.log(action.payload);
      state.value = state.value.filter((image) => image.id !== action.payload);
    },
  },
});

export const {
  replace,
  shiftNewImage,
  addNewPage,
  removeImage,
} = gallerySlice.actions;

/**
 * Thunk to get all images
 * @param {String} query Name search query
 */
export const getImages = (query = "") => (dispatch) => {
  // TODO: API Call
  let images;
  if (query && query.length > 0) {
    images = dummyImages.filter((imageData) => imageData.owner.includes(query));
  } else {
    images = dummyImages;
  }
  setTimeout(() => {
    dispatch(replace(images));
  }, 1000);
};

/**
 * Thunk to Get images for next page in gallery
 * @param {Number} page Current page
 */
export const getNewPage = (page) => (dispatch) => {
  // TODO: API call
  setTimeout(() => {
    dispatch(addNewPage([]));
  }, 1000);
};

export const addNewImage = (url, owner) => (dispatch) => {
  // TODO: API call
  const imageData = { id: new Date().now, url: url, owner: owner };
  setTimeout(() => {
    dispatch(shiftNewImage(imageData));
  }, 1000);
};

export const deleteImage = (imageId, password, callback) => (dispatch) => {
  // TODO: API call
  if (password === "password") {
    setTimeout(() => {
      dispatch(removeImage(imageId));
    }, 1000);
    callback(null);
  } else {
    callback("Invalid Password");
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectImages = (state) => state.gallery.value;

export default gallerySlice.reducer;
