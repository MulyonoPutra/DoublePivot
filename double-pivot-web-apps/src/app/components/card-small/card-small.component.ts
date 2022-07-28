import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-small',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss']
})
export class CardSmallComponent implements OnInit {

  @Input() posts: any;

  constructor(private router: Router) { }

  ngOnInit() { }

  public details(postId: any) {
    this.router.navigateByUrl('/detail-pages/' + postId);
  }

}
