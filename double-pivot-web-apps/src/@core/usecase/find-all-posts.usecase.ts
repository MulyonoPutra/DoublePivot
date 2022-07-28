import { Injectable } from "@angular/core";
import { UseCase } from "../base/usecase";
import { Observable } from "rxjs";
import { PostsRepository } from "../repository/service/posts.repository";
import { HttpResponseEntity } from "../domain/entity/http-response-entity";
import { Posts } from "../domain/entity/posts";

@Injectable({
  providedIn: 'root'
})

export class FindAllPostsUsecase implements UseCase<void, HttpResponseEntity<Posts[]>> {

  constructor(protected postsRepository: PostsRepository){}

  execute(params: void): Observable<HttpResponseEntity<Posts[]>> {
    return this.postsRepository.findAll();
  }

}
