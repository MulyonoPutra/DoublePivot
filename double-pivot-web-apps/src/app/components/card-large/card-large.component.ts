import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalConstant } from 'src/@core/constants/global-constant';

@Component({
  selector: 'app-card-large',
  templateUrl: './card-large.component.html',
  styleUrls: ['./card-large.component.scss']
})
export class CardLargeComponent implements OnInit {

  @Input() posts: any;
  randomImages: string = GlobalConstant.RANDOM_IMAGE_URL;

  constructor(private router: Router) { }


  ngOnInit() { }

  public details(postId: any) {
    this.router.navigateByUrl('/detail-pages/' + postId);
  }

}
