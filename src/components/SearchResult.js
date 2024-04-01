import { useEffect, useState } from "react";
import InfoDialog from "./InfoDialog";

const SearchResult = ({ url, apiKey, notifyQuotaUpdate }) => {
  const [titles, setTitles] = useState(null);
  const [error, setError] = useState(false);
  const [clickedInfo, setClickedInfo] = useState(false);
  const [info, setInfo] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (url) {
      getData(url, false);
    }
  }, [url]);

  const handleDetails = (id) => {
    url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;
    // url = "http://localhost:8000/details";
    setClickedInfo(true);
    getData(url, true);
  };

  function getData(url, isDetail) {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (isDetail) {
          setInfo(data);
          setProvider(data.sources);
        } else {
          setTitles(removeDuplicates(data, false));
        }
        notifyQuotaUpdate();
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  }

  function removeDuplicates(array, isDetail) {
    const uniqueValues = new Set();
    const uniqueElements = [];

    if (!isDetail) {
      array = array.results;
    }
    array.forEach((element) => {
      const value = element.name;
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueElements.push(element);
      }
    });

    return uniqueElements;
  }

  return (
    <>
      {!error ? (
        <section className={titles && titles.length <= 2 ? "results justify-center" : "results justify-left"}>
          {titles &&
            titles.map((title) => (
              <section className="movie-card" key={title.id}>
                <div className="card-inner">
                  <section className="card-front">
                    {!/blank\.gif/.test(title.image_url) ? (
                      <img src={title.image_url} alt="" />
                    ) : (
                      <p className="blank-poster-text">{title.name}</p>
                    )}
                  </section>
                  <section className="card-back">
                    <div className="card-back-text">
                      <h3>{title.name}</h3>
                      <ul>
                        {title.type && <li>{title.type}</li>}
                        <li>{title.year ? title.year : "-"}</li>
                      </ul>
                    </div>
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
                  </section>
                </div>
              </section>
            ))}
          {clickedInfo && (
            <section className="dialog-overlay">
              <dialog open className="dialog">
                <form>
                  {info && provider && (
                    <InfoDialog
                      info={info}
                      provider={provider}
                      removeDuplicates={removeDuplicates}
                      notifyQuotaUpdate={notifyQuotaUpdate}
                    />
                  )}
                  <button
                    onClick={() => {
                      setClickedInfo(false);
                    }}
                  >
                    Close
                  </button>
                </form>
              </dialog>
            </section>
          )}
        </section>
      ) : (
        <p className="text error">An error occured, please try again</p>
      )}
    </>
  );
};

export default SearchResult;
