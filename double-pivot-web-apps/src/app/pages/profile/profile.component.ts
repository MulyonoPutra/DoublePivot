import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CurrentUserResponse } from 'src/@core/domain/dto/response/current-user';
import {
  UserParams,
  UserProfileParams,
} from 'src/@core/domain/dto/params/user-params';
import { CurrentUser } from 'src/@core/domain/dto/response/current-user';
import { GetCurrentUserUseCase } from 'src/@core/usecase/get-current-user.usecase';
import { UpdateProfileUseCase } from 'src/@core/usecase/update-profile.usecase';
import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { UploadImageDialogComponent } from 'src/app/components/upload-image-dialog/upload-image-dialog.component';
import { FindPostByUserIdUseCase } from 'src/@core/usecase/find-post-by-user-id.usecase';

import { Subscription } from 'rxjs';

import { PostResponse } from 'src/@core/domain/dto/response/post-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profileForms!: UntypedFormGroup;
  public currentUser!: CurrentUserResponse;
  public userId!: UserProfileParams;
  public articles: PostResponse[] = [];
  public page: number = 0;
  public subscription: Subscription[] = [];
  public config = {
    itemsPerPage: 4, currentPage: this.page
  };

  public isUpdate: boolean = true;

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private updateUserUseCase: UpdateProfileUseCase,
    private currentUserUseCase: GetCurrentUserUseCase,
    private findPostByUserIdUseCase: FindPostByUserIdUseCase,
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.getCurrentUser();
  }

  /**
   * Initialize FormGroup
   */
  initForms() {
    this.profileForms = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      profilePicture: ['', Validators.required],
    });
  }

  /**
   * get value from FormControl / FormGroup
   */
  get profileFormsValue(): CurrentUser {
    return {
      name: this.profileForms.get('name')?.value,
      username: this.profileForms.get('username')?.value,
      email: this.profileForms.get('email')?.value,
      profilePicture: this.profileForms.get('profilePicture')?.value,
    };
  }

  /**
   * get value from FromControl
   */
  get imagesProfile() {
    return this.profileForms.get('profilePicture')?.value;
  }


  /**
   * Open Dialog to upload profile picture
   */
  openDialog() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      data: this.profileForms.value,
    });

    dialogRef.afterClosed().subscribe((base64) => {
      this.profileForms.controls['profilePicture'].setValue(base64);
    }).add(
      () => {
          setInterval(() => {
            window.location.reload();
          }, 500);
      }
    );
  }

  /**
   * Get User Profile based on Logged in User
   */
  getCurrentUser() {
    this.subscription.push(
      this.currentUserUseCase.execute().subscribe((user) => {
        this.findPostByUserId(user.id);

        this.currentUser = {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          email: user?.email,
          profilePicture: user?.profilePicture,
        };

        /**
         * Prepopulate Profile data to FormsControl
         */
        this.profileForms.patchValue({
          id: this.currentUser.id,
          name: this.currentUser.name,
          username: this.currentUser.username,
          email: this.currentUser.email,
          profilePicture: this.currentUser.profilePicture,
        });
      })
    );
  }


  /**
   * Find Post by User Logged In
   */
  findPostByUserId(id: string) {
    this.subscription.push(
      this.findPostByUserIdUseCase.execute(id).subscribe({
        next: (response) => {
          this.articles = response.data;
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
          this.snackbar.error(error, 2100);
        },
      })
    );
  }

  /**
   * Update User Profile
   */
  update() {
    let userId: UserParams = {
      id: this.currentUser?.id,
    };

    this.subscription.push(
      this.updateUserUseCase.execute(userId, this.profileFormsValue).subscribe({
        complete: () => {
          this.snackbar.success('Update successfully..', 2100);
          setTimeout(() => {
            window.location.reload();
          }, 1100);
        },
        error: (error) => {
          this.snackbar.error(error, 2100);
          this.errorService.getErrorMessage(error);
        },
      })
    );
  }

  public getCurrentPage(event: any) {
    this.config.currentPage = event;
  }

  trackByFn(index: number, data: any): string {
    return data.id;
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
