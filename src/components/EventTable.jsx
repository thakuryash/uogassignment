import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EventTable = ({ events, selectedEvents, currentPage, handleRemoveClick, eventsPerPage }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Attending</th>
          <th className="text-center">Start time</th>
          <th className="text-center">End time</th>
          <th className="text-center">Event name</th>
        </tr>
      </thead>
      <tbody>
        {events.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              <div className="alert alert-info" role="alert">No events available.</div>
            </td>
          </tr>
        ) : (
          events
            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
            .map((item) => (
              <tr key={item.iD}>
                <td className="text-center">
                  {selectedEvents.length > 0 ? (
                    <Button variant='danger' onClick={() => handleRemoveClick(item.event)}>REMOVE</Button>
                  ) : (
                    item.avaiability > 0 ? (
                      <Button variant='danger'>ATTEND</Button>
                    ) : (
                      <p className='text-danger mb-0 fw-bolder'>SOLD OUT</p>
                    )
                  )}
                </td>
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
