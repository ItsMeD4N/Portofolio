"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handleOnPageChange = (pageNumber: number) => {
    window.location.href = "#blogs"
    onPageChange(pageNumber)
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => handleOnPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleOnPageChange(pageNumber)}
            className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${currentPage === pageNumber
              ? "bg-primary text-primary-foreground"
              : "hover:bg-gray-200"
              }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleOnPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
};

export default Pagination;