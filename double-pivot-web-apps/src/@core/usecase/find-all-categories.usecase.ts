import { Injectable } from "@angular/core";
import { UseCase } from "../base/usecase";
import { Observable } from "rxjs";
import { HttpResponseEntity } from "../domain/entity/http-response-entity";
import { Category } from "../domain/entity/category";
import { CategoriesRepository } from "../repository/service/categories.repository";

@Injectable({
  providedIn: 'root'
})

export class FindAllCategoriesUsecase implements UseCase<void, HttpResponseEntity<Category[]>> {

  constructor(protected categoryRepository: CategoriesRepository) {}

  execute(params: void): Observable<HttpResponseEntity<Category[]>> {
    return this.categoryRepository.findAll();
  }

}
