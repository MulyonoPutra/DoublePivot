import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/@core/guard/auth.guard';
import { TokenGuard } from 'src/@core/guard/token.guard';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () =>
      import('./pages/articles/articles.module').then((m) => m.ArticlesModule),
    canActivate: [AuthGuard, TokenGuard],
    data: {
      expectedRole: ['admin'],
    },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
    canActivate: [AuthGuard, TokenGuard],
  },
  {
    path: 'trivia-list',
    loadChildren: () =>
      import('./pages/trivia/trivia-list/trivia-list.module').then(
        (m) => m.TriviaListModule
      ),
    canActivate: [AuthGuard, TokenGuard],
  },
  {
    path: 'trivia-details/:id',
    loadChildren: () =>
      import('./pages/trivia/trivia-details/trivia-details.module').then(
        (m) => m.TriviaDetailsModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchModule),
    canActivate: [AuthGuard, TokenGuard],
  },
  {
    path: '404',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: 'detail-pages/:id',
    loadChildren: () =>
      import('./components/detail-pages/detail-pages.module').then(
        (m) => m.DetailPagesModule
      ),
    canActivate: [AuthGuard, TokenGuard],
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post/post.module').then((m) => m.PostModule),
    /* canDeactivate: [CreatePostGuard], */
  },
  {
    path: 'post-details/:id',
    loadChildren: () =>
      import('./pages/post-details/post-details.module').then(
        (m) => m.PostDetailsModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'change-password/:tokenPassword',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [TokenGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'send-email',
    loadChildren: () =>
      import('./pages/send-email/send-email.module').then(
        (m) => m.SendEmailModule
      ),
  },
  {
    path: 'stories',
    loadComponent: () =>
      import('./pages/stories/stories.component').then((m) => m.StoriesComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
