const InfoDialog = ({ info, provider }) => {
  return (
    <div>
      <h4>Title</h4>
      <p>{info.title}</p>
      <h4>Description</h4>
      <p>{info.plot_overview}</p>
      <h4>Trailer</h4>
      <a href={info.trailer} target="_blank">
        click here to watch trailer
      </a>
      <h4>Where to watch?</h4>
      <div>
        {provider &&
          provider.map((prov) => (
            <div className="sources" key={prov.source_id}>
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
      </div>
    </div>
  );
};

export default InfoDialog;
