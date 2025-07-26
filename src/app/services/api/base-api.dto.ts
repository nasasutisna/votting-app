export interface RequestPagingDto {
  limit: number;
  page: number;
}

export interface ResponseData<T> {
  message: string;
  data: T;
}

export interface ResponsePagingDto<T> {
  message: string;
  page: number;
  limit: number;
  data: T[];
}