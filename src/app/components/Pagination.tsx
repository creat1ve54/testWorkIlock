import React from "react";
import { IPagination } from "../../type";

const Pagination = ({
  paginations,
  onPageChange,
}: {
  paginations: IPagination;
  onPageChange: (page: number) => void;
}) => {
  const { currentPage, totalPages, totalCount, limit } = paginations;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination__info">
        Показано {Math.min((currentPage - 1) * limit + 1, totalCount)}–
        {Math.min(currentPage * limit, totalCount)} из {totalCount} задач
      </div>

      <div className="pagination__controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination__btn pagination__btn--prev ${
            currentPage === 1 ? "pagination__btn--disabled" : ""
          }`}
          aria-label="Предыдущая страница"
        >
          <span>←</span>
          <span className="pagination__btn-text">Назад</span>
        </button>

        <div className="pagination__pages">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="pagination__dots">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`pagination__page ${
                  currentPage === page ? "pagination__page--active" : ""
                }`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Страница ${page}`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination__btn pagination__btn--next ${
            currentPage === totalPages ? "pagination__btn--disabled" : ""
          }`}
          aria-label="Следующая страница"
        >
          <span className="pagination__btn-text">Вперёд</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
