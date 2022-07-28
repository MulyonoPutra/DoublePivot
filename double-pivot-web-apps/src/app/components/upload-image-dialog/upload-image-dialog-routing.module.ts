import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadImageDialogComponent } from './upload-image-dialog.component';

const routes: Routes = [{ path: '', component: UploadImageDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadImageDialogRoutingModule {}
