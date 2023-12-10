import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ pagesWithContent, currentPage, handlePageChange, date }) => {
  return (
    <Pagination>
      {pagesWithContent.map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(date, index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
