import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  standalone: true,
  imports: [MatCardModule]
})
export class StoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
