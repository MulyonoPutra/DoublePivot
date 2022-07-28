import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { ControlValueAccessor, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatSelect, MatSelectChange } from '@angular/material/select'
import { Router } from '@angular/router'
import { Category } from 'src/@core/domain/entity/category'
import { Posts } from 'src/@core/domain/entity/posts'
import { MessagesBoxService } from 'src/@core/services/messages-box.service'
import { FindAllCategoriesUsecase } from 'src/@core/usecase/find-all-categories.usecase'
import { SavePostUseCase } from 'src/@core/usecase/save-post.usecase'
import { editorConfig } from 'src/@core/utility/editor-config'
import { UploadImageDialogComponent } from 'src/app/components/upload-image-dialog/upload-image-dialog.component'
import { Subscription } from 'rxjs'
import { ErrorService } from '../../../@core/services/error.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @ViewChild(MatSelect) matSelect!: MatSelect;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  dynamicForms!:  UntypedFormGroup;
  categories!:    Category;
  category:       Category[] = [];
  categoryName!:  string;
  imagesName!:    string;
  imagesValue!:   string;
  submitted!:     boolean;
  config = editorConfig;
  public subscription: Subscription[] = [];



  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: UntypedFormBuilder,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private savePostUseCase: SavePostUseCase,
    private findAllCategoriesUseCase: FindAllCategoriesUsecase
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.findAllCategories();
  }

  /**
   * Initialize FormGroup
   */
  initForms() {
    this.dynamicForms = this.fb.group({
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
   * Find All Categories
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

  /**
   * Open Dialog to upload image
   */
  openDialog() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      data: this.dynamicForms.value,
    });

    dialogRef.afterClosed().subscribe((base64) => {
      this.dynamicForms.controls['images'].setValue(base64);
    });
  }

  /**
   * Get FormControl Value from FormGroup
   */
  get formControlValue(): Posts {
    return {
      id: this.dynamicForms.get('id')?.value,
      title: this.dynamicForms.get('title')?.value,
      subtitle: this.dynamicForms.get('subtitle')?.value,
      content: this.dynamicForms.get('content')?.value,
      author: this.dynamicForms.get('author')?.value,
      category: {
        id: this.dynamicForms.get('category.id')?.value,
        name: this.dynamicForms.get('category.name')?.value,
      },
      images: this.dynamicForms.get('images')?.value,
    };
  }

  /**
   * Create new Post
   */
  save() {
    this.subscription.push(
      this.savePostUseCase.execute(this.formControlValue).subscribe({
        complete: () => {
          this.snackbar.success('Post saved successfully..', 500);
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
    return this.dynamicForms.get('title');
  }

  get subtitle() {
    return this.dynamicForms.get('subtitle');
  }

  get imagesPreview() {
    return this.dynamicForms.get('images')?.value;
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
    this.dynamicForms.get('category.id')!.patchValue(event.value.id);
    this.dynamicForms.get('category.name')!.patchValue(event.value.name);
  }

  @HostListener('window:beforeunload', ['$event'])
  canReload(e: any) {
    if (!this.canDeactivate()) e.returnValue = true;
  }

  canDeactivate = () => this.submitted || !this.dynamicForms.dirty;

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
