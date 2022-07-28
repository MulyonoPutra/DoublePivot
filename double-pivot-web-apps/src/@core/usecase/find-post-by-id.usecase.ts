import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../base/usecase";
import { CategoryDetailsParams } from "../domain/dto/params/category-details.params";
import { HttpResponseEntity } from "../domain/entity/http-response-entity";
import { Posts } from "../domain/entity/posts";
import { PostsRepository } from "../repository/service/posts.repository";

@Injectable({
  providedIn: 'root'
})
export class FindPostByIdUseCase implements UseCase<CategoryDetailsParams, HttpResponseEntity<Posts>> {

  constructor(protected postsRepository: PostsRepository) {}

  execute(params: CategoryDetailsParams): Observable<HttpResponseEntity<Posts>> {
    return this.postsRepository.findById(params);
  }

}
