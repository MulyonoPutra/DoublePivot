export interface HttpResponseEntity<T> {
  httpStatus: string;
  message: string;
  data: T;
}
