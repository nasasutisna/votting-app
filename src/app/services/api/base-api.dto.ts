export interface RequestPagingDto {
  limit: number;
  page: number;
  search?: string;
  votedActive?: boolean;
}

export interface ResponseData<T> {
  message: string;
  data: T;
}

export interface ResponsePagingDto<T> {
  message: string;
  page: number;
  limit: number;
  totalPage: number;
  data: T[];
}