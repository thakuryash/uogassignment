import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const TypeaheadSearch = ({ typeaheadOptions, selectedEvents, handleTypeaheadChange }) => {
  return (
    // Form for the typeahead search
    <Form>
      {/* Input group for styling */}
      <InputGroup className='my-3'>
      {/* Typeahead component for event search */}
        <Typeahead
          id="searchContacts"
          labelKey="event"
          options={typeaheadOptions}
          placeholder='Search events'
          onChange={handleTypeaheadChange}
          selected={selectedEvents.map(event => ({ event }))}
          multiple
        />
      </InputGroup>
    </Form>
  );
};

export default TypeaheadSearch;
