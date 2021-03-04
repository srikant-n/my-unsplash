import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Gallery from "../Gallery/Gallery";
import Header from "../Header";
import { AddPhoto, DeletePhoto } from "../Modal";
import { addNewImage, deleteImage } from "../Gallery/gallerySlice";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showDeletePhoto, setShowDeletePhoto] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);

  function onSubmitNewImage(url, name) {
    dispatch(addNewImage(url, name));
  }

  function onClickDelete(imageId) {
    setCurrentImageId(imageId);
    setShowDeletePhoto(true);
  }

  function onSubmitDelete(password) {
    if(currentImageId == null) return;
    dispatch(deleteImage(currentImageId, password, (error) => {
      error ? console.log(error) : closeDeleteModal();
    }));
  }
  
  function closeDeleteModal() {
    setShowDeletePhoto(false);
    setCurrentImageId(null);
  }

  return (
    <div className="App">
      <Header onClickAdd={()=>setShowAddPhoto(true)} />
      <Gallery onClickDelete={onClickDelete} />
      <AddPhoto show={showAddPhoto} onClose={()=>setShowAddPhoto(false)} onSubmit={onSubmitNewImage} />
      <DeletePhoto show={showDeletePhoto} onClose={closeDeleteModal} onSubmit={onSubmitDelete} />
    </div>
  );
}

export default App;
