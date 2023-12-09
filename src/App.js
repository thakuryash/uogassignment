import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
         //console.log(apiData);
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
  // Calculate total pages for pagination based on filtered events
  const totalPages = (date) => {
    const filteredEvents = (groupedEvents[date] || []).filter((item) =>
      selectedEvents.length === 0 || selectedEvents.includes(item.event) || item.avaiability === 0
    );
    return Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));
  };
  // Handle page change for pagination
  const handlePageChange = (date, page) => {
    setCurrentPage(prev => ({ ...prev, [date]: page }));
  };

  // Handle Typeahead (search) change
  const handleTypeaheadChange = (selected) => {
    setSelectedEvents(selected.map((item) => item.event));
  };

  // Handle click to remove event from selected events
  const handleRemoveClick = (eventId) => {
    // Remove the event with the specified id from the selectedEvents array
    setSelectedEvents((prevSelectedEvents) =>
      prevSelectedEvents.filter((event) => event !== eventId)
    );
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
          
          Object.keys(groupEventsByDate()).map((date) => {
          const filteredEvents = (groupedEvents[date] || []).filter((item) =>
            selectedEvents.length === 0 || selectedEvents.includes(item.event) || item.avaiability === 0
          );
          const pagesWithContent = [...Array(totalPages(date))].filter((_, index) => {
            const startIndex = index * 5;
            const endIndex = (index + 1) * 5;
            return filteredEvents.slice(startIndex, endIndex).some(item => item);
          });

          return (
            <div key={date}>
              <h2>Events on: {date}</h2>
              {
                // Display a table of events
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
                    {filteredEvents
                      .slice((currentPage[date] - 1) * 5, currentPage[date] * 5)
                      .map((item) => (
                        <tr key={item.iD}>
                          <td>
                            {selectedEvents.length > 0 ? (
                              <button type="button" className="btn btn-danger" onClick={() => handleRemoveClick(item.event)}>REMOVE</button>
                            ) : (
                              // Button to remove event when events are selected
                              item.avaiability > 0 ? (
                                <button type="button" className="btn btn-danger">ATTEND</button>
                              ) : (
                                <p className='text-danger mb-0 fw-bolder'>SOLD OUT</p>
                              )
                            )}
                          </td>
                          <td>{item.startTime}</td>
                          <td>{item.endTime}</td>
                          <td>
                          <a href="#" className="text-danger">{item.event}</a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              }
              {/* Pagination for navigating through event pages */}
              {pagesWithContent.length > 1 && (
                <Pagination>
                  {pagesWithContent.map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage[date]}
                      onClick={() => handlePageChange(date, index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </div>
          );
        }))}
      </>
    </div>
  );
}

export default App;
