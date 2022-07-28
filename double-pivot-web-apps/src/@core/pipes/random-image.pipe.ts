import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstant } from '../constants/global-constant';

@Pipe({
  name: 'randomImage'
})
export class RandomImagePipe implements PipeTransform {

  randomImages: string = GlobalConstant.RANDOM_IMAGE_URL;

  transform(value: any): any {
    if(value === '') {
      return this.randomImages;
    }
  }

}
