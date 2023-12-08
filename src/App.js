import React, { useState, useEffect } from 'react';

const App = () => {
  // State for storing API data, loading state, and search term
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v1.slashapi.com/events/google-sheets/FyqwlUzRL2/reunionevent', {headers: {
          'X-API-KEY': 'OB8Pbh3aEK3sGUoFayUrzYnV0wMP13fO7kMQQzMV',
        }
      });
        const apiData = await response.json();
        setData(apiData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <div className="container">
          <h4>All Events</h4>
          <table className="table table-striped">
            {/* Table Header */}
            <thead>
              <tr>
                <th scope="col">Attending</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Event Name</th>
                <th scope="col">Category</th>
                {/* Add other data cells as needed */}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
            {Array.isArray(data.data) ? (
            data.data.map((event, index) => (
              <tr key={index}>
                <td>  
                <button type="button" className="btn btn-danger">
                ATTEND
                </button>
                </td>
                {/* Start Time Column */}
                <td>{event.startTime}</td>
                {/* End Time Column */}
                <td>{event.endTime}</td>
                {/* Event Name Column */}
                <td>{event.event}</td>
                {/* Category Column */}
                <td>{event.category}</td>
              </tr>
                ))
              ) : (
              <p>Data format error</p>
            )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default App;