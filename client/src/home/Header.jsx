import React from 'react';
import { Button, Image } from 'react-bootstrap';
import logo from './my_unsplash_logo.svg';
import './Header.scss';

function Header() {
  return (
    <header className="sticky-top bg-white py-3 d-flex flex-row justify-content-between">
      <div class="d-flex flex-row align-items-center justify-content-center">
        <Image src={logo} alt="Logo" />
        <div id="search" className="search-bar">
          <button aria-label="Submit search">
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
          </button>
          <input type="text" placeholder="Search by name" aria-label="Search" />
        </div>
      </div>
      <Button className="add" variant="success">
        Add a photo
      </Button>
    </header>
  );
}

export default Header;
