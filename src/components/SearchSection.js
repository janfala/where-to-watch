import { useState } from "react";
import SearchResult from "./SearchResult";

const SearchSection = ({ notifyQuotaUpdate }) => {
  const API_KEY = process.env.REACT_APP_KEY;
  const [url, setUrl] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    let input = e.target.elements["title"].value;
    setUrl(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${input}&search_type=2`);
    // setUrl("http://localhost:8000/movies");
  };

  return (
    <>
      <section className="searchbar">
        <form onSubmit={handleSearch}>
          <input type="text" name="title" placeholder="Star wars.." required />
          <button>Search</button>
        </form>
      </section>
      {url && <SearchResult url={url} apiKey={API_KEY} notifyQuotaUpdate={notifyQuotaUpdate} />}
    </>
  );
};

export default SearchSection;
