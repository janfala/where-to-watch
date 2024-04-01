import APIInfo from "./components/APIInfo";
import SearchSection from "./components/SearchSection";
import { useState } from "react";

function App() {
  const [quotaUpdate, setQuotaUpdate] = useState(null);

  const notifyQuotaUpdate = () => {
    setQuotaUpdate((prevState) => !prevState);
  };
  return (
    <>
      <h1>Where To Watch</h1>
      <section className="mainframe">
        <section className="how-to">
          <h2>How to use</h2>
          <p className="text">
            Find out where you can watch your favourite title by searching for it. Just type in the name of any movie or
            show and click on search.
          </p>
        </section>
        <APIInfo isQuotaUpdate={quotaUpdate} />
        <h2 className="search-h">Search</h2>
        <SearchSection notifyQuotaUpdate={notifyQuotaUpdate} />
      </section>
    </>
  );
}

export default App;
