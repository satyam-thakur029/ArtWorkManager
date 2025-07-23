import React from 'react';
import { Paginator, type PaginatorPageChangeEvent } from 'primereact/paginator';

interface PaginationProps {
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  currentPage,
  recordsPerPage,
  onPageChange,
}) => {
  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    onPageChange(event.page + 1);
  };

  return (
    <Paginator
      first={(currentPage - 1) * recordsPerPage}
      rows={recordsPerPage}
      totalRecords={totalRecords}
      onPageChange={handlePageChange}
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    />
  );
};

export default Pagination;