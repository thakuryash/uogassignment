import React, { useState, useEffect } from 'react';

  const App = () => {
  // State for storing API data, loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch('https://v1.slashapi.com/events/google-sheets/FyqwlUzRL2/reunionevent', {headers: {
        'X-API-KEY': 'OB8Pbh3aEK3sGUoFayUrzYnV0wMP13fO7kMQQzMV',
      }
      });
      const apiData = await response.json();
      console.log(apiData);
      setData(apiData.data);
      setLoading(false);
      } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
    }
      };
        fetchData();
  }, []);

  const groupEventsByDate = () => {
    const groupedData = {};
      // Check if data is not empty before using forEach
      if (data.length > 0) {
      data.forEach((event) => {
      const date = event.startDate;
      if (!groupedData[date]) {
      groupedData[date] = [];
      }
      groupedData[date].push(event);
      });
      }
      return groupedData;
  };

  const groupedEvents = groupEventsByDate();

  return (
    <>
    {/* Header Section */}
      <div className="container">
      <div className="row">
      <h1 className="text-center mb-5 text-primary">UNIVERSITY REUNION EVENT</h1>
      </div>
      </div>

        {/* Loading State */}
        {loading ? (
        <p>Loading...</p>
        ) : (
    // Display Events Table
    <>
  {Object.keys(groupedEvents).map((startDate) => (
    <div className="container" key={startDate}>
      <h4>Events on {startDate}</h4>
        <table className="table table-striped" key={startDate}>
          <thead>
          <tr>
          <th scope="col">Attending</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Event Name</th>
          </tr>
          </thead>
          <tbody>
          {groupedEvents[startDate].map((event, index) => (
          <tr key={index}>
          <td>
          {event.avaiability  > 0 ? (
          <button type="button" className="btn btn-danger">
          ATTEND
          </button>
          ) : null}
          </td>
          <td>{event.startTime}</td>
          <td>{event.endTime}</td>
          <td>{event.event}</td>
          </tr>
          ))}
          </tbody>
        </table>
    </div>
  ))}
        </>
      )}
    </>
  );
};

export default App;