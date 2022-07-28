import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PaginationParams } from 'src/@core/domain/dto/params/pagination.params';
import { SearchPayload } from 'src/@core/domain/dto/payload/search.payload';
import { FindPostByTitleUseCase } from 'src/@core/usecase/find-post-by-title.usecase';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public articles:  any = [];
  public page:      number = 0;
  public find!:     string;
  public isEmpty!:  boolean;
  public subscription: Subscription[] = [];
  public config = {
    itemsPerPage: 10, currentPage: this.page
  };

  constructor(protected findByTitleUseCase: FindPostByTitleUseCase) { }

  ngOnInit(): void {
    this.find = ''
  }

  public findByTitle() {
    const pagination: PaginationParams = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage,
      sort: 'desc'
    }

    const search: SearchPayload = {
      keyword: this.find
    }

    this.subscription.push(this.findByTitleUseCase.execute(pagination, search).subscribe(response => {
          this.articles = response.content;
          this.isEmpty = this.articles.length === 0;
        }
      )
    )
  }

  public getCurrentPage(event: any) {
    this.config.currentPage = event;
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

}
