import { useState } from "react";
import SearchResult from "./SearchResult";

const SearchSection = () => {
  const API_KEY = process.env.REACT_APP_KEY;
  const [url, setUrl] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    let input = e.target.elements["title"].value;
    //setUrl(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${input}&search_type=2`);
    setUrl("http://localhost:8000/movies");
  };

  return (
    <div>
      <form className="content" onSubmit={handleSearch}>
        <input type="text" name="title" placeholder="A new Hope.." required />
        <button>Search</button>
      </form>
      {url && <SearchResult url={url} apiKey={API_KEY} />}
    </div>
  );
};

export default SearchSection;
