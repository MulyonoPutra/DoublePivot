import { Component } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'Double Pivot';
  showLoadingIndicator!: boolean;

  private isPageNotFound!: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((routeEvent: Event) => {
      if (routeEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (routeEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }

      if (
        routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationError ||
        routeEvent instanceof NavigationCancel
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }

  public onPageNotFound(): boolean {
    if (this.router.url.includes('/404')) {
      this.isPageNotFound = false;
    } else {
      this.isPageNotFound = true;
    }
    return this.isPageNotFound;
  }


}
