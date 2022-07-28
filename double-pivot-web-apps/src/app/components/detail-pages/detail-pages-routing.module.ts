import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPagesComponent } from './detail-pages.component';

const routes: Routes = [{ path: '', component: DetailPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPagesRoutingModule { }
