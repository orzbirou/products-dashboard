import { Component, signal } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';

// Main app component that holds the entire application
@Component({
  selector: 'app-root',
  standalone: true, // Uses Angular's new standalone components (no need for NgModule)
  imports: [DashboardComponent, ShoppingBasketComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // Set the app to use light theme by default when it starts
    document.documentElement.className = 'light-theme';
  }
}
