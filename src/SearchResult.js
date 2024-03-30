import { useEffect, useState } from "react";

const SearchResult = ({ url }) => {
  const [titles, setTitles] = useState(null);
  const [error, setError] = useState(false);
  const displayed = new Set();

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        const uniqueNames = new Set();
        const uniqueMovies = [];
        data.forEach((movie) => {
          const name = movie.name;
          if (!uniqueNames.has(name)) {
            uniqueNames.add(name);
            uniqueMovies.push(movie);
          }
        });

        setTitles(uniqueMovies);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  }, [url]);

  const handleDetails = (id) => {
    url = "http:/localhost/8000/details";
  };

  return (
    <div className="results">
      {titles &&
        titles.map((title) => (
          <div className="movie-card" key={title.id}>
            <div className="card-inner">
              <div className="card-front">
                {title.image_url !== "https://cdn.watchmode.com/posters/blank.gif" ? (
                  <img src={title.image_url} alt="" />
                ) : (
                  <div>{title.name}</div>
                )}
              </div>
              <div className="card-back">
                <h3>{title.name}</h3>
                <ul>
                  <li>{title.type}</li>
                  <li>{title.year}</li>
                </ul>
                <button className="detail-btn" onClick={() => handleDetails(title.id)}>
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResult;
