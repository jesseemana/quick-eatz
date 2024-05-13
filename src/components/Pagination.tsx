import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationLink, 
  PaginationNext, 
} from './ui/pagination';


const PaginationSelector = ({ page, pages, onPageChange, }: {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = [];
  for (let i = 0; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* {page !== 1 && ( */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={() => onPageChange(page - 1)}
              aria-disabled={page !== 1}
            />
          </PaginationItem>
        {/* )}  */}

        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink 
              href='#'
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* {page !== pageNumbers.length && ( */}
          <PaginationItem>
            <PaginationNext 
              href='#' 
              onClick={() => onPageChange(page + 1)} 
              aria-disabled={page !== pageNumbers.length}
            />
          </PaginationItem>
        {/* )}  */}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector;
