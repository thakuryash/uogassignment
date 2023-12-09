import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Typeahead } from 'react-bootstrap-typeahead';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v1.slashapi.com/events/google-sheets/FyqwlUzRL2/reunionevent', {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        });
        const apiData = await response.json();
        // console.log(apiData);
        setEvents(apiData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEvents([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Initialize current page state based on grouped events when events change
  useEffect(() => {
    const groupEventsByDate = () => {
      return events.reduce((groupedData, event) => {
        const date = event.startDate;
        groupedData[date] = [...(groupedData[date] || []), event];
        return groupedData;
      }, {});
    };
    const initialPages = Object.fromEntries(Object.keys(groupEventsByDate()).map(date => [date, 1]));
    setCurrentPage(initialPages);
  }, [events]);

  const groupEventsByDate = () => {
    return events.reduce((groupedData, event) => {
      const date = event.startDate;
      groupedData[date] = [...(groupedData[date] || []), event];
      return groupedData;
    }, {});
  };

  const groupedEvents = groupEventsByDate();
  const eventsPerPage = 5;
// Calculate Pages
  const totalPages = (startdate) => Math.ceil((groupedEvents[startdate] || []).length / eventsPerPage);

  const handlePageChange = (date, page) => {
    setCurrentPage(prev => ({ ...prev, [date]: page }));
  };

  // Handle Typeahead (search) change
  const handleTypeaheadChange = (selected) => {
    setSelectedEvents(selected.map((item) => item.event));
  };


  return (
    <div>
      <>
        <h1 className='text-center mt-4'>University Reunion Event</h1>
        <form>
            {/* Typeahead component for searching and selecting events */}
            <Typeahead
              id="searchContacts"
              labelKey="event"
              options={events}
              placeholder='Search events'
              onChange={handleTypeaheadChange}
              multiple
            />
        </form>
           {loading ? (
           <div>Loading...</div>
          ) : (
        Object.keys(groupedEvents).map((date) => (
          <div key={date}>
            <h2>Events on : {date}</h2>
            <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Attending</th>
                      <th>Start time</th>
                      <th>End time</th>
                      <th>Event name</th>
                    </tr>
                  </thead>
                  <tbody>
                {(groupedEvents[date] || [])
                  .filter((item) =>
                    selectedEvents.length === 0 ||
                    selectedEvents.includes(item.event) ||
                    item.avaibility === 0
                  )
                  .slice((currentPage[date] - 1) * eventsPerPage, currentPage[date] * eventsPerPage)
                  .map((item) => (
                    <tr key={item.iD}>
                      <td>
                      <button type="button" className="btn btn-danger">Attend </button>
                      </td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                      <td>{item.event}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination>
              {[...Array(totalPages(date))].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage[date]}
                  onClick={() => handlePageChange(date, index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        
  )))}
      </>
    </div>
  );
}

export default App;