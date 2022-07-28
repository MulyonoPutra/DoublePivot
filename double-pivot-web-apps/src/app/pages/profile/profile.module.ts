import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/@core/shared/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadImageDialogModule } from 'src/app/components/upload-image-dialog/upload-image-dialog.module';
import { CardModule } from 'src/app/components/card/card.module';
import { EmptyStateModule } from 'src/app/components/empty-state/empty-state.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    UploadImageDialogModule,
    NgxDropzoneModule,
    CardModule,
    EmptyStateModule,
    NgxPaginationModule,
  ],
})
export class ProfileModule {}
