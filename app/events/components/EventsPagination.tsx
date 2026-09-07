"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function pageItems(page: number, totalPages: number) {
  const maxButtons = 5;
  const start = Math.max(
    0,
    Math.min(page - Math.floor(maxButtons / 2), totalPages - maxButtons),
  );
  const end = Math.min(totalPages, start + maxButtons);

  return Array.from({ length: end - start }, (_, index) => start + index);
}

export function EventsPagination({
  page,
  totalPages,
  onPageChange,
}: EventsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Event pages"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      {pageItems(page, totalPages).map((pageIndex) => (
        <Button
          key={pageIndex}
          type="button"
          variant={pageIndex === page ? "default" : "outline"}
          size="sm"
          className="min-w-9 normal-case tracking-normal"
          onClick={() => onPageChange(pageIndex)}
          aria-current={pageIndex === page ? "page" : undefined}
        >
          {pageIndex + 1}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
