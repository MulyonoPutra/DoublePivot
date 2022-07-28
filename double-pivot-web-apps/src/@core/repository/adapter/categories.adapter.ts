import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "src/@core/domain/entity/category";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";
import {environment} from "src/environments/environment";
import {CategoriesRepository} from "../service/categories.repository";

@Injectable({
  providedIn: 'root'
})
export class CategoriesAdapter implements CategoriesRepository {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<HttpResponseEntity<Category[]>> {
    let endpoint = environment.endpoint;
    return this.http.get<HttpResponseEntity<Category[]>>(`${endpoint}categories`);
  }

}
