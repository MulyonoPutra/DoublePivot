import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { LoadingInterceptor } from '../interceptor/loading.interceptor';
import { AuthAdapter } from '../repository/adapter/auth.adapter';
import { CategoriesAdapter } from '../repository/adapter/categories.adapter';
import { PostsAdapter } from '../repository/adapter/posts.adapter';
import { UserAdapter } from '../repository/adapter/user.adapter';
import { AuthRepository } from '../repository/service/auth.repository';
import { CategoriesRepository } from '../repository/service/categories.repository';
import { PostsRepository } from '../repository/service/posts.repository';
import { UserRepository } from '../repository/service/user.repository';

export const Providers: Provider[] = [
  { provide: PostsRepository, useClass: PostsAdapter },
  { provide: CategoriesRepository, useClass: CategoriesAdapter },
  { provide: AuthRepository, useClass: AuthAdapter },
  { provide: UserRepository, useClass: UserAdapter },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
];
