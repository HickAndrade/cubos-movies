import LeftArrowIcon from "../icons/LeftArrow";
import RightArrowIcon from "../icons/RightArrow";
import { Button } from "./Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-3 mt-6" aria-label="Paginação">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        variant="secondary"
        aria-label="Página anterior"
        className="w-10 h-10 p-0 flex items-center justify-center"
      >
        <LeftArrowIcon />
      </Button>

      {pageNumbers.map((p) => (
        <Button
        key={p}
        onClick={() => onPageChange(p)}
        variant={p === page ? "secondary" : "primary"}
        aria-current={p === page ? "page" : undefined}
        className="text-base"
        >
          {p}
        </Button>
      ))}

<Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        variant={page === totalPages ? 'secondary':'primary'}
        aria-label="Próxima página"
        className=""
      >
        <RightArrowIcon />
      </Button>
    </nav>
  );
}
