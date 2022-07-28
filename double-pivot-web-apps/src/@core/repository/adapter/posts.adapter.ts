import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CategoryDetailsParams} from "src/@core/domain/dto/params/category-details.params";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";
import {Posts} from "src/@core/domain/entity/posts";
import {environment} from "src/environments/environment";
import {PostsRepository} from "../service/posts.repository";
import {PaginationParams} from "src/@core/domain/dto/params/pagination.params";
import {SearchPayload} from '../../domain/dto/payload/search.payload';
import {PostPaginationResponse} from "src/@core/domain/dto/response/post-pagination";
import { PostResponse } from "src/@core/domain/dto/response/post-response";

@Injectable({
  providedIn: 'root',
})
export class PostsAdapter implements PostsRepository {
  endpoint: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  findByUserId(params: string): Observable<HttpResponseEntity<PostResponse[]>> {
    return this.http.get<HttpResponseEntity<PostResponse[]>>(
      `${this.endpoint}post/user/${params}`
    );
  }

  findAll(): Observable<HttpResponseEntity<Posts[]>> {
    return this.http.get<HttpResponseEntity<Posts[]>>(`${this.endpoint}post`);
  }

  findById(
    params: CategoryDetailsParams
  ): Observable<HttpResponseEntity<Posts>> {
    return this.http.get<HttpResponseEntity<Posts>>(
      `${this.endpoint}post/${params.id}`
    );
  }

  findByCategoryId(
    params: CategoryDetailsParams
  ): Observable<HttpResponseEntity<Posts[]>> {
    return this.http.get<HttpResponseEntity<Posts[]>>(
      `${this.endpoint}post/category/${params.id}`
    );
  }

  findAndSortByCategoryId(
    params: CategoryDetailsParams
  ): Observable<HttpResponseEntity<Posts[]>> {
    return this.http.get<HttpResponseEntity<Posts[]>>(
      `${this.endpoint}post/category/sort/${params.id}`
    );
  }

  findByTitle(
    params: PaginationParams,
    body: SearchPayload
  ): Observable<PostPaginationResponse> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post<any>(
      `${this.endpoint}post/search/${params.size}/${params.page}/${params.sort}`,
      body,
      { headers: headers }
    );
  }

  save(body: Posts): Observable<HttpResponseEntity<Posts>> {
    return this.http.post<HttpResponseEntity<Posts>>(
      `${this.endpoint}post`,
      body
    );
  }

  update(params: string, body: Posts): Observable<HttpResponseEntity<Posts>> {
    return this.http.put<HttpResponseEntity<Posts>>(
      `${this.endpoint}post/${params}`,
      body
    );
  }
}
