import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CategoryDetailsParams } from 'src/@core/domain/dto/params/category-details.params';
import { ErrorService } from 'src/@core/services/error.service';
import { SharedService } from 'src/@core/services/shared.service';
import { FindByCategoryIdUseCase } from 'src/@core/usecase/find-by-category-id.usecase';
import { Posts } from 'src/@core/domain/entity/posts';

@Component({
  selector: 'app-trivia-list',
  templateUrl: './trivia-list.component.html',
  styleUrls: ['./trivia-list.component.scss']
})
export class TriviaListComponent implements OnInit, OnDestroy {

  public trivia: Posts[] = [];
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
  }

  /**
   * Find Post by Category Id
   */
  protected findByCategoryId() {
    this.sharedService.getTrivia().subscribe(id => this.categoryId = id);
    const params: CategoryDetailsParams = {
      id: this.categoryId
    };

    this.subscription.push(this.findPostByCategoryIdUseCase.execute(params).subscribe(
      {
        next: (response) => {
          this.trivia = response.data;
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        }
      }
    ));
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
