export interface Result {
  isSuccess: boolean;
  statusCode?: number;
  errorMessage: string;
}

export interface ResultWithValue<T> extends Result {
  value: T;
}

export interface ResultWithValueAndPagination<T> extends ResultWithValue<T> {
  currentPage: number;
  totalPages: number;
  totalRows: number;
}

export const defaultSuccessResult = { isSuccess: true, errorMessage: '' };
