import { useState, useEffect } from "react";

const Searchbar = () => {
  const API_KEY = process.env.REACT_APP_KEY;
  let url = "";

  const handleSearch = (e) => {
    e.preventDefault();
    let input = e.target.elements["title"].value;
    //  url = "https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${input}&search_type=2`";
    url = "http://localhost:8000/movies";
  };

  return (
    <div>
      <form className="content" onSubmit={handleSearch}>
        <input type="text" name="title" placeholder="A new Hope.." required />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
