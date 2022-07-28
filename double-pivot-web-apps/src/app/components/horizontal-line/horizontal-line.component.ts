import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-line',
  templateUrl: './horizontal-line.component.html',
  styleUrls: ['./horizontal-line.component.scss']
})
export class HorizontalLineComponent implements OnInit {

  @Input() title: any;

  constructor() { }

  ngOnInit() { }

}
