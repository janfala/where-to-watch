import { useEffect, useState } from "react";

const APIInfo = ({ isQuotaUpdate }) => {
  const [requestsLeft, setRequestsLeft] = useState(null);

  useEffect(() => {
    fetchData(process.env.REACT_APP_KEY).then((data) => {
      let amountLeft = data.quota - data.quotaUsed;
      setRequestsLeft(amountLeft);
    });
  }, [isQuotaUpdate]);

  const fetchData = async (key) => {
    try {
      let url = `https://api.watchmode.com/v1/status/?apiKey=${key}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h2>API</h2>
      <div>
        <p className="text upper-p">
          Requests left for current month: <span className="requests">{requestsLeft}</span>
        </p>
        <p className="text lower-p">This website uses the watchmode API. Find out more about watchmode:</p>
        <a className="watchmode" href="https://api.watchmode.com">
          check out watchmode
        </a>
      </div>
    </div>
  );
};

export default APIInfo;
