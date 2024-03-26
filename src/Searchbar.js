import { useState, useEffect } from "react";

const Searchbar = () => {
  const API_KEY = process.env.REACT_APP_KEY;
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState(null);
  const [movies, setMovies] = useState(null);

  const searchMovie = () => {
    const inputField = document.getElementById("field");
    !inputField.value ? setMessage("Please input a movie name") : getMovie(inputField.value);
  };

  const getMovie = (input) => {
    // setUrl(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${input}&search_type=3`);
    setUrl("http://localhost:8000/movies");
  };

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);

  return (
    <div>
      <div className="content">
        <input type="text" placeholder="A new Hope.." id="field" />
        <button onClick={() => searchMovie()}>Search</button>
      </div>
      {message && <p id="message">{message}</p>}
    </div>
  );
};

export default Searchbar;
