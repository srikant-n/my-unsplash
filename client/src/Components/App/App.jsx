import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Gallery from "../Gallery/Gallery";
import Header from "../Header";
import { AddPhoto, DeletePhoto } from "../Modal";
import { getImagesData, addNewImage, deleteImage } from "../Gallery/gallerySlice";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showDeletePhoto, setShowDeletePhoto] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getImagesData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  /**
   * Clicked submit on add photo modal
   * @param {String} url Image url
   * @param {String} name Name of image's owner
   */
  function onSubmitNewImage(url, name) {
    dispatch(addNewImage(url, name));
  }

  /**
   * Clicked delete button on the image
   * @param {*} imageId Id of the image to be deleted
   */
  function onClickDelete(imageId) {
    setCurrentImageId(imageId);
    setShowDeletePhoto(true);
  }

  /**
   * Clicked on submit in the delete modal to confirm deletion
   * @param {String} password password to delete image
   */
  function onSubmitDelete(password) {
    if(currentImageId == null) return;
    setError(null);
    dispatch(deleteImage(currentImageId, password, (error) => {
      error ? setError(error) : closeDeleteModal();
    }));
  }
  
  /**
   * Hide the delete modal
   */
  function closeDeleteModal() {
    setShowDeletePhoto(false);
    setCurrentImageId(null);
  }

  return (
    <div className="App">
      <Header onClickAdd={()=>setShowAddPhoto(true)} />
      <Gallery onClickDelete={onClickDelete} />
      <AddPhoto show={showAddPhoto} onClose={()=>setShowAddPhoto(false)} onSubmit={onSubmitNewImage} />
      <DeletePhoto show={showDeletePhoto} errorMessage={error} onClose={closeDeleteModal} onSubmit={onSubmitDelete} />
    </div>
  );
}

export default App;
