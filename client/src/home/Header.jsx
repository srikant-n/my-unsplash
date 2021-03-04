import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getImages } from "./gallerySlice";
import logo from "./images/my_unsplash_logo.svg";
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const SearchLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="18px"
      height="18px"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );

  function onChangeSearch(event) {
    console.log(event.target);
    setSearch(event.target.value);
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    dispatch(getImages(search));
  }
  
  return (
    <header className="sticky-top bg-white py-3 d-flex flex-row justify-content-between">
      <div className="d-flex flex-row align-items-center justify-content-center">
        <Image src={logo} alt="Logo" />
        <form id="search" className="search-bar" onSubmit={onSubmitSearch}>
          <button aria-label="Submit search">
            <SearchLogo />
          </button>
          <input type="text" placeholder="Search by name" aria-label="Search" value={search} onChange={onChangeSearch}/>
        </form>
      </div>
      <Button className="add" variant="success">
        Add a photo
      </Button>
    </header>
  );
}

export default Header;
