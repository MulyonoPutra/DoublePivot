import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailsRoutingModule } from './post-details-routing.module';
import { PostDetailsComponent } from './post-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { MaterialModule } from 'src/@core/shared/material.module';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { UploadImageDialogModule } from 'src/app/components/upload-image-dialog/upload-image-dialog.module';

@NgModule({
  declarations: [PostDetailsComponent],
  imports: [
    CommonModule,
    PostDetailsRoutingModule,
    MaterialModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    UploadImageDialogModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostDetailsModule {}
