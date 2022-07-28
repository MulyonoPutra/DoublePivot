import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Category } from 'src/@core/domain/entity/category';
import { Posts } from 'src/@core/domain/entity/posts';
import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { FindAllCategoriesUsecase } from 'src/@core/usecase/find-all-categories.usecase';
import { editorConfig } from 'src/@core/utility/editor-config';
import { UploadImageDialogComponent } from 'src/app/components/upload-image-dialog/upload-image-dialog.component';
import { CategoryDetailsParams } from 'src/@core/domain/dto/params/category-details.params';
import { FindPostByIdUseCase } from 'src/@core/usecase/find-post-by-id.usecase';
import { UpdatePostUseCase } from 'src/@core/usecase/update-post.usecase';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @ViewChild(MatSelect) matSelect!: MatSelect;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  updateForms!: UntypedFormGroup;
  categories!: Category;
  category: Category[] = [];
  categoryName!: string;
  imagesName!: string;
  imagesValue!: string;
  submitted!: boolean;
  public details!: Posts;

  config = editorConfig;
  public subscription: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private updateUseCase: UpdatePostUseCase,
    private findAllCategoriesUseCase: FindAllCategoriesUsecase,
    protected findByIdUsecase: FindPostByIdUseCase
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.findAllCategories();
    this.findById();
  }

  /**
   * Find Post By ID
   */
  private findById() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const data: CategoryDetailsParams = {
      id: id,
    };

    this.findByIdUsecase.execute(data).subscribe((response) => {
      this.details = {
        id: response.data.id,
        title: response.data.title,
        subtitle: response.data.subtitle,
        content: response.data.content,
        author: response.data.author,
        images: response.data.images,
        category: response.data.category,
      };

      this.updateForms.patchValue({
        id: this.details.id,
        title: this.details.title,
        subtitle: this.details.subtitle,
        content: this.details.content,
        author: this.details.author,
        category: {
          id: this.details.category.id,
          name: this.details.category.name,
        },
        images: this.details.images,
      });
    });
  }

  /**
   * Initialize FormGroup
   */
  initForms() {
    this.updateForms = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', [Validators.required, Validators.minLength(70)]],
      content: ['', Validators.required],
      author: ['', Validators.required],
      category: this.fb.group({
        id: [],
        name: [''],
      }),
      images: [''],
    });
  }


  /**
   * Find All Categories for Dropdown Value
   */
  findAllCategories() {
    this.subscription.push(
      this.findAllCategoriesUseCase.execute().subscribe({
        next: (response) => {
          this.category = response.data;
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        },
      })
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      data: this.updateForms.value,
    });

    dialogRef.afterClosed().subscribe((base64) => {
      this.updateForms.controls['images'].setValue(base64);
    });
  }

  /**
   * Get FormControl Value from FormGroup
   */
  get formControlValue(): Posts {
    return {
      id: this.updateForms.get('id')?.value,
      title: this.updateForms.get('title')?.value,
      subtitle: this.updateForms.get('subtitle')?.value,
      content: this.updateForms.get('content')?.value,
      author: this.updateForms.get('author')?.value,
      category: {
        id: this.updateForms.get('category.id')?.value,
        name: this.updateForms.get('category.name')?.value,
      },
      images: this.updateForms.get('images')?.value,
    };
  }

  /**
   * Update Post and Submit to API
   */
  save() {
    this.subscription.push(
      this.updateUseCase.execute(this.details.id, this.formControlValue).subscribe({
        complete: () => {
          this.snackbar.success('Update successfully..', 500);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 400);
        },
        error: (error) => {
          this.errorService.getErrorMessage(error);
        },
      })
    );
  }

  get titles() {
    return this.updateForms.get('title');
  }

  get subtitle() {
    return this.updateForms.get('subtitle');
  }

  get imagesPreview() {
    return this.updateForms.get('images')?.value;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    // this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Prepopulate Category value to Dropdown
   */
  selectionChanged(event: MatSelectChange) {
    this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
    this.valueChange.emit(event.value);
    this.onChange(event.value);
    this.onTouched();
    this.updateForms.get('category.id')!.patchValue(event.value.id);
    this.updateForms.get('category.name')!.patchValue(event.value.name);
  }

  @HostListener('window:beforeunload', ['$event'])
  canReload(e: any) {
    if (!this.canDeactivate()) e.returnValue = true;
  }

  canDeactivate = () => this.submitted || !this.updateForms.dirty;

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
