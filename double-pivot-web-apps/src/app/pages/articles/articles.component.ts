import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CategoryDetailsParams } from 'src/@core/domain/dto/params/category-details.params';
import { Posts } from 'src/@core/domain/entity/posts';
import { RandomImagePipe } from 'src/@core/pipes/random-image.pipe';
import { ErrorService } from 'src/@core/services/error.service';
import { SharedService } from 'src/@core/services/shared.service';
import { FindByCategoryIdUseCase } from 'src/@core/usecase/find-by-category-id.usecase';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [
    RandomImagePipe
  ]
})
export class ArticlesComponent implements OnInit, OnDestroy {

  public articles: Posts[] = [];
  public page: number = 0;
  public categoryId!: string;
  public subscription: Subscription[] = [];
  
  public config = {
    itemsPerPage: 4, currentPage: this.page
  };

  constructor(
    protected errorService: ErrorService,
    protected sharedService: SharedService,
    protected findPostByCategoryIdUseCase: FindByCategoryIdUseCase) { }


  ngOnInit(): void {
    this.findByCategoryId();
    console.log(`received by HomeComponent: ${this.categoryId}`);
  }

  /**
   * Find By Category Id
   */
  private findByCategoryId() {
    this.subscription.push(this.sharedService.getArticles().subscribe(id => this.categoryId = id));

    const params: CategoryDetailsParams = {
      id: this.categoryId
    }
    this.subscription.push(this.findPostByCategoryIdUseCase.execute(params).subscribe(
      {
        next: (response) => {
          this.articles = response.data;
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        }
      }
    ))
  }

  public getCurrentPage(event: any) {
    this.config.currentPage = event;
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach(sub => {
        sub.unsubscribe();
      })
    }
  }

}
