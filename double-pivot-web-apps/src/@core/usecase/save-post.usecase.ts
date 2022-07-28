import { Injectable } from "@angular/core";
import { UseCase, UseCaseWithRequestBody } from "../base/usecase";
import { Observable } from "rxjs";
import { PostsRepository } from "../repository/service/posts.repository";
import { Posts } from "../domain/entity/posts";
import { HttpResponseEntity } from "../domain/entity/http-response-entity";

@Injectable({
  providedIn: 'root'
})

export class SavePostUseCase implements UseCase<Posts, HttpResponseEntity<Posts>> {

  constructor(protected postsRepository: PostsRepository) { }

  execute(body: Posts): Observable<HttpResponseEntity<Posts>> {
    return this.postsRepository.save(body);
  }

}
