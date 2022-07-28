import { Injectable } from '@angular/core';
import { UseCaseWithRequestBody } from '../base/usecase';
import { Observable } from 'rxjs';
import { PostsRepository } from '../repository/service/posts.repository';
import { Posts } from '../domain/entity/posts';
import { HttpResponseEntity } from '../domain/entity/http-response-entity';

@Injectable({
  providedIn: 'root',
})
export class UpdatePostUseCase
  implements UseCaseWithRequestBody<string, Posts, HttpResponseEntity<Posts>>
{
  constructor(protected postsRepository: PostsRepository) {}

  execute(params: string, body: Posts): Observable<HttpResponseEntity<Posts>> {
    return this.postsRepository.update(params, body);
  }
}
