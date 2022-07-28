import {Observable} from "rxjs";
import {Category} from "src/@core/domain/entity/category";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";

export abstract class CategoriesRepository {
  abstract findAll(): Observable<HttpResponseEntity<Category[]>>
}
