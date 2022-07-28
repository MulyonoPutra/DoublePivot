import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalConstant } from 'src/@core/constants/global-constant';
import { CategoryDetailsParams } from 'src/@core/domain/dto/params/category-details.params';
import { Category } from 'src/@core/domain/entity/category';
import { Posts } from 'src/@core/domain/entity/posts';
import { FindPostByIdUseCase } from 'src/@core/usecase/find-post-by-id.usecase';

@Component({
  selector: 'app-detail-pages',
  templateUrl: './detail-pages.component.html',
  styleUrls: ['./detail-pages.component.scss']
})
export class DetailPagesComponent implements OnInit {

  public details!: Posts;
  protected categories!: Category;
  public names!:  string
  public images!: string;
  public randomImages: string = GlobalConstant.RANDOM_IMAGE_URL;

  constructor(
    protected findByIdUsecase: FindPostByIdUseCase,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById();
  }

  /**
   * Find Post By Id
   */
  private findById() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const data: CategoryDetailsParams = {
      id: id
    }

    this.findByIdUsecase.execute(data).subscribe(response => {
      this.details = {
        id: response.data.id,
        title: response.data.title,
        subtitle: response.data.subtitle,
        content: response.data.content,
        author: response.data.author,
        images: response.data.images,
        category: response.data.category,
      }
      this.images = response.data.images;

      this.categories = {
        id: this.details.category.id,
        name: this.details.category.name,
      }

      this.names = this.categories.name;

    })
  }

}
