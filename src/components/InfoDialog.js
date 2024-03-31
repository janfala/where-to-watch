const InfoDialog = ({ info, provider }) => {
  let key = 0;
  const currYear = new Date().getFullYear();
  return (
    <div>
      <h4>{info.title}</h4>
      {currYear > info.year ? (
        <>
          <h4>Description</h4>
          {info.plot_overview && <p>{info.plot_overview}</p>}
          {info.genre_names.length > 0 && (
            <>
              <h4>Genres</h4>
              <div className="genres" key={key++}>
                {info.genre_names.map((genre) => (
                  <p>{genre}</p>
                ))}
              </div>
            </>
          )}
          {provider.trailer !== null && (
            <>
              <h4>Trailer</h4>
              <a href={info.trailer} target="_blank">
                click here to watch trailer
              </a>
            </>
          )}
          <div>
            {provider.length > 0 && (
              <>
                <h4>Where to watch?</h4>
                {provider.map((prov) => (
                  <div className="sources" key={key++}>
                    <h5>{prov.name}</h5>
                    <ul>
                      <li>quality: {prov.format}</li>
                      <li>price: {prov.price || " -"}</li>
                      <li>payment-type: {prov.type}</li>
                      <li>seasons: {prov.seasons}</li>
                      <li>region: {prov.region}</li>
                    </ul>
                    <a href={prov.web_url} target="_blank">
                      go to website
                    </a>
                  </div>
                ))}
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
