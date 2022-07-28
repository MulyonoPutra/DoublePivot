import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CategoryDetailsParams } from 'src/@core/domain/dto/params/category-details.params';
import { Category } from 'src/@core/domain/entity/category';
import { AuthService } from 'src/@core/services/auth.service';
import { ErrorService } from 'src/@core/services/error.service';
import { SharedService } from 'src/@core/services/shared.service';
import { FindAllCategoriesUsecase } from 'src/@core/usecase/find-all-categories.usecase';
import { FindAllPostsUsecase } from 'src/@core/usecase/find-all-posts.usecase';
import { FindAndSortByCategoryIdUseCase } from 'src/@core/usecase/find-and-sort-by-category-id.usecase';
import { FindByCategoryIdUseCase } from 'src/@core/usecase/find-by-category-id.usecase';

import { Posts } from './../../../@core/domain/entity/posts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public postCollections:   Posts[] = [];
  public postCollectionsSm: Posts[] = [];
  public postCollectionsLg: Posts[] = [];

  public triviaCollections: any = [];
  public articlesCollections: any = [];

  public isAdmin:     boolean = false;
  public showScroll!: boolean;

  protected showScrollHeight: number = 300;
  protected hideScrollHeight: number = 10;

  public categoryCollections: Category[] = [];

  public subscription: Subscription[] = [];

  constructor(
    protected authService: AuthService,
    protected errorService: ErrorService,
    protected sharedService: SharedService,
    protected findAllPostsUseCase: FindAllPostsUsecase,
    protected findAllCategoryUseCase: FindAllCategoriesUsecase,
    protected findByCategoryIdUseCase: FindByCategoryIdUseCase,
    protected findAndSortByCategoryIdUseCase: FindAndSortByCategoryIdUseCase
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.findAllCategories();
  }


  /**
   * Find All Posts from API
   */
  protected findAll(): void {
    this.subscription.push(
      this.findAllPostsUseCase.execute().subscribe(
        {
          next: (response) => {
            this.postCollections = response.data;
            this.postCollectionsSm = this.postCollections.slice(2, 4);
            this.postCollectionsLg = this.postCollections.slice(0, 2);
          },
          error: (error) => {
            this.errorService.getErrorMessage(error);
          },
        }
      )
    );
  }

  isTokenExists(): string {
    return this.authService.loadToken();
  }

  /**
   * Find All Categories from API
   */
  protected findAllCategories(): void {
    this.subscription.push(
      this.findAllCategoryUseCase.execute().subscribe({
        next: (response) => {
          this.categoryCollections = response.data;
          this.categoryCollections.forEach((category: any) => {

            /**
             * Check If Token exists, if exists send Category.id to service
             */
            if (this.isTokenExists()) {
              this.findByCategoryId(category.id);
            }

            this.findAndSortByCategoryId(category.id);
          });
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        },
      })
    );
  }

  /**
  * Find Post By Category ID, and show only 4 posts to Homepage
    @param {CategoryDetailsParams} CategoryID
  */
  protected findAndSortByCategoryId(categoryId: string) {
    
    let category: CategoryDetailsParams = {
      id: categoryId,
    };

    const [{ id: articles }, { id: trivia }, { id: stories }] = this.categoryCollections;

    this.subscription.push(this.findAndSortByCategoryIdUseCase.execute(category).subscribe(
        {
          next: (response) => {
            if (category.id === articles) {
              this.articlesCollections = response.data;
            } else {
              this.triviaCollections = response.data;
            }
          },
          error: (error) => {
            this.errorService.getErrorMessage(error);
          },
        }
      )
    );
  }

  /**
   * Find Post By Category Id
   */
  protected findByCategoryId(id: any): void {
    let category: CategoryDetailsParams = {
      id: id,
    };
    // let articles = this.categoryCollections[0]?.id;
    // let trivia = this.categoryCollections[1]?.id;

    const [{ id: articles }, { id: trivia }, { id: stories }] = this.categoryCollections;

    this.subscription.push(
      this.findByCategoryIdUseCase.execute(category).subscribe({
        next: () => {
          this.onSendValue(articles, trivia);
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        },
      })
    );
  }

  private onSendValue(articles: string, trivia: string) {
    this.sharedService.setArticles(articles);
    this.sharedService.setTrivia(trivia);
  }


  /**
   * Scroll to top
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showScroll = true;
    } else if (
      this.showScroll &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
