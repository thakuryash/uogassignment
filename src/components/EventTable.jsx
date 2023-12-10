import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EventTable = ({ events, selectedEvents, currentPage, handleRemoveClick, eventsPerPage }) => {
  return (
    <Table striped bordered hover>
    {/* Table header */}
      <thead>
        <tr>
          <th className="text-center">Attending</th>
          <th className="text-center">Start time</th>
          <th className="text-center">End time</th>
          <th className="text-center">Event name</th>
        </tr>
      </thead>
      <tbody>
      {/* Display a message if there are no events */}
        {events.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              <div className="alert alert-info" role="alert">No events available.</div>
            </td>
          </tr>
        ) : (
          // Map through events and display them in the table
          events
            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
            .map((item) => (
              <tr key={item.iD}>
                <td className="text-center">
                  {selectedEvents.length > 0 ? (
                    // Display REMOVE button if events are selected
                    <Button variant='danger' onClick={() => handleRemoveClick(item.event)}>REMOVE</Button>
                  ) : (
                    // Display ATTEND button if available, otherwise, display SOLD OUT
                    item.avaiability > 0 ? (
                      <Button variant='danger'>ATTEND</Button>
                    ) : (
                      <p className='text-danger mb-0 fw-bolder'>SOLD OUT</p>
                    )
                  )}
                </td>
                {/* Display start time, end time, and event name */}
                <td className="text-center">{item.startTime}</td>
                <td className="text-center">{item.endTime}</td>
                <td className="text-center">
                  <Button variant="link" className="text-danger" onClick={() => {}}>{item.event}</Button>
                </td>
              </tr>
            ))
        )}
      </tbody>
    </Table>
  );
};

export default EventTable;
