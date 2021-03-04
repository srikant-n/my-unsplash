import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Gallery from "../home/Gallery";
import { getImages } from "../home/gallerySlice";
import Header from "../home/Header";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages());
  });

  return (
    <div className="App">
      <Header />
      <Gallery />
    </div>
  );
}

export default App;
