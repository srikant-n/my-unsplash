import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Gallery from "../Gallery/Gallery";
import Header from "../Header";
import AddPhoto from "../Modal/AddPhoto";
import {addNewImage} from "../Gallery/gallerySlice";
import "./App.scss";

function App() {
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const dispatch = useDispatch();

  function onSubmitNewImage(url, name) {
    dispatch(addNewImage(url, name));
  }

  return (
    <div className="App">
      <Header onClickAdd={()=>setShowAddPhoto(true)} />
      <Gallery />
      <AddPhoto show={showAddPhoto} onClose={()=>setShowAddPhoto(false)} onSubmit={onSubmitNewImage} />
    </div>
  );
}

export default App;
