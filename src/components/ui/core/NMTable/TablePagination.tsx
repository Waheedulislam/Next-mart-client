import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };
  return (
    <div className="flex items-center my-5 gap-2">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outline"
        className="w-8 h-8 rounded-full flex items-center justify-center"
        size="sm"
      >
        <ArrowLeft></ArrowLeft>
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`);
          }}
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          size="sm"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        className="w-8 h-8 rounded-full flex items-center justify-center"
        size="sm"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
