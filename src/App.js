import Searchbar from "./Searchbar";

function App() {
  return (
    <div>
      <h1>Where To Watch</h1>
      <div>
        <h2>How to use</h2>
        <p className="info-text">Find out where you can watch your favourite title by searching for it down below</p>
      </div>
      <h2>Search</h2>
      <Searchbar />;
    </div>
  );
}

export default App;
