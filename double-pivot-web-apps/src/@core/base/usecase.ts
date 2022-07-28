import { Observable } from 'rxjs';
export interface UseCase<S, T> {
  execute(params: S): Observable<T>;
}

export interface UseCaseWithRequestBody<R, S, T>{
  execute(params: R, body: S): Observable<T>;
}
