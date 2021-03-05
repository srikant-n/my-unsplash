import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getImages } from "../Gallery/gallerySlice";
import {Logo, SearchIcon} from "../../images";
import "./Header.scss";

function Header({onClickAdd}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  /**
   * Input text in search bar changed
   * @param {Event} event Input changed event
   */
  function onChangeSearch(event) {
    setSearch(event.target.value);
  }

  /**
   * Search form submitted
   * @param {Event} event Search submit event
   */
  function onSubmitSearch(event) {
    event.preventDefault();
    dispatch(getImages(search));
  }
  
  return (
    <header className="sticky-top bg-white py-3 d-flex flex-row justify-content-between">
      <div className="d-flex flex-row align-items-center justify-content-center">
        <Logo className="logo" role="img" aria-label="Logo" />
        <Logo className="logo-mini" viewBox="0 0 24 26" role="img" aria-label="Logo" />
        <form id="search" className="search-bar" onSubmit={onSubmitSearch}>
          <button aria-label="Submit search">
            <SearchIcon role="img" aria-label="Search Icon" />
          </button>
          <input type="text" placeholder="Search by name" aria-label="Search" value={search} onChange={onChangeSearch}/>
        </form>
      </div>
      <Button variant="success" onClick={onClickAdd}>
        <span className="add-button-full">Add Photo</span>
        <span className="add-button-mini">+</span>
      </Button>
    </header>
  );
}

export default Header;
