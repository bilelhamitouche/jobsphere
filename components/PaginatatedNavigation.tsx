"use client";

import { getPaginationRange } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginatedNavigationProps {
  totalPages: number;
}

function useSetPageParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("page", String(page));
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    return url;
  };
}

export default function PaginatedNavigation({
  totalPages,
}: PaginatedNavigationProps) {
  const setPage = useSetPageParams();
  const searchParams = useSearchParams();
  const currentPage =
    Number(searchParams.get("page")) > 0 ? Number(searchParams.get("page")) : 1;
  const paginationRange = getPaginationRange(currentPage, totalPages, 2);
  return (
    <Pagination className="col-span-2 mx-auto">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem aria-disabled={currentPage > 1}>
            <PaginationPrevious href={`${setPage(currentPage - 1)}`} />
          </PaginationItem>
        )}
        {paginationRange.map((item, index) => {
          if (item === "...") {
            return <PaginationEllipsis />;
          } else {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`${setPage(Number(item) || 1)}`}
                  isActive={item === currentPage}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${setPage(currentPage + 1)}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
