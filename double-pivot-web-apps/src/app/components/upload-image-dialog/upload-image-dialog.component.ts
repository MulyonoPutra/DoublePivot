import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent implements OnInit {

  public files: File[] = [];
  public fileCollections: any = [];
  public content!: string;

  constructor(private dialogRef: MatDialogRef<UploadImageDialogComponent>) {}

  ngOnInit(): void { }

  /**
   * Process the file upload
   */
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files && this.files[0]) {
      for (let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i]).then(
          base64 => {
            this.fileCollections.push({
              name: this.files[i].name,
              content: base64,
            });

            this.fileCollections.forEach((element: any) => {
              this.content = element.content;
            });
          });
      }
    }
  }

  /**
   * Convert file to base64
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Remove file
   */
  onRemove(event: any) {
    let position = this.files.indexOf(event);
    this.fileCollections.splice(position, 1);
    this.files.splice(position, 1);
  }

  /**
   * Save the image to temporary storage and send it to the parent component
   */
  saveFile() {
    this.dialogRef.close(this.content);
  }


  /**
   * Close Dialog
   */
  closeModal() {
    this.dialogRef.close();
  }
}
