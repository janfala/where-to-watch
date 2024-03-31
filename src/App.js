import APIInfo from "./components/APIInfo";
import SearchSection from "./components/SearchSection";
import { useState } from "react";

function App() {
  const [quotaUpdate, setQuotaUpdate] = useState(null);

  const notifyQuotaUpdate = () => {
    setQuotaUpdate((prevState) => !prevState);
  };
  return (
    <div>
      <h1>Where To Watch</h1>
      <div>
        <h2>How to use</h2>
        <p className="info-text">Find out where you can watch your favourite title by searching for it down below</p>
      </div>
      <APIInfo isQuotaUpdate={quotaUpdate} />
      <h2>Search</h2>
      <SearchSection notifyQuotaUpdate={notifyQuotaUpdate} />
    </div>
  );
}

export default App;
