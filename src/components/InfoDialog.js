const InfoDialog = ({ info, provider, removeDuplicates }) => {
  let key = 0;
  const currYear = new Date().getFullYear();

  return (
    <section className="info">
      <h4 className="info-title">{info.title}</h4>
      {currYear > info.year ? (
        <>
          {info.plot_overview && (
            <section className="info-description">
              <h4>Description</h4>
              <p>{info.plot_overview}</p>
            </section>
          )}
          {info.genre_names.length > 0 && (
            <>
              <h4>Genres</h4>
              <section className="info-genres">
                {info.genre_names.map((genre) => (
                  <p className="genre-name" key={key++}>
                    {genre}
                  </p>
                ))}
              </section>
            </>
          )}
          {provider.trailer && (
            <section className="info-trailer">
              <h4>Trailer</h4>
              <a href={info.trailer} target="_blank">
                Click here to watch
              </a>
            </section>
          )}
          <div>
            {provider.length > 0 && (
              <>
                <h4 className="where-to-watch">Where to watch?</h4>
                <section className="info-sources">
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
                          Go to website
                        </a>
                      </div>
                    )))
                  }
                </section>
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <p>set to release in: {info.year}</p>
        </div>
      )}
    </section>
  );
};

export default InfoDialog;
