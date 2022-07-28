import {Observable} from "rxjs";
import {CategoryDetailsParams} from "src/@core/domain/dto/params/category-details.params";
import {PaginationParams} from "src/@core/domain/dto/params/pagination.params";
import {PostPaginationResponse} from "src/@core/domain/dto/response/post-pagination";
import {SearchPayload} from "src/@core/domain/dto/payload/search.payload";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";
import {Posts} from '../../domain/entity/posts';
import { UserProfileParams } from "src/@core/domain/dto/params/user-params";
import { PostResponse } from "src/@core/domain/dto/response/post-response";

export abstract class PostsRepository {

  abstract findAll(): Observable<HttpResponseEntity<Posts[]>>

  abstract findById(params: CategoryDetailsParams): Observable<HttpResponseEntity<Posts>>

  abstract findByCategoryId(params: CategoryDetailsParams): Observable<HttpResponseEntity<Posts[]>>

  abstract findAndSortByCategoryId(params: CategoryDetailsParams): Observable<HttpResponseEntity<Posts[]>>

  abstract findByTitle(params: PaginationParams, body: SearchPayload): Observable<PostPaginationResponse>

  abstract save(body: Posts): Observable<HttpResponseEntity<Posts>>

  abstract update(params: string, body: Posts): Observable<HttpResponseEntity<Posts>>

  abstract findByUserId(params: string): Observable<HttpResponseEntity<PostResponse[]>>

}
