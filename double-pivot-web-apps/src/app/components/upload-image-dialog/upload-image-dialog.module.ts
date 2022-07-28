import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadImageDialogRoutingModule } from './upload-image-dialog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploadImageDialogComponent } from './upload-image-dialog.component';

@NgModule({
  declarations: [UploadImageDialogComponent],
  exports: [UploadImageDialogComponent],
  imports: [
    CommonModule,
    UploadImageDialogRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
})
export class UploadImageDialogModule {}
