import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationLink, 
  PaginationNext, 
} from './ui/pagination';

const PaginationSelector = ({ page, pages, onPageChange }: {
  page: number, 
  pages: number, 
  onPageChange: (page: number) => void, 
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) { pageNumbers.push(i) }

  return (
    <Pagination className='py-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(page - 1)}
            className={`${page === 1 ? 'cursor-not-allowed hover:bg-inherit' : 'cursor-pointer'}`}
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink 
              className='cursor cursor-pointer'
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(page + 1)} 
            className={`${page === pageNumbers.length ? 'cursor-not-allowed hover:bg-inherit' : 'cursor-pointer'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSelector;
