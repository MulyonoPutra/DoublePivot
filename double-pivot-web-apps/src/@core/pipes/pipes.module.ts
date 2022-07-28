import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenerTextPipe } from './shortener-text.pipe';
import { RandomImagePipe } from './random-image.pipe';
import { HtmlSanitizePipe } from './html-sanitize.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  imports: [CommonModule],

  exports: [
    ShortenerTextPipe,
    RandomImagePipe,
    HtmlSanitizePipe,
    TimeAgoPipe
  ],

  declarations: [
    ShortenerTextPipe,
    RandomImagePipe,
    HtmlSanitizePipe,
    TimeAgoPipe,
  ],
})
export class PipeModule { }
