import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v1.slashapi.com/events/google-sheets/FyqwlUzRL2/reunionevent', {
          headers: {
            'X-API-KEY': 'OB8Pbh3aEK3sGUoFayUrzYnV0wMP13fO7kMQQzMV',
          },
        });
        const apiData = await response.json();
        // console.log(apiData);
        setEvents(apiData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEvents(false);
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
  // Calculate pages 
  const totalPages = (date) => {
    return Math.max(1, Math.ceil(groupedEvents[date]?.length / eventsPerPage));
  };

  const handlePageChange = (date, page) => {
    setCurrentPage(prev => ({ ...prev, [date]: page }));
  };

  return (
    <div>
      <>
        <h1 className='text-center mt-4'>University Reunion Event</h1>
        {Object.keys(groupEventsByDate()).map((date) => {
          const pagesWithContent = [...Array(totalPages(date))].filter((_, index) => {
            const startIndex = index * 5;
            const endIndex = (index + 1) * 5;
            return groupedEvents[date]?.slice(startIndex, endIndex).some(item => item);
          });

          return (
            <div className="container" key={date}>
              <h2>Events on: {date}</h2>
              {groupedEvents[date]?.length === 0 ? (
                <div className="alert alert-info" role="alert">No events available.</div>
              ) : (
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
                    {groupedEvents[date]?.slice((currentPage[date] - 1) * 5, currentPage[date] * 5).map((item) => (
                      <tr key={item.iD}>
                        <td>
                          <button type="button" className="btn btn-danger">Attend </button>
                        </td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td> {item.event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
              
            </div>
          );
        })}
      </>
    </div>
  );
}

export default App;
