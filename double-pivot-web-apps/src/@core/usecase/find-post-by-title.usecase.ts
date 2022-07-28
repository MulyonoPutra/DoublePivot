import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCaseWithRequestBody } from "../base/usecase";
import { PaginationParams } from "../domain/dto/params/pagination.params";
import { PostPaginationResponse } from "../domain/dto/response/post-pagination";
import { SearchPayload } from "../domain/dto/payload/search.payload";
import { PostsRepository } from "../repository/service/posts.repository";

@Injectable({
  providedIn: 'root'
})
export class FindPostByTitleUseCase implements UseCaseWithRequestBody<PaginationParams, SearchPayload, PostPaginationResponse> {

  constructor(protected postsRepository: PostsRepository) { }

  execute(params: PaginationParams, body: SearchPayload): Observable<PostPaginationResponse> {
    return this.postsRepository.findByTitle(params, body);
  }

}
