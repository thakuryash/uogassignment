import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import TypeaheadSearch from './components/TypeheadSearch';
import EventTable from './components/EventTable';
import CustomPagination from './components/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
const App = () => {
  // State variables
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://v1.slashapi.com/events/google-sheets/FyqwlUzRL2/reunionevent', {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        });
        const apiData = await response.json();
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

  // Group events by date and set initial pages on events change
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

  // Helper function to group events by date
  const groupEventsByDate = () => {
    return events.reduce((groupedData, event) => {
      const date = event.startDate;
      groupedData[date] = [...(groupedData[date] || []), event];
      return groupedData;
    }, {});
  };

  const groupedEvents = groupEventsByDate();
  const eventsPerPage = 5;

  // Calculate total pages for pagination based on selected events and availability
  const totalPages = (date) => {
    const filteredEvents = (groupedEvents[date] || []).filter((item) =>
      selectedEvents.length === 0 || selectedEvents.includes(item.event) || item.availability === 0
    );
    return Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage));
  };

  // Handle page change for pagination
  const handlePageChange = (date, page) => {
    setCurrentPage(prev => ({ ...prev, [date]: page }));
  };

  // Handle typeahead search change
  const handleTypeaheadChange = (selected) => {
    setSelectedEvents(selected.map((item) => item.event));
  };

  // Handle removing an event
  const handleRemoveClick = (eventId) => {
    setSelectedEvents((prevSelectedEvents) =>
      prevSelectedEvents.filter((event) => event !== eventId)
    );
  };

  // Filter typeahead options based on selected events
  const typeaheadOptions = events.filter((item) => !selectedEvents.includes(item.event));

  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>University Reunion Event</h1>
        {/* Typeahead search component */}
        <TypeaheadSearch
          typeaheadOptions={typeaheadOptions}
          selectedEvents={selectedEvents}
          handleTypeaheadChange={handleTypeaheadChange}
        />

        {/* Display loading message if data is still loading */}
        {loading ? (
          <div className="text-center p-3 bg-light">Loading...</div>
        ) : (
          // Map through grouped events by date
          Object.keys(groupEventsByDate()).map((date) => {
          const filteredEvents = (groupEventsByDate()[date] || []).filter((item) =>
            selectedEvents.length === 0 || selectedEvents.includes(item.event) || item.avaiability === 0
          );

          // Filter pages with content for pagination
          const pagesWithContent = [...Array(totalPages(date))].filter((_, index) => {
            const startIndex = index * 5;
            const endIndex = (index + 1) * 5;
            return filteredEvents.slice(startIndex, endIndex).some(item => item);
          });

           // Render EventTable and CustomPagination components for each date
          return (
            <div key={date}>
              <h2>Events on: {date}</h2>
              <EventTable
                events={filteredEvents}
                selectedEvents={selectedEvents}
                currentPage={currentPage[date]}
                handleRemoveClick={handleRemoveClick}
                eventsPerPage={5}
              />
              <CustomPagination
                pagesWithContent={pagesWithContent}
                currentPage={currentPage[date]}
                handlePageChange={handlePageChange}
                date={date}
              />
            </div>
          );
        }))}
      </Container>
    </div>
  );
}

export default App;

