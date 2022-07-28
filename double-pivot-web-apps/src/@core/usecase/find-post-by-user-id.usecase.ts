import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../base/usecase";
import { UserProfileParams } from "../domain/dto/params/user-params";
import { PostResponse } from "../domain/dto/response/post-response";
import { HttpResponseEntity } from "../domain/entity/http-response-entity";
import { Posts } from "../domain/entity/posts";
import { PostsRepository } from "../repository/service/posts.repository";

@Injectable({
  providedIn: 'root',
})
export class FindPostByUserIdUseCase implements UseCase<string, HttpResponseEntity<PostResponse[]>>
{
  constructor(protected postsRepository: PostsRepository) {}

  execute(params: string): Observable<HttpResponseEntity<PostResponse[]>> {
    return this.postsRepository.findByUserId(params);
  }
}
