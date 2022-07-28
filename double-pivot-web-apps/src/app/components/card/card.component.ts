import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalConstant } from 'src/@core/constants/global-constant';
import { RandomImagePipe } from 'src/@core/pipes/random-image.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [RandomImagePipe],
})
export class CardComponent implements OnInit {
  @Input() posts: any;
  @Input() update: any;
  randomImages: string = GlobalConstant.RANDOM_IMAGE_URL;

  constructor(private router: Router) {}

  ngOnInit() {}

  public details(postId: any) {
    this.router.navigateByUrl('/detail-pages/' + postId);
  }

  navigate(id: string, route: string) {
    switch (route) {
      case 'details':
        this.router.navigateByUrl('/detail-pages/' + id);
        break;

      case 'update':
        this.router.navigateByUrl('/post-details/' + id);
        break;
    }
  }
}
