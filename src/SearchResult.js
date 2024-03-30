import { useEffect, useState } from "react";
import InfoDialog from "./InfoDialog";

const SearchResult = ({ url }) => {
  const [titles, setTitles] = useState(null);
  const [error, setError] = useState(false);
  const [clickedInfo, setClickedInfo] = useState(false);
  const [info, setInfo] = useState(null);
  const [provider, setProvider] = useState(null);

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
    url = "http://localhost:8000/details";
    setClickedInfo(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setInfo(data[0]); // only has 1 hit so this should be fine
        setProvider(data[0].sources);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  };

  return (
    <div className="results">
      {titles &&
        titles.map((title) => (
          <div className="movie-card" key={title.id}>
            <div className="card-inner">
              <div className="card-front">
                {!/blank\.gif/.test(title.image_url) ? (
                  <img src={title.image_url} alt="" />
                ) : (
                  <div className="blank-picture">{title.name}</div>
                )}
              </div>
              <div className="card-back">
                <h3>{title.name}</h3>
                <ul>
                  <li>{title.type}</li>
                  <li>{title.year}</li>
                </ul>
                {!clickedInfo && (
                  <button className="detail-btn" onClick={() => handleDetails(title.id)}>
                    Show Info
                  </button>
                )}
                {clickedInfo && (
                  <button className="detail-btn" onClick={() => handleDetails(title.id)} disabled>
                    Show Info
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      {clickedInfo && (
        <dialog open className="dialog">
          <form>
            {info && provider && <InfoDialog info={info} provider={provider} />}
            <button
              onClick={() => {
                setClickedInfo(false);
              }}
            >
              close info
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default SearchResult;
