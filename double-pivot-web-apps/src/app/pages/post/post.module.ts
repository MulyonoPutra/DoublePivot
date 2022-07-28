import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/@core/shared/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PostRoutingModule } from './post-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UploadImageDialogModule } from 'src/app/components/upload-image-dialog/upload-image-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { PostComponent } from './post.component';
import { PipeModule } from 'src/@core/pipes/pipes.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    UploadImageDialogModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule
  ],
  exports: [
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostModule { }
