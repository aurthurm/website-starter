export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  total_pages: number;
  nextPage?: number;
  previousPage?: number;
  currentPage?: number;
}
