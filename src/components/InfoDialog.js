const InfoDialog = ({ info, provider, removeDuplicates }) => {
  let key = 0;
  const currYear = new Date().getFullYear();

  return (
    <div className="info">
      <h4 className="info-title">{info.title}</h4>
      {currYear > info.year ? (
        <>
          {info.plot_overview && (
            <div className="info-description">
              <h4>Description</h4>
              <p>{info.plot_overview}</p>
            </div>
          )}
          {info.genre_names.length > 0 && (
            <>
              <h4>Genres</h4>
              <div className="info-genres">
                {info.genre_names.map((genre) => (
                  <p className="genre-name" key={key++}>
                    {genre}
                  </p>
                ))}
              </div>
            </>
          )}
          {provider.trailer !== null && (
            <div className="info-trailer">
              <h4>Trailer</h4>
              <a href={info.trailer} target="_blank">
                click here to watch trailer
              </a>
            </div>
          )}
          <div>
            {provider.length > 0 && (
              <>
                <h4>Where to watch?</h4>
                <div className="info-sources">
                  {
                    (provider = removeDuplicates(provider, true).map((prov) => (
                      <div className="source" key={key++}>
                        <h5>{prov.name}</h5>
                        <ul>
                          <li>Quality: {prov.format}</li>
                          <li>Price: {prov.price || " -"}</li>
                          <li>Payment-type: {prov.type}</li>
                          <li>Seasons: {prov.seasons}</li>
                          <li>Region: {prov.region}</li>
                        </ul>
                        <a href={prov.web_url} target="_blank">
                          Go To Website
                        </a>
                      </div>
                    )))
                  }
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <p>set to release in: {info.year}</p>
        </div>
      )}
    </div>
  );
};

export default InfoDialog;
