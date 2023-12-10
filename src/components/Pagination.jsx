import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ pagesWithContent, currentPage, handlePageChange, date }) => {
  return (
    // Pagination component from react-bootstrap
    <Pagination>
    {/* Map through pages with content and render Pagination.Item for each page */}
      {pagesWithContent.map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(date, index + 1)}
        >
          {/* Display the page number */}
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
