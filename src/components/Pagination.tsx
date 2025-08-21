import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, loading }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="hover:bg-primary hover:text-primary-foreground transition-smooth"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          disabled={loading}
          className={
            currentPage === page
              ? "bg-gradient-primary hover:opacity-90"
              : "hover:bg-primary hover:text-primary-foreground transition-smooth"
          }
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="hover:bg-primary hover:text-primary-foreground transition-smooth"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};